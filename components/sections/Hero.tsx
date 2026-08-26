"use client";

import { Button } from "@/components/Button";
import { useT } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const reduce = useReducedMotion();
  const { t } = useT();

  return (
    <section
      id="top"
      className="relative min-h-[118svh] overflow-hidden bg-forest text-cream"
    >
      <Image
        src="/images/TEST.png"
        alt={t.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_28%]"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(23,63,53,0.82) 0%, rgba(23,63,53,0.5) 34%, rgba(23,63,53,0.18) 62%, rgba(23,63,53,0.28) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(23,63,53,0.5), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[48%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,241,232,0) 0%, rgba(244,241,232,0.18) 32%, rgba(244,241,232,0.62) 64%, rgba(244,241,232,0.94) 84%, #F4F1E8 100%)",
        }}
      />

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1440px] items-start px-5 pt-[clamp(8rem,17svh,12rem)] pb-12 md:px-8 md:pt-[clamp(9rem,19svh,13rem)] lg:px-12">
        <div className="relative z-20 max-w-lg lg:max-w-xl">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="editorial-display max-w-[11ch] text-[clamp(2.65rem,7vw,5.8rem)] text-cream"
          >
            <span className="hero-impact-line block">{t.hero.headline1}</span>
            <span className="hero-impact-line block">{t.hero.headline2}</span>
          </motion.h1>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#contact" variant="cream">
              {t.hero.primary}
            </Button>
            <Button href="#how-it-works" variant="cream" arrow="right">
              {t.hero.secondary}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
