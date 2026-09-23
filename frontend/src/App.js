import "@/App.css";
import { Toaster } from "sonner";
import useLenis from "@/hooks/useLenis";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { KineticMarquee } from "@/components/landing/KineticMarquee";
import { Servicios } from "@/components/landing/Servicios";
import { Productos } from "@/components/landing/Productos";
import { Nosotros } from "@/components/landing/Nosotros";
import { Aliados } from "@/components/landing/Aliados";
import { Contacto } from "@/components/landing/Contacto";
import { Footer } from "@/components/landing/Footer";

function App() {
  useLenis();

  return (
    <LanguageProvider>
      <div className="App relative bg-[#050505]">
        <div className="grain-overlay" />
        <Navbar />
        <main>
          <Hero />
          <KineticMarquee />
          <Servicios />
          <Productos />
          <Nosotros />
          <Aliados />
          <Contacto />
        </main>
        <Footer />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0C0C0C",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#F9FAFB",
              fontFamily: "Manrope, sans-serif",
            },
          }}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
