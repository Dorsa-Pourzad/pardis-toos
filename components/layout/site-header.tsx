"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Menu, Phone, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems, siteContact } from "@/lib/site-content";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const updateHeight = () => {
      const height = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-offset", `${height + 16}px`);
      setHeaderHeight(height);
    };
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(header);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    // Vinext hydrates the sections after the browser's initial hash jump.
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      target?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!headerHeight) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    const marker = headerHeight + 80;
    const updateActive = () => {
      const current = sections.reduce((active, section) =>
        section.getBoundingClientRect().top <= marker
          ? section.dataset.navSection ?? active
          : active,
        "home",
      );
      setActiveSection(current);
    };
    const bottomMargin = Math.max(0, window.innerHeight - marker);
    const observer = new IntersectionObserver(updateActive, {
      rootMargin: `-${headerHeight}px 0px -${bottomMargin}px 0px`,
      threshold: 0,
    });
    sections.forEach((section) => observer.observe(section));
    const onHashChange = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target?.dataset.navSection) setActiveSection(target.dataset.navSection);
    };
    updateActive();
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [headerHeight]);

  return (
    <header ref={headerRef} className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="site-container header-inner">
        <Link className="brand-link" href="/#home" aria-label="پردیس توس، صفحه اصلی">
          <Image
            className="brand-logo"
            src="/images/pardis-toos-logo.png"
            alt="لوگوی مرکز جامع توانبخشی و مراقبتی سالمندان پردیس توس"
            width={92}
            height={92}
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label="ناوبری اصلی">
          {navigationItems.map((item) => (
            <a
              className={`nav-link${activeSection === item.href.slice(2) ? " is-active" : ""}`}
              href={item.href}
              aria-current={activeSection === item.href.slice(2) ? "location" : undefined}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={`tel:${siteContact.phone}`}>
            <Phone aria-hidden="true" size={17} strokeWidth={1.8} />
            <span>{siteContact.phoneDisplay}</span>
          </a>
          <Link className="button button-primary header-cta" href="/#consultation">
            <span>درخواست مشاوره و بازدید</span>
            <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.9} />
          </Link>
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
              {navigationItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    className={`mobile-nav-link${activeSection === item.href.slice(2) ? " is-active" : ""}`}
                    href={item.href}
                    aria-current={activeSection === item.href.slice(2) ? "location" : undefined}
                  >
                    <span>{item.label}</span>
                    <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.8} />
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mobile-sheet-footer">
              <a className="mobile-phone-link" href={`tel:${siteContact.phone}`}>
                <span className="mobile-phone-icon">
                  <Phone aria-hidden="true" size={18} strokeWidth={1.8} />
                </span>
                <span>
                  <small>تماس با مرکز</small>
                  <strong>{siteContact.phoneDisplay}</strong>
                </span>
              </a>
              <SheetClose asChild>
                <Link className="button button-primary mobile-cta" href="/#consultation">
                  <span>درخواست مشاوره و بازدید</span>
                  <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.9} />
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
