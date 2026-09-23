from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Email (Emergent managed) — used by the contact form
# ---------------------------------------------------------------------------
EMAIL_BASE_URL = "https://integrations.emergentagent.com"  # constant, not from env
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="No se pudo enviar el correo")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="No se pudo enviar el correo")


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactRequest(BaseModel):
    nombre: str = Field(min_length=1, max_length=120)
    email: EmailStr
    empresa: str = Field(default="", max_length=160)
    mensaje: str = Field(default="", max_length=4000)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/contact")
async def submit_contact(payload: ContactRequest):
    """Contact form -> emails the company inbox. Recipient & subject are
    server-controlled; user fields are escaped into a fixed template (G4)."""
    nombre = escape(payload.nombre.strip())
    remitente = escape(str(payload.email).strip())
    empresa = escape(payload.empresa.strip()) or "—"
    mensaje = escape(payload.mensaje.strip()) or "—"
    fecha = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    subject = f"Nueva solicitud de contacto — {nombre}"
    html = (
        '<table role="presentation" width="100%" style="background:#050505;padding:0;margin:0">'
        '<tr><td style="padding:28px;font-family:Arial,Helvetica,sans-serif;color:#111">'
        '<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;'
        'background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">'
        '<tr><td style="background:#050505;padding:20px 28px">'
        f'<span style="color:#00E5FF;font-size:13px;letter-spacing:2px;text-transform:uppercase">'
        f'{escape(EMAIL_FROM_NAME)}</span>'
        '<div style="color:#ffffff;font-size:20px;font-weight:bold;margin-top:4px">'
        'Nueva solicitud de contacto</div></td></tr>'
        '<tr><td style="padding:28px">'
        f'<p style="margin:0 0 16px;font-size:15px;color:#374151">Recibiste una nueva solicitud '
        f'desde el sitio web el {escape(fecha)}.</p>'
        '<table role="presentation" width="100%" style="font-size:14px;color:#111">'
        f'<tr><td style="padding:8px 0;color:#6b7280;width:110px">Nombre</td><td style="padding:8px 0"><strong>{nombre}</strong></td></tr>'
        f'<tr><td style="padding:8px 0;color:#6b7280">Correo</td><td style="padding:8px 0">{remitente}</td></tr>'
        f'<tr><td style="padding:8px 0;color:#6b7280">Empresa</td><td style="padding:8px 0">{empresa}</td></tr>'
        f'<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Mensaje</td><td style="padding:8px 0;white-space:pre-wrap">{mensaje}</td></tr>'
        '</table>'
        f'<p style="margin:20px 0 0;font-size:13px;color:#6b7280">Para responder, escribe a '
        f'<a href="mailto:{remitente}" style="color:#0891b2">{remitente}</a>.</p>'
        '</td></tr>'
        '<tr><td style="padding:16px 28px;background:#f9fafb;border-top:1px solid #e5e7eb">'
        f'<span style="font-size:12px;color:#9ca3af">Enviado por {escape(EMAIL_FROM_NAME)}. '
        'Nunca solicitamos contraseñas ni datos bancarios por correo.</span>'
        '</td></tr></table></td></tr></table>'
    )

    email_id = await send_email(to=OWNER_EMAIL, subject=subject, html=html, reply_to=OWNER_EMAIL)
    return {"status": "success", "email_id": email_id}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
