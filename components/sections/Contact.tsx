"use client";

import { Button } from "@/components/Button";
import { useT } from "@/lib/i18n";
import { useState, type FormEvent, type InputHTMLAttributes } from "react";

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export function Contact() {
  const { t } = useT();
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");

    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Request failed");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));
      }
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-forest text-cream">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-12 lg:py-36">
        <div>
          <h2 className="editorial-display text-[clamp(2.3rem,5vw,4.4rem)]">
            {t.contact.headline}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/75">
            {t.contact.body}
          </p>
        </div>

        <div>
          {status === "done" ? (
            <div className="border border-lime/40 bg-forest-soft p-8">
              <p className="text-2xl tracking-[-0.03em]">{t.contact.thanks}</p>
              <p className="mt-3 max-w-sm text-cream/75">
                {t.contact.thanksBody}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8" noValidate>
              <Field label={t.contact.name} id="name" name="name" autoComplete="name" required />
              <Field
                label={t.contact.organization}
                id="organization"
                name="organization"
                autoComplete="organization"
                required
              />
              <Field label={t.contact.role} id="role" name="role" autoComplete="organization-title" />
              <Field
                label={t.contact.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />

              <fieldset>
                <legend className="text-sm tracking-[0.12em] text-cream/70 uppercase">
                  {t.contact.interest}
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.contact.interests.map((item) => (
                    <label key={item} className="cursor-pointer">
                      <input
                        type="radio"
                        name="interest"
                        value={item}
                        required
                        className="peer sr-only"
                      />
                      <span className="inline-block border border-cream/25 px-4 py-2 text-sm text-cream/80 transition-colors peer-checked:border-lime peer-checked:bg-lime peer-checked:text-charcoal peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="text-sm tracking-[0.12em] text-cream/70 uppercase">
                  {t.contact.message}
                </span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-y border-0 border-b border-cream/25 bg-transparent py-3 text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-lime"
                />
              </label>

              {status === "error" ? (
                <p className="text-sm text-lime" role="alert">
                  {t.contact.error}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="lime"
                disabled={status === "submitting"}
                className="min-h-12"
              >
                {status === "submitting" ? t.contact.sending : t.contact.submit}
              </Button>
            </form>
          )}

          <p className="mt-16 text-sm tracking-[0.16em] text-cream/50 uppercase">
            {t.contact.footer}
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  ...props
}: {
  label: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm tracking-[0.12em] text-cream/70 uppercase">
        {label}
      </span>
      <input
        id={id}
        {...props}
        className="mt-2 w-full border-0 border-b border-cream/25 bg-transparent py-3 text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-lime"
      />
    </label>
  );
}
