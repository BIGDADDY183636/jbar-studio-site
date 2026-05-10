"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvyollb";

const STYLE_PILLS = [
  "Clean & modern",
  "Classic & timeless",
  "Bold & loud",
  "Minimal & quiet",
  "Magazine-style",
  "Playful & friendly",
  "Industrial & raw",
  "Warm & inviting",
  "Not sure yet",
];
const BUSINESS_TYPES = [
  "Café / Restaurant",
  "Retail Shop",
  "Auto & Repair",
  "Hair & Salon",
  "Fitness & Gym",
  "Bookstore",
  "Professional Services",
  "Other",
];
const BUDGETS = [
  "$400 — Standard package",
  "Let's discuss",
];
const TIMELINES = ["ASAP", "2–4 weeks", "1–2 months", "No rush / flexible"];

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full bg-canvas border border-paper/[0.1] rounded-sm px-4 py-3 font-sans text-[0.88rem] text-paper placeholder-paper/20 focus:outline-none focus:border-paper/50 transition-colors duration-200";
const labelCls =
  "block font-mono text-[0.58rem] tracking-[0.2em] uppercase text-paper/30 mb-2";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [hasAssets, setHasAssets] = useState(false);

  function toggleStyle(pill: string) {
    setSelectedStyles((prev) =>
      prev.includes(pill) ? prev.filter((p) => p !== pill) : [...prev, pill]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const formData = new FormData(e.currentTarget);
      selectedStyles.forEach((s) => formData.append("style_preference", s));
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) {
        (e.target as HTMLFormElement).reset();
        setSelectedStyles([]);
        setHasAssets(false);
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-canvas border-t border-paper/[0.1] py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-center mb-12">
            <span className="text-paper/30">[ </span>
            <span className="text-muted">06 / CONTACT</span>
            <span className="text-paper/30"> ]</span>
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
                <span className="text-paper">something.</span>
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
                className="font-sans text-[0.85rem] font-medium text-paper/60 hover:text-paper transition-colors tracking-wide"
              >
                hello@jbar.studio
              </a>
            </Reveal>
          </div>

          {/* Right: form */}
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
                    <label className={labelCls}>Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className={inputCls}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelCls}>Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@yourbusiness.com"
                      className={inputCls}
                    />
                  </div>

                  {/* Business name */}
                  <div>
                    <label className={labelCls}>Business name</label>
                    <input
                      type="text"
                      name="business_name"
                      required
                      placeholder="Your business name"
                      className={inputCls}
                    />
                  </div>

                  {/* Business type */}
                  <div>
                    <label className={labelCls}>Type of business</label>
                    <select
                      name="business_type"
                      required
                      defaultValue=""
                      className={inputCls + " appearance-none cursor-pointer"}
                    >
                      <option value="" disabled>
                        Select one...
                      </option>
                      {BUSINESS_TYPES.map((t) => (
                        <option
                          key={t}
                          value={t}
                          style={{ background: "#0a0908", color: "#f4f1ea" }}
                        >
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Style preferences */}
                  <div>
                    <label className={labelCls}>
                      Style preferences{" "}
                      <span className="text-paper/20 normal-case tracking-normal">
                        (pick any)
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {STYLE_PILLS.map((pill) => {
                        const selected = selectedStyles.includes(pill);
                        return (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => toggleStyle(pill)}
                            className="font-mono text-[0.55rem] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full border transition-all duration-150"
                            style={{
                              borderColor: selected
                                ? "rgba(244,241,234,0.7)"
                                : "rgba(244,241,234,0.15)",
                              color: selected
                                ? "rgba(244,241,234,0.95)"
                                : "rgba(244,241,234,0.45)",
                              background: selected
                                ? "rgba(244,241,234,0.08)"
                                : "transparent",
                            }}
                          >
                            {pill}
                          </button>
                        );
                      })}
                    </div>
                    {selectedStyles.map((s) => (
                      <input
                        key={s}
                        type="hidden"
                        name="style_preference"
                        value={s}
                      />
                    ))}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className={labelCls}>Budget range</label>
                    <select
                      name="budget"
                      required
                      defaultValue=""
                      className={inputCls + " appearance-none cursor-pointer"}
                    >
                      <option value="" disabled>
                        Select one...
                      </option>
                      {BUDGETS.map((b) => (
                        <option
                          key={b}
                          value={b}
                          style={{ background: "#0a0908", color: "#f4f1ea" }}
                        >
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className={labelCls}>Timeline</label>
                    <select
                      name="timeline"
                      required
                      defaultValue=""
                      className={inputCls + " appearance-none cursor-pointer"}
                    >
                      <option value="" disabled>
                        Select one...
                      </option>
                      {TIMELINES.map((t) => (
                        <option
                          key={t}
                          value={t}
                          style={{ background: "#0a0908", color: "#f4f1ea" }}
                        >
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Logo/brand assets checkbox */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="has_brand_assets"
                        checked={hasAssets}
                        onChange={(e) => setHasAssets(e.target.checked)}
                        className="mt-0.5 flex-shrink-0 accent-paper"
                        value="yes"
                      />
                      <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-paper/40 leading-relaxed group-hover:text-paper/60 transition-colors">
                        I have a logo or brand images to share
                      </span>
                    </label>
                    {hasAssets && (
                      <p className="mt-2 ml-6 font-sans text-[0.75rem] text-muted leading-relaxed">
                        Great — I&apos;ll send a file-share link after we
                        connect.
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelCls}>
                      Tell me about your business
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="What you do, who you're trying to reach, what you have now..."
                      className={inputCls + " resize-none"}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-glow w-full bg-paper text-canvas font-sans text-[0.75rem] font-bold tracking-[0.14em] uppercase py-4 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending"
                      ? "Sending…"
                      : "Start a conversation →"}
                  </button>

                  <p className="font-sans text-[0.75rem] text-muted text-center">
                    Prefer email?{" "}
                    <a
                      href="mailto:hello@jbar.studio"
                      className="text-paper/60 hover:text-paper transition-colors"
                    >
                      hello@jbar.studio
                    </a>
                  </p>

                  {status === "error" && (
                    <p className="font-sans text-[0.78rem] text-muted">
                      Something went wrong. Email me at{" "}
                      <a
                        href="mailto:hello@jbar.studio"
                        className="underline"
                      >
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
