'use client'
import Image from "next/image";
import HeroSection from "../../components/Hero";
import WebsiteMarketingComponent from "../../components/AboutSection";
import WhatWeDoSection from "../../components/WhatWeDoSection";
import HugeNavbar from "../../components/NavbarComponent";
import IphoneFeatureCards from "../../components/WebsiteFeatureCard";
import OurClients from "../../components/OurClients";
import Footer from "../../components/Footer";
import Whatwedosplit from "../../components/whatwedosplit";
 // Add this if you plan to use the GSAP slider

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    (function () {
      if (
        !window.chatbase ||
        window.chatbase("getState") !== "initialized"
      ) {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") {
              return target.q;
            }
            return (...args) => target(prop, ...args);
          },
        });
      }
      const onLoad = function () {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "oF40GEveFaftoTXWniDRe";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };
      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();
  }, []);

  return (
    <>
      <HugeNavbar />

      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* What We Do Section */}
      <section id="whatwedo">
        {/* Replace below with GSAP slider if needed */}
        <Whatwedosplit />
        <WhatWeDoSection />
        {/* <PremiumCreativeSlider /> */}
      </section>

      {/* Work Section */}
      <section id="work">
        <WebsiteMarketingComponent />
        {/* <IphoneFeatureCards /> */}
      </section>

      {/* Careers / Our Clients */}
      <section id="careers">
        <OurClients />
      </section>

      {/* Footer */}
      <Footer />
      
    </>
  );
}
