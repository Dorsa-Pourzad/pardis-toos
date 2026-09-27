import { trustItems } from "@/lib/site-content";

export function TrustBar() {
  return (
    <section className="trust-bar" aria-label="سابقه و اعتبار پردیس توس">
      <div className="site-container trust-bar-inner">
        {trustItems.map((item) => (
          <div
            className={`trust-item${"variant" in item && item.variant === "standard" ? " trust-item--standard" : ""}`}
            key={item.label}
          >
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
