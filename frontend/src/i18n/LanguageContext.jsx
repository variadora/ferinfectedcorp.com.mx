import { createContext, useContext, useState, useCallback } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "es";
    return localStorage.getItem("fic_lang") || "es";
  });

  const setLanguage = useCallback((l) => {
    setLang(l);
    localStorage.setItem("fic_lang", l);
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLanguage(lang === "es" ? "en" : "es");
  }, [lang, setLanguage]);

  const value = { lang, setLanguage, toggle, t: translations[lang] };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
