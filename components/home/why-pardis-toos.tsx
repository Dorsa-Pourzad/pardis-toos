import {
  BadgeCheck,
  CalendarDays,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";

import { reasonsToChoose } from "@/lib/site-content";

const featureIcons = {
  shield: ShieldCheck,
  heart: HeartHandshake,
  calendar: CalendarDays,
  location: MapPin,
  badge: BadgeCheck,
  standard: Star,
} as const;

export function WhyPardisToos() {
  return (
    <section className="why-section section-space" aria-labelledby="why-title">
      <div className="site-container">
        <div className="why-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              انتخابی با خیال آسوده
            </p>
            <h2 id="why-title">چرا خانواده‌ها پردیس توس را انتخاب می‌کنند؟</h2>
          </div>
          <p className="section-copy why-intro">
            در پردیس توس، مراقبت حرفه‌ای با احترام، آرامش و توجه انسانی همراه
            است.
          </p>
        </div>

        <div className="reasons-grid">
          {reasonsToChoose.map((reason) => {
            const Icon = featureIcons[reason.icon];

            return (
              <article className="reason-item" key={reason.title}>
                <span className="reason-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.65} />
                </span>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
