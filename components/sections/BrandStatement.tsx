"use client";

import { useT } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";

const MAIN =
  "M40 130C180 130 220 108 360 130C520 156 580 108 760 130C920 148 1000 130 1160 130";

const branches = [
  { d: "M180 128C176 108 168 92 158 78", delay: 0.55, leaves: "up" as const },
  { d: "M310 132C318 150 328 168 342 184", delay: 0.7, leaves: "down" as const },
  { d: "M470 128C462 106 448 88 430 70", delay: 0.85, leaves: "up" as const },
  { d: "M620 136C632 156 648 176 668 194", delay: 1, leaves: "down" as const },
  { d: "M790 128C782 104 766 86 748 68", delay: 1.15, leaves: "up" as const },
  { d: "M940 134C952 154 970 174 990 188", delay: 1.3, leaves: "down" as const },
  { d: "M1080 128C1074 108 1062 90 1046 74", delay: 1.45, leaves: "up" as const },
];

export function BrandStatement() {
  const reduce = useReducedMotion();
  const { t } = useT();

  return (
    <section className="relative overflow-hidden bg-lime text-charcoal">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center md:px-8 md:py-32">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="editorial-display max-w-4xl text-[clamp(2.2rem,6.4vw,5.6rem)]"
        >
          {t.brand.line1}
        </motion.p>

        <svg
          viewBox="0 0 1200 260"
          className="my-6 h-28 w-full max-w-4xl md:my-10 md:h-40"
          aria-hidden="true"
        >
          <motion.circle
            cx="40"
            cy="130"
            r="4.5"
            fill="#173F35"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          />
          <motion.path
            d={MAIN}
            className="path-stroke"
            stroke="#173F35"
            strokeWidth="1.7"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
          {branches.map((branch) => (
            <g key={branch.d}>
              <motion.path
                d={branch.d}
                className="path-stroke"
                stroke="#173F35"
                strokeWidth="1.25"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: reduce ? 0 : branch.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <Leaves
                branch={branch}
                reduce={!!reduce}
              />
            </g>
          ))}
        </svg>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="editorial-display max-w-4xl text-[clamp(2.2rem,6.4vw,5.6rem)]"
        >
          {t.brand.line2}
        </motion.p>
      </div>
    </section>
  );
}

function Leaves({
  branch,
  reduce,
}: {
  branch: (typeof branches)[number];
  reduce: boolean;
}) {
  const up = branch.leaves === "up";
  const end = branch.d.split(" ").slice(-2).join(" ");
  const [x, y] = end.split(" ").map(Number);
  const dir = up ? -1 : 1;

  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: reduce ? 0 : branch.delay + 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <path
        d={`M${x} ${y} C${x + 6} ${y + dir * 10} ${x + 16} ${y + dir * 14} ${x + 22} ${y + dir * 4} C${x + 14} ${y + dir * -2} ${x + 6} ${y + dir * -2} ${x} ${y}Z`}
        fill="#173F35"
      />
      <path
        d={`M${x} ${y} C${x - 8} ${y + dir * 8} ${x - 18} ${y + dir * 12} ${x - 24} ${y + dir * 2} C${x - 14} ${y + dir * -4} ${x - 6} ${y + dir * -2} ${x} ${y}Z`}
        fill="#173F35"
      />
      <circle cx={x} cy={y} r="2.2" fill="#173F35" />
    </motion.g>
  );
}
