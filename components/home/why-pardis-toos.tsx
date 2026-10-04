import { reasonsToChoose } from "@/lib/site-content";
import { HeartHandshake, MapPin, Medal, ShieldCheck, Sprout, UsersRound } from "lucide-react";

const reasonIcons = [Sprout, HeartHandshake, UsersRound, MapPin, ShieldCheck, Medal];

const reasonNumber = new Intl.NumberFormat("fa-IR", {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

export function WhyPardisToos() {
  return (
    <section className="why-section section-space" id="why-us" data-nav-section="about" aria-labelledby="why-title">
      <div className="site-container">
        <div className="why-heading">
          <h2 className="section-heading" id="why-title">
            چرا خانواده‌ها پردیس توس را انتخاب می‌کنند؟
          </h2>
          <p className="section-copy why-intro">
            برای ما مراقبت فقط رسیدگی به نیازهای روزمره نیست؛ آرامش، احترام و توجه به شرایط هر سالمند بخشی از مراقبت در پردیس توس است.
          </p>
        </div>

        <ol className="reasons-list">
          {reasonsToChoose.map((reason, index) => {
            const Icon = reasonIcons[index];
            return (
              <li className="reason-item" key={reason.title}>
                <span className="reason-number" aria-hidden="true">{reasonNumber.format(index + 1)}</span>
                <Icon className="reason-icon" aria-hidden="true" size={18} strokeWidth={1.7} />
                <div className="reason-copy">
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
