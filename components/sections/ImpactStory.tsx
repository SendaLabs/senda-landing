"use client";

import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

const STORY_PATH =
  "M80 40C180 80 220 180 340 210C520 255 560 120 760 160C940 200 980 340 1180 310C1320 288 1400 200 1520 170";

export function ImpactStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { t } = useT();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-charcoal text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32 lg:px-12">
        <Reveal>
          <p className="text-sm tracking-[0.18em] text-lime uppercase">
            {t.impact.eyebrow}
          </p>
          <h2 className="editorial-display mt-4 max-w-3xl text-[clamp(2.2rem,4.8vw,4.2rem)]">
            {t.impact.headline}
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-4 md:grid-cols-12 md:grid-rows-[auto_auto]">
          <MaskedFigure className="relative min-h-[22rem] overflow-hidden md:col-span-7 md:min-h-[32rem]">
            <Image
              src="/images/classroom.jpg"
              alt={t.impact.alts.classroom}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 58vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
            <figcaption className="absolute right-6 bottom-6 left-6">
              <p className="text-sm tracking-[0.14em] text-lime uppercase">
                {t.impact.education}
              </p>
              <p className="mt-2 text-2xl tabular-nums tracking-[-0.03em]">
                <CountUp prefix="$" value={20000} /> {t.impact.allocated}
              </p>
            </figcaption>
          </MaskedFigure>

          <MaskedFigure className="relative min-h-[18rem] overflow-hidden md:col-span-5">
            <Image
              src="/images/education.jpg"
              alt={t.impact.alts.library}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 42vw, 100vw"
            />
            <div className="absolute inset-0 bg-charcoal/25" />
            <figcaption className="absolute bottom-6 left-6">
              <p className="text-sm tracking-[0.14em] text-cream/80 uppercase">
                {t.impact.materials}
              </p>
            </figcaption>
          </MaskedFigure>

          <MaskedFigure className="relative min-h-[16rem] overflow-hidden md:col-span-4">
            <Image
              src="/images/sustainability.jpg"
              alt={t.impact.alts.seedling}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
            <figcaption className="absolute right-5 bottom-5 left-5 text-sm">
              {t.impact.verified}
            </figcaption>
          </MaskedFigure>

          <MaskedFigure className="relative min-h-[16rem] overflow-hidden md:col-span-5">
            <Image
              src="/images/field.jpg"
              alt={t.impact.alts.children}
              fill
              className="object-cover object-center"
              sizes="(min-width: 768px) 42vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 to-transparent" />
            <figcaption className="absolute bottom-5 left-5">
              <p className="text-3xl tabular-nums tracking-[-0.04em]">
                <CountUp value={340} /> {t.impact.students}
              </p>
            </figcaption>
          </MaskedFigure>

          <MaskedFigure className="relative min-h-[16rem] overflow-hidden md:col-span-3">
            <Image
              src="/images/infrastructure.jpg"
              alt={t.impact.alts.infrastructure}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 25vw, 100vw"
            />
          </MaskedFigure>

          <svg
            viewBox="0 0 1440 420"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <motion.path
              d={STORY_PATH}
              className="path-stroke"
              stroke="#B7E46C"
              strokeWidth="1.5"
              style={reduce ? { pathLength: 1 } : { pathLength }}
            />
          </svg>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <StoryChip
            image="/images/healthcare.jpg"
            label={t.impact.healthcare}
            alt={t.impact.alts.healthcare}
          />
          <StoryChip
            image="/images/community.jpg"
            label={t.impact.community}
            alt={t.impact.alts.community}
          />
          <StoryChip
            image="/images/meeting.jpg"
            label={t.impact.local}
            alt={t.impact.alts.meeting}
          />
        </div>
      </div>
    </section>
  );
}

function MaskedFigure({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      className={className}
      initial={reduce ? false : { clipPath: "inset(6% 6% 6% 6%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.figure>
  );
}

function StoryChip({
  image,
  label,
  alt,
}: {
  image: string;
  label: string;
  alt: string;
}) {
  return (
    <figure className="relative min-h-[10rem] overflow-hidden">
      <Image src={image} alt={alt} fill className="object-cover" sizes="33vw" />
      <div className="absolute inset-0 bg-charcoal/35" />
      <figcaption className="absolute bottom-4 left-4 text-sm tracking-[0.12em] uppercase">
        {label}
      </figcaption>
    </figure>
  );
}
