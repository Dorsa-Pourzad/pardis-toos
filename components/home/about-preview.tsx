import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="about-section section-space" id="about" aria-labelledby="about-title">
      <div className="site-container about-grid">
        <div className="about-media">
          <div className="about-image-frame">
            <Image
              src="/images/center-building.jpg"
              alt="ورودی مرکز پردیس توس در مشهد"
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 46vw, 520px"
              className="cover-image about-image"
            />
          </div>
          <p className="about-location">مشهد، راهنمایی ۱۴، پلاک ۲</p>
        </div>

        <div className="about-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            درباره پردیس توس
          </p>
          <h2 id="about-title">بیش از ۱۵ سال همراه سالمندان و خانواده‌ها</h2>
          <p className="section-copy">
            پردیس توس از سال ۱۳۸۹ در مشهد فعالیت می‌کند؛ مرکزی برای مراقبت
            حرفه‌ای سالمندان در محیطی امن و صمیمی، با همراهی پرسنلی باتجربه.
            این مجموعه دارای مجوز است و تحت نظارت اداره کل بهزیستی استان
            خراسان رضوی فعالیت می‌کند.
          </p>

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
