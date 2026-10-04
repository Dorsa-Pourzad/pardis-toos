import { FAQAccordion } from "@/components/faq/faq-accordion";

export function FAQSection() {
  return (
    <section className="faq-section section-space" id="faq" data-nav-section="faq" aria-labelledby="faq-section-title">
      <div className="site-container faq-grid">
        <div>
          <p className="section-eyebrow">سوالات متداول</p>
          <h2 className="section-heading" id="faq-section-title">پاسخ به پرسش‌های شما</h2>
          <p className="section-copy">اطلاعاتی که اکنون درباره پردیس توس در دسترس است را اینجا مرور کنید. برای جزئیات اختصاصی، گفت‌وگوی مستقیم با مرکز بهترین راه است.</p>
        </div>
        <FAQAccordion />
      </div>
    </section>
  );
}
