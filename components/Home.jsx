import Image from "next/image";
import HeroSection from "../../components/Hero";
import TemplateMarquee from "../../components/tempelates";
import Restcontent from "../../components/restcontent";
import WebsiteMarketingComponent from "../../components/AboutSection";
import WhatWeDoSection from "../../components/WhatWeDoSection";
import HugeNavbar from "../../components/NavbarComponent";
import IphoneFeatureCards from "../../components/WebsiteFeatureCard";
import OurClients from "../../components/OurClients";
import Footer from "../../components/Footer";
import ClientWrapper from "../../components/ClientWrapper";
import Whatwedosplit from "../../components/whatwedosplit";

export default function hoome() {
  return (
    <>
      <HugeNavbar />
      <HeroSection />
      
      {/* What We Do */}
      <div id="whatwedo">
        <PremiumCreativeSlider />
      </div>

      {/* Work */}
      <div id="work">
        <IphoneFeatureCards />
      </div>

      {/* About */}
      <div id="about">
        <WebsiteMarketingComponent />
      </div>

      {/* Team */}
      <div id="team">
        <Whatwedosplit />
      </div>

      {/* Careers */}
      <div id="careers">
        <OurClients />
      </div>

      <Footer />
    </>
  );
}
