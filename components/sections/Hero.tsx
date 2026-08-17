"use client";

import { Button } from "@/components/Button";
import { SMark } from "@/components/Logo";
import { useT } from "@/lib/i18n";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VIEW_W = 1440;
const VIEW_H = 900;

const HERO_PATH =
  "M780 500C900 430 980 270 1140 260C1280 250 1360 370 1348 500C1334 640 1180 720 1000 770C820 820 640 860 500 900";

const LABEL_META = [
  { t: 0.04, key: "funds", side: "right" as const },
  { t: 0.26, key: "allocated", side: "left" as const },
  { t: 0.5, key: "used", side: "left" as const },
  { t: 0.72, key: "verified", side: "left" as const },
  { t: 0.93, key: "impact", side: "right" as const },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { t } = useT();

  return (
    <section
      id="top"
      className="relative min-h-[118svh] overflow-hidden bg-forest text-cream"
    >
      <Image
        src="/images/hero-forest.jpg"
        alt={t.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_28%]"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(23,63,53,0.82) 0%, rgba(23,63,53,0.5) 34%, rgba(23,63,53,0.18) 62%, rgba(23,63,53,0.28) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(23,63,53,0.5), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[48%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,241,232,0) 0%, rgba(244,241,232,0.18) 32%, rgba(244,241,232,0.62) 64%, rgba(244,241,232,0.94) 84%, #F4F1E8 100%)",
        }}
      />

      <HeroPath reduce={!!reduce} labels={t.hero.labels} />

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1440px] items-center px-5 pt-24 pb-12 md:px-8 md:pt-28 lg:px-12">
        <div className="relative z-20 max-w-xl lg:max-w-2xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 flex items-center gap-3 text-sm tracking-[0.18em] text-cream/80 uppercase"
          >
            <SMark className="h-6 w-auto" />
            senda
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="editorial-display text-[clamp(3.1rem,8vw,6.8rem)] text-cream"
          >
            {t.hero.headline1}
            <br />
            {t.hero.headline2}
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="mt-8 max-w-md text-lg leading-relaxed text-cream/85 md:text-[1.2rem]"
          >
            {t.hero.body}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#contact" variant="lime">
              {t.hero.primary}
            </Button>
            <Button href="#how-it-works" variant="outline" arrow="right">
              {t.hero.secondary}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroPath({
  reduce,
  labels,
}: {
  reduce: boolean;
  labels: {
    funds: string;
    allocated: string;
    used: string;
    verified: string;
    impact: string;
  };
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(reduce ? 1 : 0);
  const [points, setPoints] = useState<
    Array<{
      t: number;
      text: string;
      side: "left" | "right";
      x: number;
      y: number;
    }>
  >([]);
  const dotX = useMotionValue(780);
  const dotY = useMotionValue(500);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    setPoints(
      LABEL_META.map((label) => {
        const point = path.getPointAtLength(length * label.t);
        return {
          t: label.t,
          text: labels[label.key],
          side: label.side,
          x: point.x,
          y: point.y,
        };
      }).filter((label) => label.x > 700),
    );

    const start = path.getPointAtLength(0);
    dotX.set(start.x);
    dotY.set(start.y);

    if (reduce) {
      const end = path.getPointAtLength(length);
      dotX.set(end.x);
      dotY.set(end.y);
      return;
    }

    const controls = animate(progress, 1, {
      duration: 3.6,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.4,
    });

    return () => controls.stop();
  }, [dotX, dotY, labels, progress, reduce]);

  useMotionValueEvent(progress, "change", (value) => {
    const path = pathRef.current;
    if (!path) return;
    const point = path.getPointAtLength(path.getTotalLength() * value);
    dotX.set(point.x);
    dotY.set(point.y);
  });

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full max-md:opacity-70"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d={HERO_PATH}
        className="path-stroke"
        stroke="#173F35"
        strokeWidth="5"
        opacity="0.28"
      />
      <path
        d={HERO_PATH}
        className="path-stroke"
        stroke="#B7E46C"
        strokeWidth="1.4"
        opacity="0.22"
      />
      <motion.path
        d={HERO_PATH}
        className="path-stroke"
        stroke="#B7E46C"
        strokeWidth="2.1"
        style={{ pathLength: progress }}
      />
      <motion.circle cx={dotX} cy={dotY} r="6" fill="#B7E46C" />
      <motion.circle
        cx={dotX}
        cy={dotY}
        r="11"
        fill="none"
        stroke="#B7E46C"
        strokeWidth="1"
        opacity="0.45"
      />

      {points.map((label) => (
        <PathLabel
          key={label.text}
          progress={progress}
          label={label}
          reduce={reduce}
        />
      ))}
    </svg>
  );
}

function PathLabel({
  progress,
  label,
  reduce,
}: {
  progress: MotionValue<number>;
  label: {
    t: number;
    text: string;
    side: "left" | "right";
    x: number;
    y: number;
  };
  reduce: boolean;
}) {
  const opacity = useTransform(
    progress,
    [label.t - 0.025, label.t + 0.02],
    [0, 1],
  );
  const isLeft = label.side === "left";

  return (
    <motion.g
      style={{ opacity: reduce ? 1 : opacity }}
      className="hidden lg:block"
    >
      <circle cx={label.x} cy={label.y} r="3.4" fill="#F4F1E8" />
      <text
        x={isLeft ? label.x - 14 : label.x + 14}
        y={label.y - 14}
        fill="#F4F1E8"
        fontSize="15"
        letterSpacing="0.08em"
        textAnchor={isLeft ? "end" : "start"}
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {label.text}
      </text>
    </motion.g>
  );
}
