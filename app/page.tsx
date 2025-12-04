"use client";

import { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import SocialProof from "./components/SocialProof";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CalendlyModal from "./components/CalendlyModal";

export default function Home() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const openCalendly = () => setIsCalendlyOpen(true);
  const closeCalendly = () => setIsCalendlyOpen(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#0A0A0A] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Navigation onBookCall={openCalendly} />
      <main id="main-content" role="main">
        <Hero onBookCall={openCalendly} />
        <Services onBookCall={openCalendly} />
        <SocialProof />
        <Contact onBookCall={openCalendly} />
      </main>
      <Footer />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={closeCalendly} />
    </>
  );
}
