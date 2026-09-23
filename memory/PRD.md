# PRD — FERINFECTED CORP Landing Page

## Original Problem Statement
Crear una landing page para **FERINFECTED CORP, S.A.P.I. de C.V.** — empresa de comercialización, distribución e intermediación de electrónicos (celulares, consolas, laptops, Smart TVs): importación/exportación, logística de última milla, almacenamiento y gestión de inventarios, consultoría.

## User Choices
- Estilo: moderno-tecnológico + corporativo/limpio → tema oscuro premium.
- Secciones: Inicio, Servicios, Productos, Nosotros, Contacto.
- Formulario de contacto: **solo visual** (sin persistencia).
- Marca/imágenes: propuestas por el diseñador (logo SVG original).
- Idioma: solo español.

## Architecture
- Frontend-only React SPA (CRA + craco). No backend / no DB.
- Smooth scroll con **lenis**; animaciones con **framer-motion**; marquee con **react-fast-marquee**; toasts con **sonner**; íconos **lucide-react**.
- Tipografías: Clash Display (títulos), Manrope (cuerpo), IBM Plex Mono (acentos).
- Paleta: #050505 base, cian #00E5FF, acento #FF3366.

## Personas
- Fabricantes / distribuidores / retail buscando un socio logístico y de importación de electrónica.
- Compradores mayoristas que evalúan capacidad y catálogo.

## Implemented (2026-06-23)
- Navbar sticky con logo SVG y scroll suave a secciones + menú móvil.
- Hero kinético con reveal enmascarado línea por línea y parallax de fondo.
- Marquee editorial (IMPORTACIÓN · EXPORTACIÓN · LOGÍSTICA · ...).
- Servicios: bento asimétrico de 5 tarjetas.
- Productos: selector interactivo con spotlight de imagen (celulares, consolas, laptops, Smart TVs) — catálogo "FLUX".
- Nosotros: stats con count-up + imagen.
- Contacto: formulario editorial (validación + toasts, visual).
- Footer con wordmark gigante. Favicon SVG de marca.
- Verificado por testing agent: 100% frontend, sin errores de consola.

## Backlog
- P1: Formulario funcional (guardar mensajes / enviar email vía Resend).
- P2: Versión bilingüe ES/EN.
- P2: Página de detalle por categoría de producto.
- P2: Sección de testimonios / logos de clientes.

## Next Tasks
- Awaiting user feedback.
