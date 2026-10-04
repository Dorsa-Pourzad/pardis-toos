"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { galleryCategories, galleryImages } from "@/lib/site-content";

type GalleryCategory = (typeof galleryCategories)[number];

export function GalleryGrid() {
  const [category, setCategory] = useState<GalleryCategory>("همه");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const visibleImages = galleryImages.filter((item) => category === "همه" || item.category === category);
  const selectedImage = selectedIndex === null ? null : visibleImages[selectedIndex];

  const move = (direction: number) => {
    setSelectedIndex((current) => current === null ? null : (current + direction + visibleImages.length) % visibleImages.length);
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((current) => current === null ? null : (current + 1) % visibleImages.length);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((current) => current === null ? null : (current - 1 + visibleImages.length) % visibleImages.length);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, visibleImages.length]);

  return (
    <section className="gallery-section section-space" id="gallery" data-nav-section="gallery" aria-labelledby="gallery-title">
      <div className="site-container">
        <div className="gallery-toolbar">
          <div>
            <p className="section-eyebrow">لحظه‌هایی از مجموعه</p>
            <h2 className="section-heading" id="gallery-title">پردیس توس از نزدیک</h2>
            <p className="section-copy gallery-intro">نگاهی به فضای مرکز، حیاط و لحظه‌هایی از دورهمی‌ها؛ با عکس‌های واقعی مجموعه و رعایت حریم خصوصی افراد.</p>
          </div>
          <div className="gallery-filters" role="group" aria-label="فیلتر تصاویر">
            {galleryCategories.map((item) => (
              <button
                key={item}
                type="button"
                className={`gallery-filter${category === item ? " is-active" : ""}`}
                aria-pressed={category === item}
                onClick={() => { setCategory(item); setSelectedIndex(null); }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid" data-count={visibleImages.length}>
          {visibleImages.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className={`gallery-tile gallery-tile--${item.layout}`}
              onClick={(event) => { openerRef.current = event.currentTarget; setSelectedIndex(index); }}
              aria-label={`نمایش تصویر بزرگ: ${item.caption}`}
            >
              <span className="gallery-tile-image">
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1280px) 60vw, 760px" loading="lazy" />
              </span>
              <span className="gallery-tile-caption">{item.caption}</span>
            </button>
          ))}
        </div>
        <p className="gallery-privacy-note">برای حفظ حریم خصوصی، چهره‌ها در تصاویر مربوط به سالمندان محو شده‌اند.</p>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => { if (!open) setSelectedIndex(null); }}>
        <DialogContent
          className="gallery-lightbox"
          showCloseButton={false}
          onOpenAutoFocus={(event) => { event.preventDefault(); closeRef.current?.focus(); }}
          onCloseAutoFocus={(event) => { event.preventDefault(); openerRef.current?.focus(); }}
        >
          <DialogTitle className="sr-only">{selectedImage?.caption ?? "تصویر پردیس توس"}</DialogTitle>
          <DialogDescription className="sr-only">برای دیدن تصویر بعدی یا قبلی از کلیدهای پیکان استفاده کنید. با Escape پنجره را ببندید.</DialogDescription>
          <div className="gallery-lightbox-top">
            <span>{selectedIndex !== null ? `${(selectedIndex + 1).toLocaleString("fa-IR")} / ${visibleImages.length.toLocaleString("fa-IR")}` : ""}</span>
            <DialogClose asChild>
              <button ref={closeRef} type="button" className="gallery-lightbox-control" aria-label="بستن تصویر بزرگ">
                <X aria-hidden="true" size={22} />
              </button>
            </DialogClose>
          </div>
          {selectedImage && (
            <div
              className="gallery-lightbox-image"
              onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.screenX ?? null; }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null) return;
                const delta = (event.changedTouches[0]?.screenX ?? touchStartX.current) - touchStartX.current;
                if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1);
                touchStartX.current = null;
              }}
            >
              <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="(max-width: 767px) 100vw, 90vw" />
            </div>
          )}
          <div className="gallery-lightbox-bottom">
            <span>{selectedImage?.caption}</span>
            <div className="gallery-lightbox-navigation">
              <button type="button" className="gallery-lightbox-control" onClick={() => move(-1)} aria-label="تصویر قبلی">
                <ArrowRight aria-hidden="true" size={22} />
              </button>
              <button type="button" className="gallery-lightbox-control" onClick={() => move(1)} aria-label="تصویر بعدی">
                <ArrowLeft aria-hidden="true" size={22} />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
