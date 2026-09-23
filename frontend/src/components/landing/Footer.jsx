import { Logo } from "./Logo";
import { scrollToId } from "../../hooks/useLenis";

const LINKS = [
  { label: "Inicio", id: "inicio" },
  { label: "Servicios", id: "servicios" },
  { label: "Productos", id: "productos" },
  { label: "Nosotros", id: "nosotros" },
  { label: "Contacto", id: "contacto" },
];

export const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-[#050505]"
      data-testid="footer"
    >
      {/* Giant brand wordmark */}
      <div className="mx-auto max-w-[1400px] px-6 pt-20 md:px-12">
        <h2 className="select-none font-display text-[16vw] font-600 leading-[0.8] tracking-tighter text-white/5 md:text-[13rem]">
          FERINFECTED
        </h2>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12">
        <div className="flex flex-col justify-between gap-10 border-t border-white/10 pt-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 font-body text-sm leading-relaxed text-[#6B7280]">
              Comercialización, distribución e intermediación de electrónica de
              consumo. Importación, exportación, logística y consultoría.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                data-testid={`footer-link-${l.id}`}
                className="font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] transition-colors duration-300 hover:text-[#00E5FF]"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <span className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-[#6B7280]">
            © 2026 FERINFECTED CORP, S.A.P.I. de C.V.
          </span>
          <span className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-[#6B7280]">
            Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  );
};
