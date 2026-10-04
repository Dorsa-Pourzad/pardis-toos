import { Clock, MapPin, Phone } from "lucide-react";

import { BotanicalDecoration } from "@/components/shared/botanical-decoration";
import { ConsultationForm } from "@/components/landing/consultation-form";
import { siteContact } from "@/lib/site-content";

export function ContactSection() {
  return (
    <section className="contact-section section-space" id="contact" data-nav-section="contact" aria-labelledby="contact-title">
      <BotanicalDecoration className="contact-botanical contact-botanical--edge" variant="main" />
      <BotanicalDecoration className="contact-botanical contact-botanical--corner" variant="about" />
      <div className="site-container contact-layout">
        <div className="contact-intro">
          <p className="section-eyebrow">تماس و درخواست مشاوره</p>
          <h2 className="section-heading" id="contact-title"><span>سؤالی دارید؟</span>{" "}<span>با ما در تماس باشید.</span></h2>
          <p className="section-copy">
            برای دریافت راهنمایی درباره خدمات، شرایط مراقبت و پذیرش، می‌توانید فرم درخواست مشاوره را تکمیل کنید. کارشناسان ما در کوتاه‌ترین زمان با شما تماس خواهند گرفت.
          </p>

          <div className="contact-detail-list">
            <div className="contact-detail">
              <span className="contact-detail-icon"><Phone aria-hidden="true" size={21} strokeWidth={1.7} /></span>
              <div>
                <h3>شماره تماس</h3>
                <a className="contact-detail-prominent" href={`tel:${siteContact.phone}`} dir="ltr">{siteContact.phoneDisplay}</a>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-icon"><MapPin aria-hidden="true" size={21} strokeWidth={1.7} /></span>
              <div>
                <h3>نشانی مرکز</h3>
                <p className="contact-detail-prominent contact-address">{siteContact.address}</p>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-icon"><Clock aria-hidden="true" size={21} strokeWidth={1.7} /></span>
              <div>
                <h3>ساعات پاسخگویی</h3>
                <p className="contact-detail-prominent">پاسخگویی شبانه‌روزی</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-composition" id="consultation">
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
