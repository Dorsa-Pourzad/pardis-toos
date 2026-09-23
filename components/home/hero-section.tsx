import Image from "next/image";
import { ArrowLeft, Phone, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            مرکز توانبخشی و مراقبتی سالمندان در مشهد
          </p>
          <h1 id="hero-title">
            آرامش عزیزان شما،
            <span className="hero-highlight">اطمینان خاطر شما</span>
          </h1>
          <p className="hero-description">
            مرکز توانبخشی و مراقبتی سالمندان پردیس توس، از سال ۱۳۸۹ با ارائه
            خدمات تخصصی پزشکی، پرستاری و توانبخشی، همراه سالمندان و
            خانواده‌هایشان در مشهد است.
          </p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href="#consultation">
              <span>درخواست مشاوره</span>
              <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.9} />
            </a>
            <a className="button button-secondary button-large" href="tel:09155031799">
              <Phone aria-hidden="true" size={18} strokeWidth={1.9} />
              <span>تماس با مرکز</span>
            </a>
          </div>
          <p className="availability-note">
            <span className="availability-dot" aria-hidden="true" />
            پاسخگویی شبانه‌روزی
          </p>
        </div>

        <div className="hero-media-column">
          <div className="hero-media-accent" aria-hidden="true" />
          <div className="hero-media">
            <Image
              src="/images/center-building.jpg"
              alt="نمای بیرونی مرکز پردیس توس در مشهد"
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1280px) 52vw, 620px"
              className="cover-image hero-image"
            />
            <div className="hero-caption">
              <span>پردیس توس</span>
              <small>مرکز جامع توانبخشی و مراقبتی سالمندان</small>
            </div>
          </div>
          <div className="hero-trust-notes" aria-label="اطلاعات اعتمادساز">
            <div className="hero-trust-note">
              <strong>+۱۵ سال</strong>
              <span>تجربه مراقبت و همراهی</span>
            </div>
            <div className="hero-trust-note">
              <ShieldCheck aria-hidden="true" size={18} strokeWidth={1.8} />
              <span>تحت نظارت بهزیستی</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
