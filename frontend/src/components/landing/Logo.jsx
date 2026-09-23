export const Logo = ({ className = "h-8 w-auto", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${showText ? "" : ""}`}>
      <svg
        viewBox="0 0 64 64"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" fill="#0C0C0C" stroke="rgba(255,255,255,0.1)" />
        <path
          d="M20 16 H46 V24 H29 V30 H43 V38 H29 V48 H20 Z"
          fill="#00E5FF"
        />
        <rect x="40" y="40" width="8" height="8" fill="#FF3366" />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-base font-600 tracking-tight text-white">
            FERINFECTED
          </span>
          <span className="font-mono-accent text-[9px] uppercase tracking-[0.35em] text-[#00E5FF]">
            CORP · SAPI
          </span>
        </div>
      )}
    </div>
  );
};
