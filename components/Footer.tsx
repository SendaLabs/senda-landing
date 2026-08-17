"use client";

import { Logo } from "@/components/Logo";
import { useT } from "@/lib/i18n";

const social = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://x.com", label: "X" },
];

export function Footer() {
  const { t } = useT();
  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#how-it-works", label: t.nav.how },
    { href: "#who-we-are", label: t.nav.who },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-12 md:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <a href="#top" aria-label="senda home">
          <Logo />
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.92rem] text-cream/75">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-cream">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex gap-6 text-[0.92rem] text-cream/75">
          {social.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="transition-colors hover:text-lime"
                rel="noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-[1440px] px-5 py-5 text-sm text-cream/50 md:px-8 lg:px-12">
          © 2026 Senda
        </p>
      </div>
    </footer>
  );
}
