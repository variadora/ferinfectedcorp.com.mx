import Marquee from "react-fast-marquee";
import { useLang } from "../../i18n/LanguageContext";

export const KineticMarquee = () => {
  const { t } = useLang();
  return (
    <section
      className="relative border-y border-white/10 bg-[#050505] py-8 md:py-12"
      data-testid="marquee"
      aria-hidden="true"
    >
      <Marquee speed={45} gradient={false} autoFill>
        {t.marquee.map((w, i) => (
          <div key={w + i} className="flex items-center">
            <span className="text-stroke font-display text-[8vw] font-600 tracking-tight md:text-[6rem]">
              {w}
            </span>
            <span className="mx-8 inline-block h-3 w-3 rotate-45 bg-[#00E5FF] md:mx-14" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};
