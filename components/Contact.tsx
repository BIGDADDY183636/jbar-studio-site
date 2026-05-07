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
        {/* Centered label */}
        <Reveal>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-center mb-12">
            <span className="text-red">[ </span>
            <span className="text-muted">05 / CONTACT</span>
            <span className="text-red"> ]</span>
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: headline + subhead + email */}
          <div>
            <Reveal delay={0.1} duration={900}>
              <h2
                className="font-sans font-black text-paper leading-tight mb-6"
                style={{
                  fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Let&apos;s start{" "}
                <span className="text-red">something.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="font-sans text-[0.9rem] text-muted leading-relaxed mb-10 max-w-sm">
                Tell me about your business — I&apos;ll be in touch within 24
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
                    className="font-sans font-black text-paper text-[1.8rem] leading-tight mb-3"
                    style={{ letterSpacing: "-0.025em" }}
                  >
                    Got it.
                  </h3>
                  <p className="font-sans text-[0.9rem] text-muted">
                    I&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-[0.58rem] tracking-[0.2em] uppercase text-paper/30 mb-2">
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
                    <label className="block font-mono text-[0.58rem] tracking-[0.2em] uppercase text-paper/30 mb-2">
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
                    <label className="block font-mono text-[0.58rem] tracking-[0.2em] uppercase text-paper/30 mb-2">
                      Tell me about your business
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
                    className="btn-glow w-full bg-red text-paper font-sans text-[0.75rem] font-bold tracking-[0.14em] uppercase py-4 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending…" : "Start a conversation →"}
                  </button>
                  <p className="font-sans text-[0.75rem] text-muted text-center">
                    Prefer email?{" "}
                    <a
                      href="mailto:hello@jbar.studio"
                      className="text-red hover:text-red-dark transition-colors"
                    >
                      hello@jbar.studio
                    </a>
                  </p>
                  {status === "error" && (
                    <p className="font-sans text-[0.78rem] text-red/80">
                      Something went wrong. Email me at{" "}
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
