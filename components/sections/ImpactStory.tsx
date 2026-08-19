"use client";

import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, type ReactNode } from "react";

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
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-24 md:px-8 md:pb-12 md:pt-32 lg:px-12 lg:pb-10">
        <Reveal>
          <p className="text-sm tracking-[0.18em] text-lime uppercase">
            {t.impact.eyebrow}
          </p>
          <h2 className="editorial-display mt-4 max-w-3xl text-[clamp(2.2rem,4.8vw,4.2rem)]">
            {t.impact.headline}
          </h2>
        </Reveal>

        <div className="mt-10 flex justify-center md:mt-14">
          <Carousel
            images={[
              { src: "/images/classroom.jpg", alt: t.impact.alts.classroom },
              { src: "/images/education.jpg", alt: t.impact.alts.library },
              { src: "/images/field.jpg", alt: t.impact.alts.children },
              { src: "/images/sustainability.jpg", alt: t.impact.alts.seedling },
              { src: "/images/infrastructure.jpg", alt: t.impact.alts.infrastructure },
            ]}
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

function Carousel({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative h-[520px] w-full max-w-[1100px]">
        {images.map((img, i) => {
          const offset = i - index;
          // keep offsets within [-2,2] for nicer stacking
          let visibleOffset = offset;
          if (offset <= -Math.ceil(images.length / 2)) visibleOffset = offset + images.length;
          if (offset > Math.ceil(images.length / 2)) visibleOffset = offset - images.length;
          const abs = Math.abs(visibleOffset);
          const translate = visibleOffset * 48;
          const scale = visibleOffset === 0 ? 1 : 0.78;
          const z = 10 - abs;
          const opacity = abs > 2 ? 0 : 1;

          return (
            <div
              key={img.src}
              className="absolute left-1/2 top-1/2 -translate-y-1/2"
              style={{
                transform: `translateX(${translate}%) translateY(-50%) scale(${scale})`,
                zIndex: z,
                opacity,
                transition: "transform 500ms, opacity 500ms",
              }}
            >
              <div
                className="overflow-hidden rounded-xl bg-black shadow-2xl"
                style={{ width: i === index ? 520 : 340 }}
              >
                <Image src={img.src} alt={img.alt} width={520} height={693} className="block object-cover" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
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
