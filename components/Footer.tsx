const footerLinks = [
  { label: "work", href: "#work" },
  { label: "studio", href: "#studio" },
  { label: "contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-paper/[0.05] py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Wordmark + location */}
          <div>
            <p
              className="font-serif font-semibold text-paper tracking-[0.18em] text-[0.9rem] uppercase mb-3"
              style={{ fontVariationSettings: '"opsz" 24, "WONK" 0' }}
            >
              JBAR
            </p>
            <p className="font-sans text-[0.8rem] text-paper/35 leading-relaxed">
              Independent web studio.
              <br />
              Chicago, IL.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-paper/25 mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-sans text-[0.82rem] text-paper/45 hover:text-paper transition-colors duration-150"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Email */}
          <div>
            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-paper/25 mb-4">
              Get in touch
            </p>
            <a
              href="mailto:hello@jbar.studio"
              className="font-sans text-[0.82rem] text-paper/45 hover:text-accent transition-colors duration-150"
            >
              hello@jbar.studio
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-paper/[0.06] pt-7">
          <p className="font-sans text-[0.58rem] text-paper/18 tracking-wide uppercase">
            © 2026 JBAR Design Studio.&ensp;Built in Chicago.
          </p>
        </div>
      </div>
    </footer>
  );
}
