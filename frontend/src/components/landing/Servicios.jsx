import { motion } from "framer-motion";
import { Globe, Truck, Warehouse, LineChart, Handshake, ArrowUpRight } from "lucide-react";
import { useLang } from "../../i18n/LanguageContext";

const META = [
  {
    n: "01",
    icon: Globe,
    span: "lg:col-span-8",
    image:
      "https://images.pexels.com/photos/27402391/pexels-photo-27402391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    feature: true,
  },
  { n: "02", icon: Truck, span: "lg:col-span-4" },
  { n: "03", icon: Warehouse, span: "lg:col-span-4" },
  { n: "04", icon: LineChart, span: "lg:col-span-4" },
  { n: "05", icon: Handshake, span: "lg:col-span-4" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Servicios = () => {
  const { t } = useLang();
  const cards = META.map((m, i) => ({ ...m, ...t.servicios.cards[i] }));

  return (
    <section id="servicios" className="relative bg-[#050505] py-24 md:py-32" data-testid="servicios">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#00E5FF]" />
              <span className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]">
                {t.servicios.overline}
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-4xl font-600 leading-[1] tracking-tighter text-white sm:text-5xl lg:text-6xl">
              {t.servicios.title}
            </h2>
          </div>
          <p className="max-w-sm font-body text-base leading-relaxed text-[#9CA3AF]">
            {t.servicios.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {cards.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                data-testid={`service-card-${s.n}`}
                className={`group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#00E5FF]/50 hover:shadow-[0_0_40px_-12px_rgba(0,229,255,0.4)] ${s.span} ${
                  s.feature ? "lg:min-h-[420px]" : ""
                }`}
              >
                {s.feature && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="h-full w-full object-cover opacity-25 transition-all duration-700 group-hover:scale-105 group-hover:opacity-35"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-mono-accent text-xs uppercase tracking-[0.25em] text-[#00E5FF]">
                    {s.n} / {t.servicios.serviceLabel}
                  </span>
                  <Icon
                    size={26}
                    strokeWidth={1.4}
                    className="text-white/60 transition-colors duration-300 group-hover:text-[#00E5FF]"
                  />
                </div>

                <div className="relative z-10 mt-8">
                  <h3
                    className={`font-display font-500 tracking-tight text-white ${
                      s.feature ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#9CA3AF]">
                    {s.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-2 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-white/70 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#00E5FF] group-hover:opacity-100">
                    {t.servicios.more} <ArrowUpRight size={14} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
