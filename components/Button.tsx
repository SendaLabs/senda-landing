"use client";

import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "lime" | "cream" | "outline" | "forest";

const variants: Record<Variant, string> = {
  lime: "bg-lime text-charcoal hover:bg-[#c5ec86]",
  cream: "bg-cream text-forest hover:bg-cream-deep",
  outline:
    "border border-current bg-transparent text-inherit hover:bg-cream/10",
  forest: "bg-[#183129] text-white hover:bg-forest-soft",
};

type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  arrow?: "right" | "up-right" | "none";
};

type ButtonAsButton = Common &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = Common &
  Omit<ComponentProps<"a">, "className" | "children" | "href"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    children,
    className,
    variant = "lime",
    arrow = "up-right",
    ...rest
  } = props;

  const classes = cn(
    "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 px-6 text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  const content = (
    <>
      {children}
      {arrow === "up-right" ? (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      ) : null}
      {arrow === "right" ? (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <a href={href} className={classes} {...linkRest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {content}
    </button>
  );
}
