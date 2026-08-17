"use client";

import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const expenseAmounts = ["$4,280", "$1,150", "$6,840", "$2,310"];
const evidenceImages = [
  "/images/sustainability.jpg",
  "/images/classroom.jpg",
  "/images/field.jpg",
];

const JOURNEY_PATH =
  "M48 72C48 150 220 150 220 230C220 310 48 310 48 400C48 490 250 500 250 600";

export function HowItWorks() {
  const { t } = useT();
  return (
    <section id="how-it-works" className="bg-cream-deep text-charcoal">
      <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-8 lg:px-12">
        <p className="text-sm tracking-[0.18em] text-forest/70 uppercase">
          {t.how.eyebrow}
        </p>
      </div>
      <div className="hidden lg:block">
        <DesktopJourney />
      </div>
      <div className="lg:hidden">
        <MobileJourney />
      </div>
    </section>
  );
}

function DesktopJourney() {
  const { t } = useT();
  const steps = t.how.steps;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [step, setStep] = useState(0);
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.18, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.22) setStep(0);
    else if (v < 0.48) setStep(1);
    else if (v < 0.74) setStep(2);
    else setStep(3);
  });

  const current = steps[step];

  return (
    <div ref={ref} className="relative h-[380vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-[0.9fr_1.1fr] gap-12 px-8 lg:px-12">
          <div className="flex flex-col justify-center">
            <p className="text-sm tabular-nums tracking-[0.2em] text-forest/55">
              {current.number}
            </p>
            <motion.h2
              key={current.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="editorial-display mt-4 text-[clamp(2.4rem,4.2vw,4.4rem)] text-forest"
            >
              {current.title}
            </motion.h2>
            <motion.p
              key={current.copy}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/75"
            >
              {current.copy}
            </motion.p>
            <ol className="mt-12 flex gap-3" aria-hidden="true">
              {steps.map((s, i) => (
                <li
                  key={s.number}
                  className={cn(
                    "h-px w-10 transition-colors duration-500",
                    i <= step ? "bg-lime" : "bg-stone",
                  )}
                />
              ))}
            </ol>
          </div>
          <div className="relative flex items-center">
            <JourneyStage step={step} pathLength={pathLength} reduce={!!reduce} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileJourney() {
  const { t } = useT();
  const steps = t.how.steps;
  return (
    <div className="mx-auto max-w-[1440px] space-y-16 px-5 py-16 md:px-8">
      {steps.map((s, i) => (
        <article key={s.number} className="space-y-8">
          <div>
            <p className="text-sm tabular-nums tracking-[0.2em] text-forest/55">
              {s.number}
            </p>
            <h2 className="editorial-display mt-3 text-[2.15rem] text-forest">
              {s.title}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-charcoal/75">
              {s.copy}
            </p>
          </div>
          <div className="relative">
            <JourneyStage step={i} pathLength={1} reduce />
          </div>
        </article>
      ))}
    </div>
  );
}

function JourneyStage({
  step,
  pathLength,
  reduce,
}: {
  step: number;
  pathLength: number | MotionValue<number>;
  reduce: boolean;
}) {
  const { t } = useT();
  const expenses = t.how.expenses.map((label, i) => ({
    label,
    amount: expenseAmounts[i],
  }));
  const evidence = t.how.evidence.map((item, i) => ({
    ...item,
    image: evidenceImages[i],
  }));
  const timeline = t.how.timeline;
  return (
    <div className="relative h-[38rem] w-full overflow-hidden border border-stone bg-cream md:h-[42rem]">
      <svg
        viewBox="0 0 320 680"
        className="pointer-events-none absolute inset-y-0 left-6 h-full w-40 opacity-90"
        aria-hidden="true"
      >
        <motion.path
          d={JOURNEY_PATH}
          className="path-stroke"
          stroke="#173F35"
          strokeWidth="1.4"
          style={reduce ? { pathLength: 1 } : { pathLength }}
        />
        <circle cx="48" cy="72" r="4.5" fill="#B7E46C" />
      </svg>

      <motion.div
        className="absolute top-8 left-[22%] right-6 max-w-sm"
        animate={{ opacity: 1, y: 0 }}
      >
        <FundCard />
      </motion.div>

      <motion.div
        className="absolute top-[15.75rem] right-6 left-[28%] space-y-2"
        animate={{
          opacity: step >= 1 ? 1 : 0,
          y: step >= 1 ? 0 : 12,
        }}
        transition={{ duration: 0.45 }}
      >
        {expenses.map((item, i) => (
          <div
            key={item.label}
            className="flex items-center justify-between border border-stone bg-cream-deep/80 px-4 py-2.5 text-sm"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-lime" />
              {item.label}
            </span>
            <span className="tabular-nums text-forest">{item.amount}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="absolute top-[26.75rem] left-[22%] right-5 flex gap-3 overflow-hidden"
        animate={{
          opacity: step >= 2 ? 1 : 0,
          y: step >= 2 ? 0 : 12,
        }}
        transition={{ duration: 0.45 }}
      >
        {evidence.map((item) => (
          <div
            key={item.title}
            className="min-w-[7.5rem] flex-1 border border-stone bg-cream"
          >
            <div className="relative h-16 overflow-hidden">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="140px"
              />
            </div>
            <div className="px-2.5 py-2">
              <p className="text-xs text-forest">{item.title}</p>
              <p className="text-[0.65rem] text-charcoal/60">{item.meta}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="absolute right-5 bottom-6 left-5"
        animate={{
          opacity: step >= 3 ? 1 : 0,
          y: step >= 3 ? 0 : 10,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between gap-1 border border-forest bg-forest px-3 py-3 text-cream sm:px-4">
          {timeline.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="text-center">
                <span className="mx-auto mb-1 block size-1.5 rounded-full bg-lime" />
                <span className="text-[0.62rem] tracking-[0.06em] uppercase sm:text-[0.7rem]">
                  {label}
                </span>
              </div>
              {i < timeline.length - 1 ? (
                <span className="mx-1 h-px flex-1 bg-lime/80" />
              ) : null}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FundCard() {
  const { t } = useT();
  return (
    <div className="border border-stone bg-cream p-5 shadow-[0_20px_50px_-28px_rgba(23,63,53,0.35)]">
      <p className="text-[0.7rem] tracking-[0.16em] text-forest/60 uppercase">
        {t.how.program}
      </p>
      <h3 className="mt-2 text-xl tracking-[-0.02em] text-forest">
        {t.how.educationProgram}
      </h3>
      <p className="mt-4 text-3xl tabular-nums tracking-[-0.03em] text-charcoal">
        $125,430
      </p>
      <p className="mt-1 text-sm text-charcoal/60">{t.how.received}</p>
      <div className="mt-5 h-px bg-stone">
        <div className="h-px w-full bg-lime" />
      </div>
    </div>
  );
}
