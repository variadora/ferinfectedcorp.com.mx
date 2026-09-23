import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLang } from "../../i18n/LanguageContext";
import { PARTNERS } from "../../i18n/translations";

export const Aliados = () => {
  const { t } = useLang();

  return (
    <section
      id="aliados"
      className="relative border-t border-white/10 bg-[#050505] py-24 md:py-32"
      data-testid="aliados"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#00E5FF]" />
              <span className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]">
                {t.aliados.overline}
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-4xl font-600 leading-[1] tracking-tighter text-white sm:text-5xl lg:text-6xl">
              {t.aliados.title}
            </h2>
          </div>
          <p className="max-w-sm font-body text-base leading-relaxed text-[#9CA3AF]">
            {t.aliados.subtitle}
          </p>
        </div>
      </div>

      {/* Partner logos strip */}
      <div
        className="relative border-y border-white/10 py-8"
        data-testid="partners-strip"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#050505] to-transparent" />
        <Marquee speed={35} gradient={false} autoFill>
          {PARTNERS.map((p, i) => (
            <span
              key={p + i}
              className="mx-10 font-display text-2xl font-500 tracking-tight text-white/35 transition-colors duration-300 hover:text-white md:mx-14 md:text-3xl"
            >
              {p}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Testimonials */}
      <div className="mx-auto mt-16 max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.aliados.testimonials.map((tm, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              data-testid={`testimonial-${i}`}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0C0C0C] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#00E5FF]/40"
            >
              <div>
                <Quote size={28} className="text-[#00E5FF]" />
                <blockquote className="mt-6 font-body text-lg leading-relaxed text-[#E5E7EB]">
                  {tm.quote}
                </blockquote>
              </div>
              <figcaption className="mt-8 border-t border-white/10 pt-5">
                <div className="font-display text-lg tracking-tight text-white">
                  {tm.name}
                </div>
                <div className="mt-1 font-mono-accent text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF]">
                  {tm.role}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
