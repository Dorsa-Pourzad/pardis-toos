import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { BotanicalDecoration } from "@/components/shared/botanical-decoration";
import { siteContact } from "@/lib/site-content";

export function AboutPreview() {
  return (
    <section className="about-section section-space" id="about" data-nav-section="about" aria-labelledby="about-title">
      <div className="site-container about-grid">
        <div className="about-media">
          <BotanicalDecoration className="about-botanical" />
          <div className="about-image-frame">
            <Image
              src="/images/aboutImage.jpg"
              alt="حیاط و فضای سبز مرکز پردیس توس در مشهد"
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 900px) calc(100vw - 48px), (max-width: 1280px) 49vw, 610px"
              className="cover-image about-image photo-treatment"
            />
          </div>
          <p className="about-location">{siteContact.address}</p>
        </div>

        <div className="about-copy">
          <h2 className="section-heading" id="about-title">درباره پردیس توس</h2>
          <p className="about-subtitle">بیش از ۱۵ سال تجربه در مراقبت و توانبخشی سالمندان</p>
          <p className="section-copy">پردیس توس از سال ۱۳۸۹ با هدف فراهم‌کردن محیطی امن و آرام برای مراقبت و توانبخشی سالمندان فعالیت می‌کند. این مرکز با مجوز و تحت نظارت اداره کل بهزیستی استان خراسان رضوی، طی سال‌های فعالیت خود در ارزیابی‌های سازمانی موفق به کسب درجه یک شده و به‌عنوان نخستین مرکز سالمندان کشور، نشان استاندارد دریافت کرده است.</p>

          <div className="about-trust" aria-label="اطلاعات مجوز و صاحب امتیاز">
            <ShieldCheck aria-hidden="true" size={20} strokeWidth={1.75} />
            <span>دارای مجوز و تحت نظارت اداره کل بهزیستی استان خراسان رضوی · صاحب امتیاز: اسعدزاده</span>
          </div>
        </div>
      </div>
    </section>
  );
}
