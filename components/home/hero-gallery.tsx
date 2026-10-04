import Image from "next/image";
import type { CSSProperties } from "react";

const heroImages = [
  {
    className: "hero-gallery-main",
    src: "/images/optimized/hero-seniors-garden.webp",
    alt: "سه سالمند نشسته زیر درخت در مرکز پردیس توس",
    desktopPosition: "center 50%",
    mobilePosition: "center 50%",
    sizes:
      "(max-width: 767px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 40px), 660px",
    priority: true,
  },
  {
    className: "hero-gallery-autumn",
    src: "/images/optimized/hero-autumn-courtyard.webp",
    alt: "حیاط پاییزی مرکز پردیس توس",
    desktopPosition: "center 48%",
    mobilePosition: "center 46%",
    sizes:
      "(max-width: 767px) calc((100vw - 48px) / 2), (max-width: 1000px) 48vw, 320px",
    priority: false,
  },
  {
    className: "hero-gallery-community",
    src: "/images/optimized/hero-community-gathering.webp",
    alt: "دورهمی سالمندان در مرکز پردیس توس",
    desktopPosition: "center 53%",
    mobilePosition: "center 52%",
    sizes:
      "(max-width: 767px) calc((100vw - 48px) / 2), (max-width: 1000px) 48vw, 320px",
    priority: false,
  },
] as const;

export function HeroGallery() {
  return (
    <div
      className="hero-gallery"
      role="group"
      aria-label="تصاویر مرکز پردیس توس"
    >
      {heroImages.map((image) => (
        <figure className={`hero-gallery-item ${image.className}`} key={image.src}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={image.priority}
            sizes={image.sizes}
            className="hero-gallery-image"
            style={
              {
                "--hero-object-position": image.desktopPosition,
                "--hero-mobile-object-position": image.mobilePosition,
              } as CSSProperties
            }
          />
        </figure>
      ))}
    </div>
  );
}
