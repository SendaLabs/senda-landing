"use client";

import { useT } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";

export function BrandStatement() {
  const reduce = useReducedMotion();
  const { t } = useT();

    return (
      <section className="relative overflow-hidden bg-forest-deep text-cream">
        <div className="mx-auto grid min-h-[70vh] max-w-[1440px] items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="editorial-display max-w-xl text-[clamp(2.5rem,5.6vw,5.4rem)]"
          >
            {t.brand.line1}
            <br />
            <span className="hero-impact-line mt-4 block text-lime">{t.brand.line2}</span>
          </motion.p>

          <ChatMotion
            messages={t.brand.messages}
            approve={t.brand.approve}
            label={t.brand.botLabel}
            reduce={!!reduce}
          />
        </div>
      </section>
    );
  }

  function ChatMotion({
    messages,
    approve,
    label,
    reduce,
  }: {
    messages: string[];
    approve: string;
    label: string;
    reduce: boolean;
  }) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[25rem] overflow-hidden rounded-[1.25rem] bg-[#123c31] p-6 sm:p-8"
      >
        <div className="ml-auto max-w-xl">
          <p className="mb-6 text-right text-xs tracking-[0.16em] text-cream/50 uppercase">{label}</p>
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: reduce ? 0 : 0.5 } } }}
            className="space-y-3"
          >
            <Bubble text="[Factura_proveedor_mayo.pdf]" sent />
            {messages.map((message, index) => (
              <Bubble key={message} text={`${index > 0 ? "✓ " : ""}${message}`} sent={index === 2} />
            ))}
            <Bubble text={approve} sent />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  function Bubble({ text, sent }: { text: string; sent?: boolean }) {
    return (
      <motion.div
        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed text-cream/90 ${sent ? "ml-auto bg-[#4bb486] text-charcoal" : "bg-cream/10"}`}
      >
        {text}
      </motion.div>
    );
  }
