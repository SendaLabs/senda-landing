"use client";

import { Reveal } from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import {
  Camera,
  FileText,
  History,
  Shield,
  Users,
  Waypoints,
} from "lucide-react";

const icons = [Waypoints, Camera, FileText, History, Shield, Users];

export function Product() {
  const { t } = useT();

  return (
    <section className="bg-forest text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32 lg:px-12 lg:py-40">
        <Reveal>
          <h2 className="editorial-display max-w-4xl text-[clamp(2.3rem,5vw,4.6rem)]">
            {t.product.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg text-cream/75">{t.product.sub}</p>
        </Reveal>

        <div className="mt-16 grid gap-px bg-cream/10 md:grid-cols-2 lg:grid-cols-3">
          {t.product.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.title} delay={0.04 * i}>
                <article className="group h-full bg-forest p-8 transition-[transform,background-color] duration-500 hover:-translate-y-1 hover:bg-forest-soft lg:p-10">
                  <Icon
                    className="size-5 text-lime transition-transform duration-500 group-hover:translate-x-0.5"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  <h3 className="mt-8 text-xl tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-cream/70">
                    {item.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
