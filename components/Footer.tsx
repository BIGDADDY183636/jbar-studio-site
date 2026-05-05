const footerLinks = [
  { label: "work", href: "#work" },
  { label: "studio", href: "#studio" },
  { label: "contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-canvas-alt border-t border-paper/[0.06] py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p
              className="font-serif font-bold text-red tracking-[0.18em] text-[0.9rem] uppercase mb-3 leading-none"
              style={{ fontVariationSettings: '"opsz" 24, "WONK" 0' }}
            >
              JBAR<span style={{ letterSpacing: 0 }}>²</span>
            </p>
            <p className="font-sans text-[0.8rem] text-muted leading-relaxed">
              Independent web studio.
              <br />
              Chicago, IL.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-[0.58rem] font-bold tracking-[0.28em] uppercase text-paper/20 mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-sans text-[0.82rem] text-muted hover:text-paper transition-colors duration-150"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-[0.58rem] font-bold tracking-[0.28em] uppercase text-paper/20 mb-4">
              Get in touch
            </p>
            <a
              href="mailto:hello@jbar.studio"
              className="font-sans text-[0.82rem] text-muted hover:text-red transition-colors duration-150"
            >
              hello@jbar.studio
            </a>
          </div>
        </div>

        <div className="border-t border-paper/[0.05] pt-7">
          <p className="font-sans text-[0.57rem] text-paper/18 tracking-wide uppercase">
            © 2026 JBAR Design Studio.&ensp;Built in Chicago.
          </p>
        </div>
      </div>
    </footer>
  );
}
