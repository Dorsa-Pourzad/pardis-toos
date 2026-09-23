"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, Menu, Phone, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems } from "@/lib/site-content";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="site-container header-inner">
        <a className="brand-link" href="#home" aria-label="پردیس توس، صفحه اصلی">
          <Image
            className="brand-logo"
            src="/images/pardis-toos-logo.png"
            alt="لوگوی مرکز جامع توانبخشی و مراقبتی سالمندان پردیس توس"
            width={92}
            height={92}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="ناوبری اصلی">
          {navigationItems.map((item, index) => (
            <a
              className={`nav-link${index === 0 ? " is-active" : ""}`}
              href={item.href}
              aria-current={index === 0 ? "page" : undefined}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href="tel:09155031799">
            <Phone aria-hidden="true" size={17} strokeWidth={1.8} />
            <span>۰۹۱۵۵۰۳۱۷۹۹</span>
          </a>
          <a className="button button-primary header-cta" href="#consultation">
            <span>درخواست مشاوره</span>
            <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.9} />
          </a>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button className="mobile-menu-trigger" type="button" aria-label="باز کردن منو">
              <Menu aria-hidden="true" size={24} strokeWidth={1.8} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="mobile-sheet" showCloseButton={false}>
            <SheetHeader className="mobile-sheet-header">
              <SheetTitle className="mobile-sheet-title">منوی پردیس توس</SheetTitle>
              <SheetClose asChild>
                <button className="mobile-close" type="button" aria-label="بستن منو">
                  <X aria-hidden="true" size={22} strokeWidth={1.8} />
                </button>
              </SheetClose>
            </SheetHeader>
            <nav className="mobile-nav" aria-label="ناوبری موبایل">
              {navigationItems.map((item, index) => (
                <SheetClose asChild key={item.href}>
                  <a
                    className={`mobile-nav-link${index === 0 ? " is-active" : ""}`}
                    href={item.href}
                    aria-current={index === 0 ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.8} />
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="mobile-sheet-footer">
              <a className="mobile-phone-link" href="tel:09155031799">
                <span className="mobile-phone-icon">
                  <Phone aria-hidden="true" size={18} strokeWidth={1.8} />
                </span>
                <span>
                  <small>تماس با مرکز</small>
                  <strong>۰۹۱۵۵۰۳۱۷۹۹</strong>
                </span>
              </a>
              <SheetClose asChild>
                <a className="button button-primary mobile-cta" href="#consultation">
                  <span>درخواست مشاوره</span>
                  <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.9} />
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
