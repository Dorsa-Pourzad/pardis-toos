"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  LockKeyhole,
  MessageSquareText,
  Phone,
  UserRound,
} from "lucide-react";

import { createContactRequest } from "@/lib/api";
import { consultationTopics, siteContact } from "@/lib/site-content";

type ConsultationValues = {
  name: string;
  phone: string;
  topic: string;
  details: string;
};

type FieldName = keyof ConsultationValues;
type FieldErrors = Partial<Record<FieldName, string>>;
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const initialValues: ConsultationValues = {
  name: "",
  phone: "",
  topic: "",
  details: "",
};

function normalizePhone(value: string) {
  return value
    .replace(/[۰-۹٠-٩]/g, (digit) => {
      const code = digit.charCodeAt(0);
      const asciiCode = code >= 0x06f0 && code <= 0x06f9
        ? code - 0x06f0 + 0x30
        : code - 0x0660 + 0x30;
      return String.fromCharCode(asciiCode);
    })
    .replace(/[\s()-]/g, "");
}

function validate(values: ConsultationValues): FieldErrors {
  const errors: FieldErrors = {};
  const normalizedPhone = normalizePhone(values.phone);

  if (!values.name.trim()) {
    errors.name = "لطفاً نام و نام خانوادگی را وارد کنید.";
  }

  if (!/^(?:\+98|0098|0)?9\d{9}$/.test(normalizedPhone)) {
    errors.phone = "لطفاً یک شماره تماس معتبر وارد کنید.";
  }

  if (!values.topic) {
    errors.topic = "لطفاً موضوع مشاوره را انتخاب کنید.";
  }

  return errors;
}

type ConsultationRequest = Omit<ConsultationValues, "phone"> & { phone: string };

async function submitConsultationRequest(
  request: ConsultationRequest,
): Promise<{ status: "success" } | { status: "unavailable" }> {
  try {
    await createContactRequest(request);
    return { status: "success" };
  } catch {
    return { status: "unavailable" };
  }
}

export function ConsultationForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  const errors = validate(values);
  const getVisibleError = (field: FieldName) =>
    submitAttempted || touched[field] ? errors[field] : undefined;

  function updateField(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  }

  function touchField(field: FieldName) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);
    setStatus("idle");

    const currentErrors = validate(values);
    const firstInvalid = (["name", "phone", "topic"] as const).find(
      (field) => currentErrors[field],
    );

    if (firstInvalid) {
      document.getElementById(`consultation-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    const result = await submitConsultationRequest({
      ...values,
      name: values.name.trim(),
      phone: normalizePhone(values.phone),
      details: values.details.trim(),
    });

    if (result.status === "success") {
      setStatus("success");
      return;
    }

    setStatus("error");
  }

  function resetForm() {
    setValues(initialValues);
    setTouched({});
    setSubmitAttempted(false);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="consultation-form-card consultation-success" role="status" aria-live="polite">
        <span className="consultation-success-icon"><Check aria-hidden="true" size={28} /></span>
        <h3 id="consultation-title">درخواست شما ثبت شد</h3>
        <p>برای پیگیری درخواست مشاوره با شما تماس خواهیم گرفت.</p>
        <button className="consultation-reset" type="button" onClick={resetForm}>ثبت درخواست دیگر</button>
      </div>
    );
  }

  const nameError = getVisibleError("name");
  const phoneError = getVisibleError("phone");
  const topicError = getVisibleError("topic");

  return (
    <div className="consultation-form-card">
      <header className="consultation-form-header">
        <h3 id="consultation-title">درخواست مشاوره</h3>
        <p>شماره تماستان را بگذارید تا کارشناسان ما برای پاسخ به سؤالات شما و راهنمایی درباره شرایط مراقبت و پذیرش، با شما تماس بگیرند.</p>
      </header>

      <form className="consultation-form" onSubmit={handleSubmit} noValidate aria-labelledby="consultation-title">
        <div className="consultation-field">
          <label htmlFor="consultation-name">نام و نام خانوادگی <span aria-hidden="true">*</span></label>
          <div className={`consultation-field-control${nameError ? " has-error" : ""}`}>
            <UserRound aria-hidden="true" size={19} />
            <input
              id="consultation-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="مثلاً: سارا احمدی"
              value={values.name}
              required
              aria-required="true"
              aria-invalid={Boolean(nameError)}
              aria-describedby={nameError ? "consultation-name-error" : undefined}
              onChange={(event) => updateField("name", event.target.value)}
              onBlur={() => touchField("name")}
            />
          </div>
          {nameError && <p className="consultation-field-error" id="consultation-name-error">{nameError}</p>}
        </div>

        <div className="consultation-field">
          <label htmlFor="consultation-phone">شماره تماس <span aria-hidden="true">*</span></label>
          <div className={`consultation-field-control${phoneError ? " has-error" : ""}`}>
            <Phone aria-hidden="true" size={19} />
            <input
              id="consultation-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="rtl"
              maxLength={20}
              placeholder="مثلاً: ۰۹۱۲ ۱۲۳ ۴۵۶۷"
              value={values.phone}
              required
              aria-required="true"
              aria-invalid={Boolean(phoneError)}
              aria-describedby={phoneError ? "consultation-phone-error" : undefined}
              onChange={(event) => updateField("phone", event.target.value)}
              onBlur={() => touchField("phone")}
            />
          </div>
          {phoneError && <p className="consultation-field-error" id="consultation-phone-error">{phoneError}</p>}
        </div>

        <div className="consultation-field">
          <label htmlFor="consultation-topic">موضوع مشاوره <span aria-hidden="true">*</span></label>
          <div className={`consultation-field-control${topicError ? " has-error" : ""}`}>
            <MessageSquareText aria-hidden="true" size={19} />
            <select
              id="consultation-topic"
              name="topic"
              value={values.topic}
              required
              aria-required="true"
              aria-invalid={Boolean(topicError)}
              aria-describedby={topicError ? "consultation-topic-error" : undefined}
              onChange={(event) => updateField("topic", event.target.value)}
              onBlur={() => touchField("topic")}
            >
              <option value="" disabled>لطفاً انتخاب کنید</option>
              {consultationTopics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
            </select>
            <ChevronDown className="consultation-select-arrow" aria-hidden="true" size={17} />
          </div>
          {topicError && <p className="consultation-field-error" id="consultation-topic-error">{topicError}</p>}
        </div>

        <div className="consultation-field">
          <label htmlFor="consultation-details">توضیحات (اختیاری)</label>
          <div className="consultation-field-control consultation-field-control--textarea">
            <MessageSquareText aria-hidden="true" size={19} />
            <textarea
              id="consultation-details"
              name="details"
              rows={3}
              maxLength={600}
              placeholder="اگر نکته‌ای هست که بهتر است قبل از تماس بدانیم..."
              value={values.details}
              onChange={(event) => updateField("details", event.target.value)}
            />
          </div>
        </div>

        <button className="button button-primary consultation-submit" type="submit" disabled={status === "submitting"}>
          <span>{status === "submitting" ? "در حال بررسی..." : "ثبت درخواست مشاوره"}</span>
          <ArrowLeft aria-hidden="true" size={19} />
        </button>

        <p className="consultation-privacy"><LockKeyhole aria-hidden="true" size={15} />اطلاعات شما فقط برای پیگیری درخواست مشاوره استفاده می‌شود.</p>

        {status === "error" && (
          <p className="consultation-submit-error" role="alert" aria-live="assertive">
            در حال حاضر امکان ثبت آنلاین درخواست فراهم نیست. لطفاً برای دریافت مشاوره با <a href={`tel:${siteContact.phone}`}>{siteContact.phoneDisplay}</a> تماس بگیرید.
          </p>
        )}
      </form>
    </div>
  );
}
