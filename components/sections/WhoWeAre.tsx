"use client";

import { LatinAmericaMap } from "@/components/LatinAmericaMap";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/lib/i18n";

const names = ["Emilio Alfaro", "Delfina Corradini", "Nicolas Bustelo"];
const profileImages = {
  "Delfina Corradini": "/images/P_Delfina.svg",
  "Nicolas Bustelo": "/images/P_Nicolas.png.svg",
  "Emilio Alfaro": "/images/P_Emilio.svg",
} as const;
const social = ["telegram", "linkedin", "twitter"] as const;
const socialLinks: Record<string, Partial<Record<(typeof social)[number], string>>> = {
  "Delfina Corradini": {
    telegram: "https://t.me/Delficorradini",
    linkedin: "https://www.linkedin.com/in/delfina-luna-corradini-668795224/",
    twitter: "https://x.com/Delfiicorradini",
  },
  "Nicolas Bustelo": {
    telegram: "https://t.me/nicobustelo",
    twitter: "https://x.com/nicobustelo__",
  },
  "Emilio Alfaro": {
    telegram: "https://t.me/ml0aa",
    twitter: "https://x.com/eml0aa",
  },
} as const;

export function WhoWeAre() {
  const { t } = useT();
  const team = names.map((name, i) => ({ name, role: t.team.roles[i] }));

  return (
    <section id="who-we-are" className="bg-white text-charcoal">
      <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_0.85fr] lg:gap-10">
          <div>
            <Reveal delay={0.08}>
              <div className="team-statement mt-5 mx-auto max-w-3xl px-4 py-7 text-center text-[clamp(1.55rem,2.25vw,2.35rem)] leading-[1.08] tracking-[-0.03em] text-charcoal sm:px-8 sm:py-8">
                <p>
                  {t.team.statement.before}
                  <strong className="font-semibold text-[#123C36]">{t.team.statement.tool}</strong>
                  {t.team.statement.middle}
                  <strong className="font-semibold text-[#123C36]">{t.team.statement.improve}</strong>
                  {t.team.statement.firstAfter}
                </p>
                <p className="mt-5">
                  {t.team.statement.second}
                </p>
              </div>
            </Reveal>

            <p className="mb-8 mt-5 text-center text-xs font-semibold tracking-[0.18em] text-[#123C36]/60 uppercase">{t.team.label}</p>
            <ul className="mx-auto grid max-w-xl grid-cols-3 gap-3 sm:gap-6">
              {team.map((person, i) => (
                <Reveal key={person.name} delay={0.05 * i}>
                  <li className="relative text-center text-[#123C36]">
                    <span
                      className="mx-auto mb-4 block size-34 overflow-hidden rounded-md border border-black bg-[#123C36]/5 sm:size-40 lg:size-44"
                    >
                      <img
                        src={profileImages[person.name as keyof typeof profileImages]}
                        alt={person.name}
                        className="size-full object-cover"
                      />
                    </span>
                    <p className="text-sm tracking-[-0.01em] sm:text-base">{person.name}</p>
                    <p className="mx-auto mt-1 max-w-[8rem] text-xs leading-snug text-[#123C36]/60">{person.role}</p>
                    <div className="mt-4 flex justify-center gap-2">
                      {social.map((network) => (
                        <a
                          key={network}
                          href={socialLinks[person.name as keyof typeof socialLinks]?.[network] ?? undefined}
                          aria-label={`${person.name} ${network}`}
                          className="flex size-6 items-center justify-center rounded-full border border-[#123C36] text-[#123C36] transition-colors hover:bg-[#123C36] hover:text-white"
                          {...(socialLinks[person.name as keyof typeof socialLinks]
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                        >
                          <SocialIcon name={network} />
                        </a>
                      ))}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.12} className="flex justify-center lg:justify-end">
            <LatinAmericaMap
              className="w-full max-w-[19rem] sm:max-w-[23rem] lg:max-w-[28rem]"
              costaRica={t.team.costaRica}
              argentina={t.team.argentina}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ name }: { name: (typeof social)[number] }) {
  const paths = {
    telegram:
      "M21.8 3.2 18.5 20c-.25 1.2-.9 1.5-1.82.94l-5-3.68-2.4 2.3c-.27.27-.5.5-1.02.5l.36-5.1 9.28-8.38c.4-.36-.09-.56-.62-.2L5.8 13.55.86 12c-1.07-.34-1.1-1.07.22-1.58L20.4 2.8c.9-.33 1.68.2 1.4.4Z",
    linkedin:
      "M5.1 8.1A1.6 1.6 0 1 0 5.1 5a1.6 1.6 0 0 0 0 3.1ZM3.7 18.9h2.8V9.7H3.7v9.2ZM8.3 9.7h2.7V11h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.4 1.89 3.4 4.35v5.03h-2.8v-4.46c0-1.06-.02-2.43-1.48-2.43-1.48 0-1.7 1.15-1.7 2.35v4.54H8.3V9.7Z",
    twitter:
      "M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.4L6.48 22H3.36l7.24-8.28L3 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.9h1.73L8.48 4H6.62L17.8 19.9Z",
  } as const;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3 fill-current">
      <path d={paths[name]} />
    </svg>
  );
}
