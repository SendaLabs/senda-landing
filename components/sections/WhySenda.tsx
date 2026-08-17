"use client";

import { Reveal } from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";

export function WhySenda() {
  const reduce = useReducedMotion();
  const { t } = useT();

  return (
    <section className="bg-cream text-charcoal">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32 lg:px-12 lg:py-40">
        <Reveal>
          <h2 className="editorial-display text-[clamp(2.8rem,7vw,6.4rem)] text-forest">
            {t.why.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-charcoal/75">
            <p>{t.why.p1}</p>
            <p>{t.why.p2}</p>
          </div>
        </Reveal>

        <ul className="mt-20 space-y-4 md:mt-28">
          {t.why.statements.map((line, i) => (
            <motion.li
              key={line}
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="editorial-display border-t border-stone pt-4 text-[clamp(1.7rem,4vw,3.4rem)] text-forest"
            >
              {line}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
