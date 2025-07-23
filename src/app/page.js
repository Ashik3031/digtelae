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

export default function Home() {
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
        <IphoneFeatureCards />
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
