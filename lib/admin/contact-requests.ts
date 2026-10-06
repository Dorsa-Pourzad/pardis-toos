export const contactRequestStatuses = {
  new: { label: "جدید", className: "admin-status-badge--new" },
  in_progress: { label: "در حال پیگیری", className: "admin-status-badge--in-progress" },
  followed_up: { label: "پیگیری شده", className: "admin-status-badge--followed-up" },
} as const;

export type ContactRequestStatus = keyof typeof contactRequestStatuses;

export type ContactRequest = {
  id: string;
  name: string;
  phone: string;
  topic: string;
  details: string;
  createdAt: string;
  status: ContactRequestStatus;
};

export const requestStatusFilters: Array<{
  label: string;
  value: ContactRequestStatus | "all";
}> = [
  { label: "همه", value: "all" },
  { label: "جدید", value: "new" },
  { label: "در حال پیگیری", value: "in_progress" },
  { label: "پیگیری شده", value: "followed_up" },
];

// Integration point: replace the mock source with the verified backend query
// once the backend developer publishes the contact-request contract.
export const mockContactRequests: ContactRequest[] = [
  {
    id: "request-1",
    name: "سارا احمدی",
    phone: "09151234567",
    topic: "شرایط پذیرش",
    details: "سلام، می‌خواستم درباره شرایط پذیرش و هزینه‌های مرکز سؤال بپرسم.",
    createdAt: "2026-10-06T14:32:00+03:30",
    status: "new",
  },
  {
    id: "request-2",
    name: "علی رضایی",
    phone: "09122345678",
    topic: "هزینه‌ها",
    details: "لطفاً درباره هزینه خدمات و نحوه پرداخت راهنمایی بفرمایید.",
    createdAt: "2026-10-06T10:15:00+03:30",
    status: "in_progress",
  },
  {
    id: "request-3",
    name: "مریم حسینی",
    phone: "09361234567",
    topic: "خدمات و مراقبت",
    details: "برای آشنایی با خدمات مراقبتی مرکز درخواست تماس دارم.",
    createdAt: "2026-10-05T17:06:00+03:30",
    status: "new",
  },
  {
    id: "request-4",
    name: "حسین محمدی",
    phone: "09125556677",
    topic: "سایر",
    details: "می‌خواستم اطلاعات بیشتری درباره برنامه روزانه مرکز دریافت کنم.",
    createdAt: "2026-10-04T11:05:00+03:30",
    status: "followed_up",
  },
  {
    id: "request-5",
    name: "هدا کریمی",
    phone: "09351222334",
    topic: "خدمات و مراقبت",
    details: "برای بررسی خدمات مراقبتی و توانبخشی با من تماس بگیرید.",
    createdAt: "2026-10-03T16:40:00+03:30",
    status: "in_progress",
  },
];
