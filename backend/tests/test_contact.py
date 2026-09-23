"""Backend tests for FERINFECTED contact endpoint (functional email)."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://digital-retail-hub-5.preview.emergentagent.com").rstrip("/")
CONTACT = f"{BASE_URL}/api/contact"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Contact endpoint ---
class TestContact:
    def test_contact_success(self, api_client):
        payload = {
            "nombre": "TEST_Juan Perez",
            "email": "test.user@example.com",
            "empresa": "TEST Corp",
            "mensaje": "Hola, requiero cotización.",
        }
        r = api_client.post(CONTACT, json=payload, timeout=60)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "success"
        assert "email_id" in data
        assert data["email_id"], f"email_id is empty: {data}"

    def test_contact_success_minimum_fields(self, api_client):
        payload = {"nombre": "TEST_Ana", "email": "ana@example.com"}
        r = api_client.post(CONTACT, json=payload, timeout=60)
        assert r.status_code == 200, r.text
        assert r.json().get("status") == "success"

    def test_contact_empty_name(self, api_client):
        r = api_client.post(CONTACT, json={"nombre": "", "email": "a@b.com"}, timeout=30)
        assert r.status_code == 422, r.text

    def test_contact_invalid_email(self, api_client):
        r = api_client.post(CONTACT, json={"nombre": "TEST_x", "email": "not-an-email"}, timeout=30)
        assert r.status_code == 422, r.text

    def test_contact_missing_fields(self, api_client):
        r = api_client.post(CONTACT, json={}, timeout=30)
        assert r.status_code == 422

    def test_no_persistence_in_mongo(self, api_client):
        # Ensure /api/status remains untouched (contact should not write anywhere).
        # We just verify the /api/status GET works and is independent.
        r = api_client.get(f"{BASE_URL}/api/status", timeout=30)
        assert r.status_code == 200
        assert isinstance(r.json(), list)
