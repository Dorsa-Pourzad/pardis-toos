import {
  ArrowLeft,
  Building2,
  CircleCheck,
  ClipboardCheck,
  Phone,
} from "lucide-react";

import { BotanicalDecoration } from "@/components/shared/botanical-decoration";
import { siteContact } from "@/lib/site-content";

const admissionStages = [
  {
    id: "one",
    number: "۱",
    title: "گفت‌وگوی اولیه",
    description: "شرایط سالمند و نیازهای خانواده را با ما در میان بگذارید.",
    icon: Phone,
    alignment: "right",
    tone: "mint",
  },
  {
    id: "two",
    number: "۲",
    title: "بررسی شرایط",
    description: "نیازهای مراقبتی و شرایط پذیرش بررسی می‌شود.",
    icon: ClipboardCheck,
    alignment: "left",
    tone: "cream",
  },
  {
    id: "three",
    number: "۳",
    title: "بازدید از مرکز",
    description: "از نزدیک با محیط، امکانات و شیوه مراقبت آشنا شوید.",
    icon: Building2,
    alignment: "right",
    tone: "mint",
  },
  {
    id: "four",
    number: "۴",
    title: "تکمیل پذیرش",
    description: "پس از هماهنگی نهایی، مراحل پذیرش انجام می‌شود.",
    icon: CircleCheck,
    alignment: "left",
    tone: "cream",
  },
] as const;

export function AdmissionSection() {
  return (
    <section
      className="admission-section section-space"
      id="admission"
      data-nav-section="admission"
      aria-labelledby="admission-title"
    >
      <BotanicalDecoration
        className="admission-botanical admission-botanical--top"
        variant="about"
      />
      <div className="site-container">
        <div className="admission-heading">
          <p className="section-eyebrow">مراحل پذیرش</p>
          <h2 className="section-heading" id="admission-title">
            از اولین گفت‌وگو تا پذیرش، همراه شما هستیم
          </h2>
          <p className="section-copy">
            پذیرش با یک گفت‌وگوی ساده شروع می‌شود. شرایط سالمند را بررسی می‌کنیم و قدم‌به‌قدم درباره ادامه مسیر راهنمایی‌تان می‌کنیم.
          </p>
        </div>

        <div className="admission-timeline" role="list" aria-label="مراحل پذیرش">
          <svg
            className="admission-timeline-path admission-timeline-path--desktop"
            viewBox="0 0 1000 160"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M18 80 C105 28 157 132 250 80 S395 28 500 80 S645 132 750 80 S895 28 982 80" />
            <circle className="admission-timeline-dot admission-timeline-dot--desktop" cx="18" cy="80" r="3.5" />
            <circle className="admission-timeline-dot admission-timeline-dot--desktop" cx="982" cy="80" r="3.5" />
          </svg>
          <svg
            className="admission-timeline-path admission-timeline-path--mobile"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M80 24 C68 38 66 83 50 125 C21 190 20 310 50 375 C80 440 80 560 50 625 C20 690 20 810 50 875 C66 917 68 962 80 976" />
            <circle className="admission-timeline-dot" cx="80" cy="24" r="3.5" />
            <circle className="admission-timeline-dot" cx="80" cy="976" r="3.5" />
          </svg>
          <BotanicalDecoration
            className="admission-timeline-leaf admission-timeline-leaf--one"
            variant="about"
          />
          <BotanicalDecoration
            className="admission-timeline-leaf admission-timeline-leaf--two"
            variant="about"
          />
          <BotanicalDecoration
            className="admission-timeline-leaf admission-timeline-leaf--three"
            variant="about"
          />

          {admissionStages.map((stage) => {
            const Icon = stage.icon;

            return (
              <article
                className={`admission-stage mobile-admission-step admission-stage--${stage.alignment}`}
                key={stage.id}
                role="listitem"
              >
                <span className="admission-stage-marker" aria-hidden="true">
                  {stage.number}
                </span>
                <div className={`admission-stage-card admission-stage-card--${stage.tone}`}>
                  <span className="admission-stage-icon" aria-hidden="true">
                    <Icon size={25} strokeWidth={1.8} />
                  </span>
                  <div className="admission-stage-content">
                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="admission-cta">
          <BotanicalDecoration
            className="admission-botanical admission-botanical--cta"
            variant="about"
          />
          <p className="admission-cta-copy">
            <span>برای شروع، کافی است</span>{" "}
            <span>با ما صحبت کنید.</span>
          </p>
          <div className="admission-cta-actions">
            <a className="button button-primary button-large" href="#consultation">
              درخواست مشاوره و بازدید
              <ArrowLeft aria-hidden="true" size={18} />
            </a>
            <a className="button button-secondary button-large" href={`tel:${siteContact.phone}`}>
              <Phone aria-hidden="true" size={18} />
              تماس با مرکز
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
