import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "../../i18n/LanguageContext";

const VALUES = [
  { value: 50, suffix: "+", decimals: 0 },
  { value: 1.2, suffix: "M", decimals: 1 },
  { value: 99.4, suffix: "%", decimals: 1 },
  { value: 24, suffix: "/7", decimals: 0 },
];

const Counter = ({ value, suffix, decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const Nosotros = () => {
  const { t } = useLang();
  return (
    <section id="nosotros" className="relative border-t border-white/10 bg-[#050505] py-24 md:py-32" data-testid="nosotros">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#00E5FF]" />
              <span className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]">
                {t.nosotros.overline}
              </span>
            </div>
            <h2 className="font-display text-4xl font-600 leading-[1.02] tracking-tighter text-white sm:text-5xl lg:text-6xl">
              {t.nosotros.titleA}
              <br />
              <span className="text-stroke-cyan">{t.nosotros.titleB}</span>
            </h2>
            <p className="mt-8 max-w-lg font-body text-base leading-relaxed text-[#9CA3AF]">
              {t.nosotros.p1a}
              <span className="text-white">FLUX</span>
              {t.nosotros.p1b}
            </p>
            <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-[#9CA3AF]">
              {t.nosotros.p2}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-white/10 lg:col-span-6"
          >
            <img
              src="https://images.pexels.com/photos/36522028/pexels-photo-36522028.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=1200"
              alt="Centro de distribución"
              className="h-full min-h-[320px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 lg:grid-cols-4">
          {VALUES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              data-testid={`stat-${i}`}
            >
              <div className="font-display text-5xl font-600 tracking-tighter text-white md:text-6xl lg:text-7xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <p className="mt-3 font-mono-accent text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF]">
                {t.nosotros.stats[i]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
