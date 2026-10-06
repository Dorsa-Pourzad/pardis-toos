"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";

import { AdminBrandLogo } from "@/components/admin/admin-brand";

export function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Integration point: submit credentials to the backend auth flow here.
    // This UI intentionally does not invent authentication or redirect behavior.
    setIsUnavailable(true);
  }

  return (
    <div className="admin-auth-card">
      <section className="admin-auth-brand" aria-label="هویت پردیس توس">
        <div className="admin-auth-brand-image" aria-hidden="true">
          <Image
            src="/images/center-building.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 740px) 0px, 42vw"
          />
        </div>
        <div className="admin-auth-brand-content">
          <AdminBrandLogo className="admin-logo-crop--brand" priority />
          <p className="admin-auth-brand-name">پردیس توس</p>
          <p className="admin-auth-brand-description">
            مرکز توانبخشی و مراقبتی
            <br />
            سالمندان در مشهد
          </p>
        </div>
        <p className="admin-auth-brand-footer">همراه سالمندان، در مسیر زندگی بهتر.</p>
      </section>

      <section className="admin-auth-form-panel" aria-labelledby="admin-login-title">
        <div className="admin-auth-form-inner">
          <div className="admin-auth-form-lockup">
            <AdminBrandLogo className="admin-logo-crop--form" />
            <span>پنل مدیریت</span>
          </div>
          <p className="admin-eyebrow">ورود امن مدیران</p>
          <h1 className="admin-auth-title" id="admin-login-title">ورود به پنل مدیریت</h1>
          <p className="admin-auth-description">
            برای مدیریت درخواست‌های تماس وارد حساب خود شوید.
          </p>

          <form className="admin-auth-form" onSubmit={handleSubmit}>
            <div className="admin-form-field">
              <label htmlFor="admin-identity">ایمیل یا نام کاربری</label>
              <div className="admin-input-wrap">
                <UserRound aria-hidden="true" size={18} />
                <input
                  id="admin-identity"
                  name="identity"
                  type="text"
                  autoComplete="username"
                  placeholder="example@pardis-toos.ir"
                  required
                  onChange={() => setIsUnavailable(false)}
                />
              </div>
            </div>

            <div className="admin-form-field">
              <label htmlFor="admin-password">رمز عبور</label>
              <div className="admin-input-wrap">
                <LockKeyhole aria-hidden="true" size={18} />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="رمز عبور خود را وارد کنید"
                  required
                  onChange={() => setIsUnavailable(false)}
                />
                <button
                  className="admin-password-toggle"
                  type="button"
                  aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
                </button>
              </div>
            </div>

            <div className="admin-auth-options">
              <label className="admin-checkbox-label" htmlFor="admin-remember">
                <input id="admin-remember" name="remember" type="checkbox" />
                <span>مرا به خاطر بسپار</span>
              </label>
              <span className="admin-auth-hint">دسترسی داخلی</span>
            </div>

            <button className="admin-primary-button admin-auth-submit" type="submit">
              <span>ورود به پنل</span>
              <ArrowLeft aria-hidden="true" size={18} />
            </button>

            {isUnavailable && (
              <p className="admin-integration-message" role="status" aria-live="polite">
                سرویس احراز هویت هنوز به این رابط متصل نشده است.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
