"use client";

import { Reveal } from "@/components/Reveal";
import { useT } from "@/lib/i18n";

export function WhoItsFor() {
  const { t } = useT();
  const audiences = [
    {
      eyebrow: t.audiences.orgsEyebrow,
      title: t.audiences.orgsTitle,
      copy: t.audiences.orgsCopy,
      benefits: t.audiences.orgsBenefits,
    },
    {
      eyebrow: t.audiences.fundersEyebrow,
      title: t.audiences.fundersTitle,
      copy: t.audiences.fundersCopy,
      benefits: t.audiences.fundersBenefits,
    },
  ];

  return (
    <section className="bg-cream-deep text-charcoal">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
        {audiences.map((item, i) => (
          <article
            key={item.eyebrow}
            className={`px-5 py-20 md:px-10 lg:px-16 lg:py-28 ${
              i === 0 ? "border-b border-stone md:border-r md:border-b-0" : ""
            }`}
          >
            <Reveal>
              <p className="text-sm tracking-[0.18em] text-forest/65 uppercase">
                {item.eyebrow}
              </p>
              <h2 className="editorial-display mt-5 max-w-md text-[clamp(1.85rem,3vw,2.8rem)] text-forest">
                {item.title}
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-charcoal/75">
                {item.copy}
              </p>
              <ul className="mt-10 space-y-3">
                {item.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-[0.98rem]"
                  >
                    <span className="h-px w-6 bg-lime" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
