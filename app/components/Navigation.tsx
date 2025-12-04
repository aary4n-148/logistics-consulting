"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  onBookCall: () => void;
}

export default function Navigation({ onBookCall }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[#1A1A1A] bg-[#FAFAFA]/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between pt-1 md:h-20 md:pt-0">
          <a
            href="#"
            className="font-[family-name:var(--font-mono)] text-lg font-bold uppercase tracking-wider text-[#0A0A0A] md:text-xl"
            aria-label="MapxLogistics - Home"
          >
            MAP<span className="text-[#DC2626]">x</span>LOGISTICS
          </a>

          <div className="hidden items-center gap-8 md:flex" role="menubar">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-[#525252] transition-colors hover:text-[#0A0A0A]"
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onBookCall}
              className="h-10 cursor-pointer bg-[#0A0A0A] px-5 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1A1A1A]"
              aria-label="Book a strategy call"
            >
              Book Call
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center border border-[#1A1A1A] text-[#0A0A0A] md:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-[#1A1A1A] bg-[#FAFAFA] md:hidden"
            role="menu"
            aria-label="Mobile navigation"
          >
            <div className="py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block border-b border-[#E5E5E5] px-4 py-4 font-[family-name:var(--font-mono)] text-sm font-medium uppercase tracking-wider text-[#0A0A0A] transition-colors active:bg-[#0A0A0A] active:text-white sm:hover:bg-[#0A0A0A] sm:hover:text-white"
                  role="menuitem"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-4 pt-4 pb-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookCall();
                  }}
                  className="h-14 w-full cursor-pointer bg-[#0A0A0A] font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-white transition-colors active:bg-[#DC2626] sm:hover:bg-[#1A1A1A]"
                  aria-label="Book a strategy call"
                >
                  Book Strategy Call
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
