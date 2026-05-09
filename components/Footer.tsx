const footerLinks = [
  { label: "work", href: "#work" },
  { label: "studio", href: "#studio" },
  { label: "contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-canvas-alt py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand — Inter 900 wordmark */}
          <div>
            <p
              className="font-sans font-black text-red mb-3 leading-none"
              style={{ fontSize: "0.9rem", letterSpacing: "-0.02em" }}
            >
              JBAR
            </p>
            <p className="font-sans text-[0.8rem] text-muted leading-relaxed">
              Independent web studio.
              <br />
              Chicago, IL.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-paper/20 mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="nav-underline font-sans text-[0.82rem] text-muted hover:text-paper transition-colors duration-150"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-paper/20 mb-4">
              Get in touch
            </p>
            <a
              href="mailto:hello@jbar.studio"
              className="nav-underline font-sans text-[0.82rem] text-muted hover:text-red transition-colors duration-150"
            >
              hello@jbar.studio
            </a>
          </div>
        </div>

        {/* Pulse line + copyright */}
        <div className="pt-7 space-y-4">
          <div className="footer-pulse h-px w-full bg-paper" />
          <p className="font-mono text-[0.54rem] text-paper/18 tracking-[0.15em] uppercase">
            © 2026 JBAR Design Studio.&ensp;Built in Chicago.
          </p>
        </div>
      </div>
    </footer>
  );
}
