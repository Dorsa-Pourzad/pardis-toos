import { ArrowLeft, Phone } from "lucide-react";

import { HeroGallery } from "@/components/home/hero-gallery";
import { BotanicalDecoration } from "@/components/shared/botanical-decoration";

export function HeroSection() {
  return (
    <section className="hero-section" id="home" data-nav-section="home" aria-labelledby="hero-title">
      <div className="hero-botanical-decoration" aria-hidden="true">
        <BotanicalDecoration variant="main" className="hero-botanical-branch hero-botanical-branch-main" />
        <BotanicalDecoration variant="left" className="hero-botanical-branch hero-botanical-branch-left" />
      </div>

      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            مرکز توانبخشی و مراقبتی سالمندان پردیس توس در مشهد
          </p>
          <h1 id="hero-title">
            آرامش عزیزان شما،
            <span className="hero-highlight">اولویت ماست</span>
          </h1>
          <p className="hero-description">پردیس توس از سال ۱۳۸۹ در کنار شماست تا با خدمات تخصصی پزشکی، پرستاری و توانبخشی، مراقب آرامش و سلامت عزیزانتان باشد.</p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href="#consultation">
              <span>درخواست مشاوره و بازدید</span>
              <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.9} />
            </a>
            <a className="button button-secondary button-large" href="tel:09155031799">
              <Phone aria-hidden="true" size={18} strokeWidth={1.9} />
              <span>تماس با مرکز</span>
            </a>
          </div>
        </div>

        <div className="hero-media-column">
          <HeroGallery />
          <div className="hero-image-meta" aria-label="اطلاعات اعتمادساز">
            <span>
              <strong>+۱۵ سال</strong> تجربه مراقبت و همراهی
            </span>
            <span>تحت نظارت بهزیستی</span>
          </div>
        </div>
      </div>
    </section>
  );
}
