"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { cn } from "@/lib/utils";

type Props = {
  dict: Dictionary;
};

export function ContactForm({ dict }: Props) {
  const [type, setType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-sm border border-sage/30 bg-sage-soft/40 p-8">
        <h3 className="font-serif text-2xl text-ink">{dict.contact.successTitle}</h3>
        <p className="mt-3 text-graphite leading-relaxed">{dict.contact.successBody}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-graphite">
          01 — {dict.contact.step1}
        </p>
        <div className="mt-4 grid gap-3">
          {dict.contact.types.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setType(item.id)}
              className={cn(
                "rounded-sm border px-5 py-4 text-left text-sm transition",
                type === item.id
                  ? "border-ink bg-sage-soft/50 text-ink"
                  : "border-stone bg-white text-graphite hover:border-ink/30",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {type && (
        <form
          className="animate-fade-up space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-graphite">
            02 — {dict.contact.step2}
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label={dict.contact.fields.name} name="name" required />
            <Field label={dict.contact.fields.email} name="email" type="email" required />
            <Field label={dict.contact.fields.organization} name="organization" required />
            <Field label={dict.contact.fields.role} name="role" />
            <Field label={dict.contact.fields.region} name="region" />
            <div>
              <label className="mb-2 block text-sm text-graphite" htmlFor="timeline">
                {dict.contact.fields.timeline}
              </label>
              <select
                id="timeline"
                name="timeline"
                className="w-full rounded-sm border border-stone bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink focus:ring-2 focus:ring-copper/40"
                defaultValue=""
              >
                <option value="" disabled>
                  —
                </option>
                {dict.contact.timelineOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-graphite" htmlFor="message">
              {dict.contact.fields.message}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-sm border border-stone bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink focus:ring-2 focus:ring-copper/40"
            />
          </div>

          <input type="hidden" name="type" value={type} />

          <button
            type="submit"
            className="rounded-sm bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-ink/90"
          >
            {dict.contact.fields.submit}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-graphite" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-stone bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink focus:ring-2 focus:ring-copper/40"
      />
    </div>
  );
}
