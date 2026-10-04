import Image from "next/image";
import { Activity, HeartHandshake, Stethoscope, UserRoundCheck } from "lucide-react";

import { BotanicalDecoration } from "@/components/shared/botanical-decoration";

const services = [
  {
    eyebrow: "مراقبت روزمره",
    title: "فضایی امن و آرام برای هر روز",
    description: "مراقبت روزمره در محیطی آرام و صمیمی، بخش اصلی همراهی پردیس توس با سالمندان است. توجه به آسایش و حفظ کیفیت زندگی، در کنار حضور پرسنل باتجربه، رویکرد مجموعه را شکل می‌دهد.",
    image: "/images/optimized/hero-seniors-garden.webp",
    alt: "سه سالمند در حیاط سبز پردیس توس با چهره‌های محوشده",
    icon: HeartHandshake,
  },
  {
    eyebrow: "خدمات پرستاری",
    title: "همراهی پرستاری در کنار سالمندان",
    description: "خدمات پرستاری از حوزه‌های تخصصی فعالیت پردیس توس است و در کنار مراقبت روزمره ارائه می‌شود. برای آگاهی از جزئیات خدمات متناسب با شرایط عزیزتان، با مرکز تماس بگیرید.",
    image: "/images/optimized/hero-autumn-courtyard.webp",
    alt: "حیاط پاییزی پردیس توس",
    icon: UserRoundCheck,
  },
  {
    eyebrow: "خدمات پزشکی",
    title: "توجه به نیازهای پزشکی سالمندان",
    description: "خدمات پزشکی نیز بخشی از خدمات تخصصی مجموعه است. اگر درباره نحوه ارائه این خدمات یا امکان پاسخ‌گویی به نیازهای مشخص سالمند پرسشی دارید، می‌توانید جزئیات را مستقیم از مرکز جویا شوید.",
    image: "/images/center-building.jpg",
    alt: "ورودی ساختمان مرکز پردیس توس در مشهد",
    icon: Stethoscope,
  },
  {
    eyebrow: "توانبخشی",
    title: "توجه به توانایی‌ها و کیفیت زندگی",
    description: "توانبخشی یکی دیگر از حوزه‌های فعالیت پردیس توس است. مجموعه تلاش می‌کند این خدمات را در کنار مراقبت و همراهی انسانی ارائه دهد. جزئیات خدمات قابل ارائه را می‌توانید در گفت‌وگو با مرکز بررسی کنید.",
    image: "/images/optimized/hero-community-gathering.webp",
    alt: "دورهمی در پردیس توس با چهره‌های محوشده",
    icon: Activity,
  },
] as const;

export function ServicesSection() {
  return (
    <section className="services-section section-space" id="services" data-nav-section="services" aria-labelledby="services-title">
      <div className="site-container services-heading">
        <p className="section-eyebrow">خدمات پردیس توس</p>
        <h2 className="section-heading" id="services-title">مراقبت، پرستاری، پزشکی و توانبخشی</h2>
        <p className="section-copy">پردیس توس در کنار مراقبت روزمره، خدمات تخصصی پزشکی، پرستاری و توانبخشی ارائه می‌کند. برای اطلاع از جزئیات هر خدمت و تناسب آن با شرایط سالمند، می‌توانید با مرکز گفت‌وگو کنید.</p>
      </div>
      <div className="site-container services-list">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div className={`service-row${index % 2 === 1 ? " service-row--reverse" : ""}`} key={service.title}>
              <div className="service-row-copy">
                <p className="section-eyebrow"><Icon aria-hidden="true" size={18} strokeWidth={1.7} />{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <figure className="service-row-figure">
                {index === 1 && <BotanicalDecoration className="service-botanical" />}
                <div className="service-row-image">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1280px) 45vw, 570px" />
                </div>
              </figure>
            </div>
          );
        })}
      </div>
    </section>
  );
}
