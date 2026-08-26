"use client";

import { Button } from "@/components/Button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Nav() {
  const { t } = useT();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#how-it-works", label: t.nav.how },
    { href: "#who-we-are", label: t.nav.who },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 rounded-b-2xl border-b border-stone/70 bg-white text-black"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-lime focus:px-3 focus:py-2 focus:text-charcoal"
      >
        {t.skip}
      </a>
      <nav
        className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12"
        aria-label="Primary"
      >
        <a href="#top" className="relative z-10 shrink-0" aria-label="senda home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href.slice(1) ? "page" : undefined}
                className={cn(
                  "relative text-[0.92rem] tracking-[-0.01em] transition-opacity duration-300",
                  active === link.href.slice(1)
                    ? "text-black opacity-100"
                    : "text-black opacity-100 hover:opacity-70",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left bg-lime transition-transform duration-300",
                    active === link.href.slice(1) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageToggle className="relative z-10" />
          <Button
            href="#contact"
            variant="forest"
            className="hidden min-h-10 rounded-full px-5 sm:inline-flex"
          >
            {t.nav.try}
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[4.5rem] z-40 bg-cream text-forest lg:hidden"
          >
            <ul className="flex flex-col gap-2 px-6 py-10">
              {links.map((link, i) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    className="block py-3 text-3xl tracking-[-0.03em]"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
              <li className="pt-8">
                <Button
                  href="#contact"
                  variant="forest"
                  className="w-full rounded-full"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.try}
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
