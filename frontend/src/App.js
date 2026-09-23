import "@/App.css";
import { Toaster } from "sonner";
import useLenis from "@/hooks/useLenis";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { KineticMarquee } from "@/components/landing/KineticMarquee";
import { Servicios } from "@/components/landing/Servicios";
import { Productos } from "@/components/landing/Productos";
import { Nosotros } from "@/components/landing/Nosotros";
import { Contacto } from "@/components/landing/Contacto";
import { Footer } from "@/components/landing/Footer";

function App() {
  useLenis();

  return (
    <div className="App relative bg-[#050505]">
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <Hero />
        <KineticMarquee />
        <Servicios />
        <Productos />
        <Nosotros />
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
  );
}

export default App;
