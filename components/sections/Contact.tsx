"use client";

import { Button } from "@/components/Button";
import { useT } from "@/lib/i18n";

export function Contact() {
  const { t } = useT();

  return (
    <section id="contact" className="bg-forest text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24 lg:px-12 lg:py-28">
        <div className="relative isolate min-h-[480px] overflow-hidden rounded-[28px] bg-charcoal px-7 py-12 md:px-14 md:py-16 lg:min-h-[510px] lg:px-16 lg:py-20">
          <div className="relative z-10 max-w-xl">
            <p className="mb-6 text-xs font-medium tracking-[0.2em] text-lime uppercase">
              Senda
            </p>
            <h2 className="editorial-display max-w-lg text-[clamp(2.5rem,5vw,4.7rem)]">
              {t.contact.headline}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70 md:text-lg">
              {t.contact.body}
            </p>
            <Button
              href="mailto:hello@senda.org"
              variant="cream"
              arrow="right"
              className="mt-9"
            >
              {t.contact.submit}
            </Button>
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-12 -top-24 h-[590px] w-[280px] [perspective:1200px] md:right-[18%] md:-top-28 md:w-[310px]">
              <div className="absolute inset-0 translate-x-5 translate-y-7 rotate-[8deg] rounded-[38px] bg-black/45 blur-xl" />
              <div className="relative h-full w-full rotate-[8deg] rounded-[38px] border-[10px] border-[#484b48] bg-cream shadow-[24px_32px_0_#0b0d0c,0_30px_60px_rgba(0,0,0,0.38)] [transform:rotateY(-14deg)_rotateX(3deg)] [transform-style:preserve-3d]">
                <div className="absolute -right-3 top-12 h-32 w-3 rounded-r-full bg-[#292c2a] shadow-[inset_-1px_0_#626661]" />
                <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-charcoal" />
                <div className="m-5 mt-12 h-full overflow-hidden rounded-[20px] bg-[#edf0e9] p-5 text-charcoal">
                <div className="flex items-center justify-between text-[9px] font-semibold">
                  <span>9:41</span>
                  <span>•••</span>
                </div>
                <div className="mt-10 text-[11px] text-charcoal/55">Welcome back</div>
                <div className="mt-1 text-2xl font-semibold tracking-[-0.06em]">
                  $3,248.00
                </div>
                <div className="mt-5 h-24 rounded-xl bg-forest p-3 text-cream">
                  <div className="text-[9px] text-cream/60">Resources tracked</div>
                  <div className="mt-3 h-8 border-b border-lime/50 [clip-path:polygon(0_80%,15%_50%,28%_65%,40%_25%,52%_50%,66%_15%,78%_35%,100%_0,100%_100%,0_100%)] bg-lime/70" />
                </div>
                <div className="mt-5 space-y-3 text-[10px]">
                  <div className="flex justify-between">
                    <span>Education program</span>
                    <strong>$1,240</strong>
                  </div>
                  <div className="h-px bg-charcoal/10" />
                  <div className="flex justify-between">
                    <span>Field operations</span>
                    <strong>$860</strong>
                  </div>
                  <div className="h-px bg-charcoal/10" />
                  <div className="flex justify-between">
                    <span>Community work</span>
                    <strong>$624</strong>
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div className="absolute right-[3%] top-[30%] z-20 w-48 rotate-[-7deg] rounded-2xl bg-[#0d0e0e] p-5 text-cream shadow-2xl md:right-[6%] md:w-56">
              <div className="flex items-center justify-between text-[10px] text-cream/60">
                <span>↗ payable</span>
                <span>◼</span>
              </div>
              <div className="mt-10 text-xl leading-none tracking-[-0.05em]">
                Clare
                <br />
                Bamford
              </div>
              <div className="mt-8 flex justify-between text-[9px] text-cream/55">
                <span>•••• 1292</span>
                <span>08/28</span>
              </div>
            </div>
            <div className="absolute left-[47%] top-[18%] z-20 w-36 rounded-2xl bg-cream p-4 text-charcoal shadow-xl md:left-[51%] md:w-40">
              <div className="flex items-center gap-2 text-[9px] text-charcoal/55">
                <span className="grid size-6 place-items-center rounded-full bg-lime text-[11px]">
                  ↗
                </span>
                Total Savings
              </div>
              <strong className="mt-2 block text-lg tracking-[-0.04em]">
                $2,352.754
              </strong>
              <div className="mt-1 text-[8px] text-charcoal/50">
                2 of 5 goals complete
              </div>
            </div>
            <div className="absolute bottom-[12%] left-[42%] z-20 flex w-40 items-center gap-3 rounded-2xl bg-cream p-4 text-charcoal shadow-xl md:left-[46%]">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lime text-base">
                ◒
              </span>
              <div>
                <div className="text-[9px] text-charcoal/55">Transfer</div>
                <strong className="text-base">$9,564</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
