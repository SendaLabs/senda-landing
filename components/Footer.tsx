"use client";

import { useT } from "@/lib/i18n";
import Image from "next/image";

const social = [
  { href: "https://github.com/SendaLabs", label: "GitHub", icon: "github" },
  { href: "https://www.linkedin.com/company/senda-labs", label: "LinkedIn", icon: "linkedin" },
  { href: "https://x.com/senda_app", label: "Twitter", icon: "twitter" },
];

function SocialIcon({ name }: { name: string }) {
  const paths = {
    github:
      "M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.71c-2.78.62-3.37-1.22-3.37-1.22-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.59 2.35 1.13 2.92.86.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 7.15a9.2 9.2 0 0 1 2.5.35c1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.95.68 1.92v2.84c0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z",
    linkedin:
      "M5.1 8.1A1.6 1.6 0 1 0 5.1 5a1.6 1.6 0 0 0 0 3.1ZM3.7 18.9h2.8V9.7H3.7v9.2ZM8.3 9.7h2.7V11h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.4 1.89 3.4 4.35v5.03h-2.8v-4.46c0-1.06-.02-2.43-1.48-2.43-1.48 0-1.7 1.15-1.7 2.35v4.54H8.3V9.7Z",
    twitter:
      "M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.4L6.48 22H3.36l7.24-8.28L3 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.9h1.73L8.48 4H6.62L17.8 19.9Z",
  } as const;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d={paths[name as keyof typeof paths]} />
    </svg>
  );
}

export function Footer() {
  const { t } = useT();
  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#how-it-works", label: t.nav.how },
    { href: "#who-we-are", label: t.nav.who },
    { href: "#contact", label: t.nav.contact },
  ];

  const columns = [
    {
      title: "Company",
      links: [links[0], links[2], links[3]],
    },
    {
      title: "Resources",
      links: [links[1], { href: "#product", label: "Product" }],
    },
    {
      title: "Media",
      links: social,
    },
  ];

  return (
    <footer className="bg-white text-[#183129]">
      <div className="mx-auto grid max-w-[1440px] gap-9 px-5 py-8 md:px-8 lg:grid-cols-[minmax(240px,1fr)_2fr] lg:gap-12 lg:px-12 lg:py-10">
        <div>
          <a href="#top" aria-label="senda home">
            <Image
              src="/images/logoverde.png"
              alt="senda"
              width={430}
              height={101}
              className="h-auto w-36"
              priority
            />
          </a>
          <ul className="mt-5 flex gap-2.5" aria-label="Social media">
            {social.map((item) => {
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    className="flex size-8 items-center justify-center rounded-full border border-[#183129]/25 text-[#183129] transition-colors hover:border-[#183129] hover:text-[#183129]"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <SocialIcon name={item.icon} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-medium text-[#183129]">{column.title}</h2>
                <ul className="mt-3 space-y-2 text-[0.88rem] text-[#183129]">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="transition-colors hover:text-[#183129]"
                        rel={"icon" in link ? "noreferrer" : undefined}
                        target={"icon" in link ? "_blank" : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </div>
      <div className="border-t border-black/10">
        <p className="mx-auto max-w-[1440px] px-5 py-3 text-xs text-[#183129] md:px-8 lg:px-12">
          © 2026 Senda
        </p>
      </div>
    </footer>
  );
}
