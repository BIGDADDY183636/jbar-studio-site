"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

// Formspree endpoint — do not change
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvyollb";

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
    <section id="contact" className="bg-canvas border-t border-red/20 py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <Reveal>
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.38em] uppercase text-red mb-12">
            05&ensp;/&ensp;CONTACT
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: headline + subhead + email */}
          <div>
            <Reveal delay={0.1} duration={900}>
              <h2
                className="font-serif font-bold text-paper leading-tight mb-6"
                style={{
                  fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                  letterSpacing: "-0.025em",
                  fontVariationSettings: '"opsz" 96, "WONK" 0',
                }}
              >
                Let&apos;s start{" "}
                <span className="text-red">something.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="font-sans text-[0.9rem] text-muted leading-relaxed mb-10 max-w-sm">
                Tell us about your business — we&apos;ll be in touch within 24
                hours.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <a
                href="mailto:hello@jbar.studio"
                className="font-sans text-[0.85rem] font-medium text-red hover:text-red-dark transition-colors tracking-wide"
              >
                hello@jbar.studio
              </a>
            </Reveal>
          </div>

          {/* Right: form — Formspree logic unchanged */}
          <Reveal delay={0.14} duration={800}>
            <div>
              {status === "sent" ? (
                <div className="py-10">
                  <h3
                    className="font-serif font-bold text-paper text-[1.8rem] leading-tight mb-3"
                    style={{ fontVariationSettings: '"opsz" 36, "WONK" 0' }}
                  >
                    Got it.
                  </h3>
                  <p className="font-sans text-[0.9rem] text-muted">
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
                      className="w-full bg-transparent border border-paper/[0.1] rounded-sm px-4 py-3 font-sans text-[0.88rem] text-paper placeholder-paper/20 focus:outline-none focus:border-red transition-colors duration-200"
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
                      className="w-full bg-transparent border border-paper/[0.1] rounded-sm px-4 py-3 font-sans text-[0.88rem] text-paper placeholder-paper/20 focus:outline-none focus:border-red transition-colors duration-200"
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
                      className="w-full bg-transparent border border-paper/[0.1] rounded-sm px-4 py-3 font-sans text-[0.88rem] text-paper placeholder-paper/20 focus:outline-none focus:border-red transition-colors duration-200 resize-none"
                    />
                  </div>
                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-red text-paper font-sans text-[0.75rem] font-bold tracking-[0.14em] uppercase py-4 rounded-sm hover:bg-red-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending…" : "Start a conversation →"}
                  </button>
                  {status === "error" && (
                    <p className="font-sans text-[0.78rem] text-red/80">
                      Something went wrong. Email us at{" "}
                      <a href="mailto:hello@jbar.studio" className="underline">
                        hello@jbar.studio
                      </a>
                      .
                    </p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
