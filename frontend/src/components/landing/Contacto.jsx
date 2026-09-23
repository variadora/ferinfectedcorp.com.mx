import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ArrowUpRight, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "../../i18n/LanguageContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Field = ({ label, id, type = "text", value, onChange, testid }) => (
  <div className="group relative">
    <label htmlFor={id} className="font-mono-accent text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      data-testid={testid}
      className="w-full border-b border-white/15 bg-transparent py-3 font-body text-lg text-white outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[#00E5FF]"
    />
  </div>
);

export const Contacto = () => {
  const { t } = useLang();
  const [form, setForm] = useState({ nombre: "", email: "", empresa: "", mensaje: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email) {
      toast.error(t.contacto.errorRequired);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success(t.contacto.success);
      setForm({ nombre: "", email: "", empresa: "", mensaje: "" });
    } catch (err) {
      toast.error(t.contacto.errorSend);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden border-t border-white/10 bg-[#080808] py-24 md:py-32"
      data-testid="contacto"
    >
      <div className="pointer-events-none absolute right-[-5%] top-0 h-[400px] w-[400px] rounded-full bg-[#00E5FF]/10 blur-[140px]" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#00E5FF]" />
              <span className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]">
                {t.contacto.overline}
              </span>
            </div>
            <h2 className="font-display text-4xl font-600 leading-[1] tracking-tighter text-white sm:text-5xl lg:text-6xl">
              {t.contacto.title}
            </h2>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-[#9CA3AF]">
              {t.contacto.subtitle}
            </p>

            <div className="mt-12 flex flex-col gap-5">
              <a
                href="mailto:admin@ferinfectedcorp.com.mx"
                data-testid="contact-email"
                className="group flex items-center gap-4 text-white/80 transition-colors duration-300 hover:text-[#00E5FF]"
              >
                <Mail size={18} strokeWidth={1.5} />
                <span className="font-body">admin@ferinfectedcorp.com.mx</span>
              </a>
              <a
                href="tel:+525500000000"
                data-testid="contact-phone"
                className="group flex items-center gap-4 text-white/80 transition-colors duration-300 hover:text-[#00E5FF]"
              >
                <Phone size={18} strokeWidth={1.5} />
                <span className="font-body">+52 55 0000 0000</span>
              </a>
              <div className="flex items-center gap-4 text-white/80">
                <MapPin size={18} strokeWidth={1.5} />
                <span className="font-body">{t.contacto.location}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              data-testid="contact-form"
              className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-[#0C0C0C] p-8 md:p-12"
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Field label={t.contacto.fields.nombre} id="nombre" value={form.nombre} onChange={set("nombre")} testid="input-nombre" />
                <Field label={t.contacto.fields.email} id="email" type="email" value={form.email} onChange={set("email")} testid="input-email" />
              </div>
              <Field label={t.contacto.fields.empresa} id="empresa" value={form.empresa} onChange={set("empresa")} testid="input-empresa" />
              <div className="group relative">
                <label htmlFor="mensaje" className="font-mono-accent text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
                  {t.contacto.fields.mensaje}
                </label>
                <textarea
                  id="mensaje"
                  rows={4}
                  value={form.mensaje}
                  onChange={set("mensaje")}
                  data-testid="input-mensaje"
                  className="w-full resize-none border-b border-white/15 bg-transparent py-3 font-body text-lg text-white outline-none transition-colors duration-300 focus:border-[#00E5FF]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                data-testid="contact-submit"
                className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-[#00E5FF] px-8 py-4 font-mono-accent text-xs uppercase tracking-[0.2em] text-[#050505] transition-transform duration-300 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    {t.contacto.sending}
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    {t.contacto.submit}
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};
