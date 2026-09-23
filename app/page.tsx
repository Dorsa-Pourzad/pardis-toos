import { AboutPreview } from "@/components/home/about-preview";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { WhyPardisToos } from "@/components/home/why-pardis-toos";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustBar />
        <AboutPreview />
        <WhyPardisToos />
      </main>
    </>
  );
}
