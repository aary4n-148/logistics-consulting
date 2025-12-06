"use client";

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] bg-[#FAFAFA] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a
            href="#"
            className="font-[family-name:var(--font-mono)] text-base font-bold uppercase tracking-wider text-[#0A0A0A]"
            aria-label="MapxLogistics - Return to top"
          >
            MAP<span className="text-[#DC2626]">x</span>LOGISTICS
          </a>
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-4 sm:gap-6">
              <li>
                <a
                  href="#services"
                  className="inline-block px-2 py-2 font-[family-name:var(--font-grotesk)] text-sm text-[#525252] transition-colors active:text-[#0A0A0A] sm:hover:text-[#0A0A0A]"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="inline-block px-2 py-2 font-[family-name:var(--font-grotesk)] text-sm text-[#525252] transition-colors active:text-[#0A0A0A] sm:hover:text-[#0A0A0A]"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="inline-block px-2 py-2 font-[family-name:var(--font-grotesk)] text-sm text-[#525252] transition-colors active:text-[#0A0A0A] sm:hover:text-[#0A0A0A]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <p className="font-[family-name:var(--font-grotesk)] text-sm text-[#525252]">
            © {new Date().getFullYear()} MAPxLOGISTICS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
