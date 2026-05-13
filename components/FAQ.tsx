"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "Do I own the website?",
    a: "Yes, fully. After launch, I hand off the full code via GitHub. Any developer can pick it up — you're never locked in.",
  },
  {
    q: "What if I need changes after launch?",
    a: "The first 30 days after launch are free for small edits. After that, optional Care Plan ($20/month) for ongoing small edits and priority support.",
  },
  {
    q: "Can I talk to a real client?",
    a: "Yes — DJE Advisors (dje.jbar.studio) is my first live client. The other examples on this site are concept builds I designed to demonstrate range. I'm still in the early-client window, so you'd be among my first handful — which is why the pricing is what it is.",
  },
  {
    q: "What if I want to leave or hire someone else?",
    a: "The code is yours. I'll transfer the GitHub repo and any domain-related access. No lock-in, no proprietary platforms.",
  },
  {
    q: "How fast can you start?",
    a: "Usually within a week. Project itself takes 7 days from kickoff. Currently booking — message me to lock in a slot.",
  },
  {
    q: "What if I'm not happy with the design?",
    a: "You get two rounds of revisions included. If after that we're not aligned, we can part ways and you keep what's been delivered.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-canvas border-t border-paper/[0.06] py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-center mb-10">
            <span className="text-paper/30">[ </span>
            <span className="text-muted">05 / FAQ</span>
            <span className="text-paper/30"> ]</span>
          </p>
        </Reveal>

        <Reveal delay={0.1} duration={900}>
          <h2
            className="font-sans font-black text-paper text-center mx-auto mb-14"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              letterSpacing: "-0.025em",
              maxWidth: "16ch",
            }}
          >
            Common questions.
          </h2>
        </Reveal>

        <div className="divide-y divide-paper/[0.07]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={0.1 + i * 0.04}>
                <div>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                  >
                    <span
                      className="font-sans font-bold text-paper/80 leading-snug group-hover:text-paper transition-colors duration-150"
                      style={{ fontSize: "clamp(0.88rem, 1.4vw, 1rem)" }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="flex-shrink-0 font-mono text-[0.85rem] text-paper/60 transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? "500px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 380ms cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <p className="font-sans text-[0.88rem] text-muted leading-relaxed pb-5 pr-8">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
