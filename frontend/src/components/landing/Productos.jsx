import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Gamepad2, Laptop, Tv, ArrowUpRight } from "lucide-react";
import { useLang } from "../../i18n/LanguageContext";
import { BRANDS } from "../../i18n/translations";

const META = {
  celulares: {
    icon: Smartphone,
    image:
      "https://images.unsplash.com/photo-1511140973288-19bf21d7e771?auto=format&fit=crop&w=1400&q=80",
  },
  consolas: {
    icon: Gamepad2,
    image:
      "https://images.pexels.com/photos/1337247/pexels-photo-1337247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
  },
  laptops: {
    icon: Laptop,
    image:
      "https://images.pexels.com/photos/14483025/pexels-photo-14483025.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
  },
  tvs: {
    icon: Tv,
    image:
      "https://images.pexels.com/photos/5202925/pexels-photo-5202925.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
  },
};

const ORDER = ["celulares", "consolas", "laptops", "tvs"];

export const Productos = () => {
  const { t } = useLang();
  const [activeId, setActiveId] = useState("celulares");
  const active = { id: activeId, ...META[activeId], ...t.productos.items[activeId] };

  return (
    <section
      id="productos"
      className="relative overflow-hidden border-t border-white/10 bg-[#080808] py-24 md:py-32"
      data-testid="productos"
    >
      <div className="pointer-events-none absolute left-[-10%] top-1/3 h-[400px] w-[400px] rounded-full bg-[#FF3366]/10 blur-[130px]" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-14 flex items-center gap-3">
          <span className="h-px w-10 bg-[#00E5FF]" />
          <span className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]">
            {t.productos.overline}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="mb-10 font-display text-4xl font-600 leading-[1] tracking-tighter text-white sm:text-5xl">
              {t.productos.title}
            </h2>
            <div className="flex flex-col">
              {ORDER.map((id) => {
                const Icon = META[id].icon;
                const item = t.productos.items[id];
                const isActive = activeId === id;
                return (
                  <button
                    key={id}
                    onMouseEnter={() => setActiveId(id)}
                    onClick={() => setActiveId(id)}
                    data-testid={`product-item-${id}`}
                    className={`group flex items-center justify-between border-b border-white/10 py-6 text-left transition-colors duration-300 ${
                      isActive ? "border-[#00E5FF]/40" : ""
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <Icon
                        size={24}
                        strokeWidth={1.4}
                        className={`transition-colors duration-300 ${
                          isActive ? "text-[#00E5FF]" : "text-white/40"
                        }`}
                      />
                      <div>
                        <span
                          className={`block font-display text-2xl tracking-tight transition-colors duration-300 md:text-3xl ${
                            isActive ? "text-white" : "text-white/50"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-[#6B7280]">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-[#00E5FF] opacity-100"
                          : "-translate-x-2 text-white/40 opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.08, clipPath: "inset(12% 12% 12% 12%)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img src={active.image} alt={active.label} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-0 left-0 z-10 w-full p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id + "-txt"}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="font-mono-accent text-[11px] uppercase tracking-[0.25em] text-[#00E5FF]">
                      {active.count}
                    </span>
                    <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-[#D1D5DB] md:text-base">
                      {active.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Brand / model chips */}
            <div className="mt-6">
              <span className="font-mono-accent text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
                {t.productos.modelsLabel}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-brands"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 flex flex-wrap gap-2.5"
                  data-testid={`product-brands-${active.id}`}
                >
                  {BRANDS[active.id].map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-white/10 bg-[#0C0C0C] px-4 py-2 font-body text-sm text-[#D1D5DB] transition-colors duration-300 hover:border-[#00E5FF]/50 hover:text-white"
                    >
                      {b}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
