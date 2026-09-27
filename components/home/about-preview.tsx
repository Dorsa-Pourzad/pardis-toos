import Image from "next/image";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="about-section section-space" id="about" aria-labelledby="about-title">
      <div className="site-container about-grid">
        <div className="about-media">
          <div className="about-image-frame">
            <Image
              src="/images/aboutImage.jpg"
              alt="حیاط و فضای سبز مرکز پردیس توس در مشهد"
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 46vw, 520px"
              className="cover-image about-image photo-treatment"
            />
          </div>
          <p className="about-location">مشهد، راهنمایی ۱۴، پلاک ۲</p>
        </div>

        <div className="about-copy">
          <p className="eyebrow">
            درباره پردیس توس
          </p>
          <h2 id="about-title">بیش از ۱۵ سال همراه سالمندان و خانواده‌ها</h2>
          <p className="section-copy">
            مرکز جامع توانبخشی و مراقبتی سالمندان پردیس توس از سال ۱۳۸۹ در
            مشهد فعالیت می‌کند. این مجموعه با بهره‌گیری از پرسنل باتجربه و
            ارائه خدمات تخصصی پزشکی، پرستاری و توانبخشی، تلاش می‌کند محیطی
            امن، آرام و صمیمی برای سالمندان فراهم کند.
          </p>

          <div className="about-trust" aria-label="مجوز و نظارت مرکز">
            <ShieldCheck aria-hidden="true" size={20} strokeWidth={1.75} />
            <span>دارای مجوز و تحت نظارت اداره کل بهزیستی استان خراسان رضوی</span>
          </div>

          <div className="about-meta" aria-label="اطلاعات مجموعه">
            <span>صاحب امتیاز</span>
            <strong>اسعدزاده</strong>
          </div>

          <a className="text-link" href="#about">
            <span>بیشتر درباره ما</span>
            <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </section>
  );
}
