"use client";

import { useState } from "react";

// TODO: Replace YOUR_FORM_ID with your actual Formspree form ID.
// Create a free form at https://formspree.io — you'll get a URL like:
// https://formspree.io/f/xyzabcde
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-ink py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: headline + email */}
          <div>
            <p className="font-sans text-[0.65rem] font-semibold tracking-[0.28em] uppercase text-accent mb-7">
              Contact
            </p>
            <h2
              className="font-serif font-bold text-paper leading-tight mb-6"
              style={{
                fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                fontVariationSettings: '"opsz" 96, "WONK" 0',
                letterSpacing: "-0.02em",
              }}
            >
              Let&apos;s start something.
            </h2>
            <p className="font-sans text-[0.92rem] text-paper/45 leading-relaxed mb-10 max-w-sm">
              Tell us about your business — we&apos;ll be in touch within 24
              hours.
            </p>
            <a
              href="mailto:hello@jbar.studio"
              className="font-sans text-[0.85rem] font-medium text-accent hover:text-accent-light transition-colors tracking-wide"
            >
              hello@jbar.studio
            </a>
          </div>

          {/* Right: form */}
          <div>
            {status === "sent" ? (
              <div className="py-10">
                <h3
                  className="font-serif font-bold text-paper text-[1.8rem] leading-tight mb-3"
                  style={{ fontVariationSettings: '"opsz" 36, "WONK" 0' }}
                >
                  Got it.
                </h3>
                <p className="font-sans text-[0.9rem] text-paper/50">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block font-sans text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-paper/30 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent border border-paper/12 rounded-sm px-4 py-3 font-sans text-[0.88rem] text-paper placeholder-paper/20 focus:outline-none focus:border-accent transition-colors duration-200"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block font-sans text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-paper/30 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@yourbusiness.com"
                    className="w-full bg-transparent border border-paper/12 rounded-sm px-4 py-3 font-sans text-[0.88rem] text-paper placeholder-paper/20 focus:outline-none focus:border-accent transition-colors duration-200"
                  />
                </div>
                {/* Message */}
                <div>
                  <label className="block font-sans text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-paper/30 mb-2">
                    Tell us about your business
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="What you do, who you're trying to reach, what you have now..."
                    className="w-full bg-transparent border border-paper/12 rounded-sm px-4 py-3 font-sans text-[0.88rem] text-paper placeholder-paper/20 focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                  />
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-accent text-paper font-sans text-[0.75rem] font-semibold tracking-[0.14em] uppercase py-4 rounded-sm hover:bg-accent-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending…" : "Start a conversation →"}
                </button>
                {status === "error" && (
                  <p className="font-sans text-[0.78rem] text-red-400">
                    Something went wrong. Email us directly at{" "}
                    <a href="mailto:hello@jbar.studio" className="underline">
                      hello@jbar.studio
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
