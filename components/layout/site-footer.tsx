import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";

import { navigationItems, siteContact } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-main">
        <div className="footer-brand">
          <Link className="footer-logo-link" href="/#home" aria-label="پردیس توس، صفحه اصلی">
            <Image src="/images/pardis-toos-logo.png" alt="لوگوی پردیس توس" width={110} height={110} />
          </Link>
          <p>مرکز جامع توانبخشی و مراقبتی سالمندان پردیس توس؛ همراه سالمندان و خانواده‌ها در مشهد از سال ۱۳۸۹.</p>
        </div>
        <nav className="footer-nav" aria-label="پیوندهای پایین صفحه">
          <h2>دسترسی سریع</h2>
          <div>
            {navigationItems.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </div>
        </nav>
        <div className="footer-contact">
          <h2>ارتباط با ما</h2>
          <p>{siteContact.address}</p>
          <a className="footer-phone" href={`tel:${siteContact.phone}`}><Phone aria-hidden="true" size={17} />{siteContact.phoneDisplay}</a>
          <Link className="text-link" href="/#consultation">درخواست مشاوره و بازدید <ArrowLeft aria-hidden="true" size={17} /></Link>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>تمام حقوق این وب‌سایت متعلق به پردیس توس است.</span>
        <span>با احترام به سالمندان و خانواده‌ها</span>
      </div>
    </footer>
  );
}
