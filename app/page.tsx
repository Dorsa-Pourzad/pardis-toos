import { AboutPreview } from "@/components/home/about-preview";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { WhyPardisToos } from "@/components/home/why-pardis-toos";
import { AdmissionSection } from "@/components/landing/admission-section";
import { ContactSection } from "@/components/landing/contact-section";
import { FAQSection } from "@/components/landing/faq-section";
import { ServicesSection } from "@/components/landing/services-section";
import { StandardSection } from "@/components/landing/standard-section";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <AboutPreview />
        <WhyPardisToos />
        <ServicesSection />
        <TrustBar />
        <StandardSection />
        <AdmissionSection />
        <GalleryGrid />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  );
}
