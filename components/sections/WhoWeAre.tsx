"use client";

import { LatinAmericaMap } from "@/components/LatinAmericaMap";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/lib/i18n";

const names = ["Emilio Alfaro", "Delfina Corradini"];

export function WhoWeAre() {
  const { t } = useT();
  const team = names.map((name, i) => ({ name, role: t.team.roles[i] }));

  return (
    <section id="who-we-are" className="bg-forest text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32 lg:px-12 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="editorial-display max-w-xl text-[clamp(2.2rem,4.8vw,4.2rem)]">
                {t.team.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-cream/75">
                <p>{t.team.p1}</p>
                <p>{t.team.p2}</p>
              </div>
            </Reveal>

            <ul className="mt-16 grid max-w-xl gap-10 sm:grid-cols-2">
              {team.map((person, i) => (
                <Reveal key={person.name} delay={0.05 * i}>
                  <li>
                    <span
                      className="mb-4 flex size-12 items-center justify-center border border-cream/20 text-sm tracking-[0.08em] text-lime"
                      aria-hidden="true"
                    >
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <p className="text-xl tracking-[-0.02em]">{person.name}</p>
                    <p className="mt-1 text-cream/60">{person.role}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.12} className="flex justify-center lg:justify-end">
            <LatinAmericaMap
              className="w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[26rem]"
              costaRica={t.team.costaRica}
              argentina={t.team.argentina}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
