import { ShieldCheck } from "lucide-react";

import { BotanicalDecoration } from "@/components/shared/botanical-decoration";

export function StandardSection() {
  return (
    <section className="standard-section section-space" id="standard" data-nav-section="services" aria-labelledby="standard-title">
      <BotanicalDecoration className="standard-botanical" />
      <div className="site-container standard-inner">
        <p className="section-eyebrow">سابقه و اعتبار</p>
        <h2 className="section-heading" id="standard-title">اولین مرکز سالمندان دارای نشان استاندارد در کشور</h2>
        <p className="section-copy">پردیس توس نخستین مرکز سالمندان در کشور است که نشان استاندارد را دریافت کرده است. دریافت این نشان، بیانگر رعایت مجموعه‌ای از الزامات و معیارهای تعریف‌شده برای کیفیت ارائه خدمات مرکز است.</p>
        <div className="standard-facts">
          <div>
            {/*<span className="standard-fact-mark" aria-hidden="true">۰۱</span>*/}
            <h3>درجه یک در ارزیابی سازمانی</h3>
            <p>پردیس توس بر اساس ارزیابی‌های سازمانی در رده مراکز درجه یک قرار گرفته است؛ جایگاهی مرتبط با کیفیت خدمات مراقبتی، تخصصی و عملکرد مجموعه.</p>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" size={25} strokeWidth={1.6} />
            <h3>دارای مجوز و تحت نظارت بهزیستی</h3>
            <p>پردیس توس دارای مجوز و تحت نظارت اداره کل بهزیستی استان خراسان رضوی است.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
