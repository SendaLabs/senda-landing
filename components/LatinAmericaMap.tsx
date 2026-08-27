"use client";

import { cn } from "@/lib/cn";

type LatinAmericaMapProps = {
  className?: string;
  costaRica: string;
  argentina: string;
};

export function LatinAmericaMap({
  className,
  costaRica,
  argentina,
}: LatinAmericaMapProps) {
  return (
    <div
      className={cn("relative w-full", className)}
      role="img"
      aria-label={`${costaRica}, ${argentina}`}
    >
      {/* Natural Earth country outlines, projected in scripts/build-latam-map.mjs */}
      <img
        src="/maps/latin-america.svg"
        alt=""
        className="h-auto w-full"
        draggable={false}
      />
      <Marker left="40.81%" top="30.93%" label={costaRica} align="right" />
      <Marker left="61.96%" top="72.97%" label={argentina} align="left" />
    </div>
  );
}

function Marker({
  left,
  top,
  label,
  align,
}: {
  left: string;
  top: string;
  label: string;
  align: "left" | "right";
}) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ left, top, transform: "translate(-50%, -50%)" }}
    >
      <span
        className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime motion-reduce:animate-none"
        style={{ animation: "senda-pulse 2.2s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <span
        className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime"
        aria-hidden="true"
      />
      <span
        className={cn(
          "absolute top-1/2 whitespace-nowrap text-[12px] tracking-[0.05em] text-charcoal",
          align === "right"
            ? "left-[14px] -translate-y-1/2"
            : "right-[14px] -translate-y-1/2",
        )}
      >
        {label}
      </span>
    </div>
  );
}
