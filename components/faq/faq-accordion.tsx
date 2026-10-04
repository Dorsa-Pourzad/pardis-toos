"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { siteContact } from "@/lib/site-content";

const questions = [
  {
    question: "پردیس توس کجاست؟",
    answer: <>مرکز پردیس توس در {siteContact.address} قرار دارد.</>,
  },
  {
    question: "پردیس توس از چه سالی فعالیت می‌کند؟",
    answer: <>این مرکز از سال ۱۳۸۹ در حوزه مراقبت و توانبخشی سالمندان در مشهد فعالیت دارد.</>,
  },
  {
    question: "چه خدماتی در مرکز ارائه می‌شود؟",
    answer: <>مراقبت روزمره و خدمات تخصصی پزشکی، پرستاری و توانبخشی از حوزه‌های فعالیت پردیس توس هستند. برای آگاهی از جزئیات هر خدمت، با مرکز تماس بگیرید.</>,
  },
  {
    question: "آیا مرکز دارای مجوز و نظارت است؟",
    answer: <>پردیس توس دارای مجوز و تحت نظارت اداره کل بهزیستی استان خراسان رضوی است.</>,
  },
  {
    question: "نشان استاندارد و درجه یک چه معنایی دارند؟",
    answer: <>پردیس توس نخستین مرکز سالمندان دارای نشان استاندارد در کشور است؛ این نشان بیانگر رعایت معیارهای تعریف‌شده برای کیفیت خدمات مرکز است. مجموعه همچنین در ارزیابی‌های سازمانی در رده مراکز درجه یک قرار گرفته است.</>,
  },
  {
    question: "شرایط پذیرش، مدارک و هزینه را از کجا بپرسم؟",
    answer: <>جزئیات شرایط پذیرش، مدارک و هزینه در اطلاعات فعلی سایت ثبت نشده‌اند. برای دریافت پاسخ دقیق و به‌روز با شماره <a href={`tel:${siteContact.phone}`}>{siteContact.phoneDisplay}</a> تماس بگیرید.</>,
  },
] as const;

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {questions.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div className="faq-item" key={item.question}>
            <h3 className="faq-question-heading">
              <button
                className="faq-question"
                id={`faq-question-${index}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                {isOpen
                  ? <Minus aria-hidden="true" size={19} strokeWidth={1.8} />
                  : <Plus aria-hidden="true" size={19} strokeWidth={1.8} />}
              </button>
            </h3>
            <div
              className={`faq-answer-shell${isOpen ? " is-open" : ""}`}
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              aria-hidden={!isOpen}
              inert={!isOpen}
            >
              <div className="faq-answer">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
