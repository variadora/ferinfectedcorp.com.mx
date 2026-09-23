import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { scrollToId } from "../../hooks/useLenis";

const LINKS = [
  { label: "Inicio", id: "inicio" },
  { label: "Servicios", id: "servicios" },
  { label: "Productos", id: "productos" },
  { label: "Nosotros", id: "nosotros" },
  { label: "Contacto", id: "contacto" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <button
          onClick={() => go("inicio")}
          data-testid="nav-logo"
          className="transition-opacity duration-300 hover:opacity-80"
        >
          <Logo />
        </button>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              data-testid={`nav-link-${l.id}`}
              className="group relative font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] transition-colors duration-300 hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#00E5FF] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <button
          onClick={() => go("contacto")}
          data-testid="nav-cta"
          className="hidden items-center gap-2 rounded-full bg-[#00E5FF] px-5 py-2.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#050505] transition-transform duration-300 hover:scale-[1.04] md:flex"
        >
          Cotizar
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          data-testid="nav-mobile-toggle"
          className="text-white md:hidden"
          aria-label="Menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#050505] md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  data-testid={`mobile-link-${l.id}`}
                  className="py-3 text-left font-display text-2xl tracking-tight text-white"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go("contacto")}
                className="mt-4 rounded-full bg-[#00E5FF] px-5 py-3 font-mono-accent text-xs uppercase tracking-[0.2em] text-[#050505]"
                data-testid="mobile-cta"
              >
                Solicitar Cotización
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
