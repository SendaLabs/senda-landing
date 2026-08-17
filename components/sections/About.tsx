"use client";

import { Reveal } from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import { Eye, FileCheck, Scale } from "lucide-react";

export function About() {
  const { t } = useT();
  const principles = [
    {
      title: t.about.visibility,
      copy: t.about.visibilityCopy,
      icon: Eye,
    },
    {
      title: t.about.evidence,
      copy: t.about.evidenceCopy,
      icon: FileCheck,
    },
    {
      title: t.about.accountability,
      copy: t.about.accountabilityCopy,
      icon: Scale,
    },
  ];

  return (
    <section id="about" className="relative bg-cream text-charcoal">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-8 md:px-8 md:pb-32 md:pt-10 lg:px-12 lg:pb-40 lg:pt-12">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <Reveal>
            <h2 className="editorial-display text-[clamp(2.4rem,5.4vw,4.75rem)] text-forest">
              {t.about.headline1}
              <br />
              {t.about.headline2}
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="flex items-end">
            <div className="max-w-md space-y-5 text-[1.05rem] leading-relaxed text-charcoal/80 lg:pb-2">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p className="text-forest">{t.about.p3}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px border-y border-stone bg-stone md:mt-28 md:grid-cols-3">
          {principles.map((item, i) => (
            <Reveal
              key={item.title}
              delay={0.08 * i}
              className="bg-cream px-0 py-10 md:px-8 lg:py-14"
            >
              <item.icon
                className="mb-6 size-6 text-forest"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <h3 className="text-xl tracking-[-0.02em] text-forest">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xs text-[0.98rem] leading-relaxed text-charcoal/75">
                {item.copy}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
