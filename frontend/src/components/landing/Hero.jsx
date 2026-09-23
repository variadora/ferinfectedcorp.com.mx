import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { scrollToId } from "../../hooks/useLenis";

const LINES = ["DISTRIBUCIÓN", "DE ELECTRÓNICA", "SIN FRONTERAS"];

const lineVariants = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.35 + i * 0.13, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050505]"
      data-testid="hero"
    >
      {/* Parallax backdrop */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1613690399151-65ea69478674?auto=format&fit=crop&w=2000&q=80"
          alt="Red logística global"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
      </motion.div>

      {/* Radial cyan glow */}
      <div className="pointer-events-none absolute right-[-10%] top-1/4 z-0 h-[500px] w-[500px] rounded-full bg-[#00E5FF]/20 blur-[140px]" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-6 pt-28 md:px-12"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[#00E5FF]" />
          <span className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]">
            FERINFECTED CORP · S.A.P.I. de C.V.
          </span>
        </motion.div>

        <h1 className="font-display text-[13vw] font-600 leading-[0.92] tracking-tighter text-white md:text-[9vw] lg:text-[8rem]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden py-[0.5vw]">
              <motion.span
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="show"
                className="block"
              >
                {i === 2 ? (
                  <span className="text-stroke-cyan">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl font-body text-base leading-relaxed text-[#9CA3AF] md:text-lg"
        >
          Comercialización, importación/exportación y logística de última milla
          para celulares, consolas, laptops y Smart TVs. Movemos tecnología a
          escala, con precisión operativa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollToId("servicios")}
            data-testid="hero-cta-servicios"
            className="group inline-flex items-center gap-3 rounded-full bg-[#00E5FF] px-7 py-4 font-mono-accent text-xs uppercase tracking-[0.2em] text-[#050505] transition-transform duration-300 hover:scale-[1.03]"
          >
            Explorar Servicios
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </button>
          <button
            onClick={() => scrollToId("contacto")}
            data-testid="hero-cta-contacto"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-mono-accent text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-[#00E5FF] hover:text-[#00E5FF]"
          >
            <Plus size={15} /> Solicitar Cotización
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom ticker line */}
      <div className="absolute bottom-6 left-0 z-10 flex w-full items-center justify-between px-6 md:px-12">
        <span className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-[#6B7280]">
          Scroll ↓
        </span>
        <span className="hidden font-mono-accent text-[10px] uppercase tracking-[0.3em] text-[#6B7280] md:block">
          Import · Export · Última Milla · Consultoría
        </span>
      </div>
    </section>
  );
};
