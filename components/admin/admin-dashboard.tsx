"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ClipboardList,
  Copy,
  Eye,
  Inbox,
  LogOut,
  Menu,
  MessageSquareText,
  MoreVertical,
  Phone,
  Search,
  UserRound,
  X,
} from "lucide-react";

import { AdminBrandLogo } from "@/components/admin/admin-brand";
import {
  contactRequestStatuses,
  mockContactRequests,
  requestStatusFilters,
  type ContactRequest,
  type ContactRequestStatus,
} from "@/lib/admin/contact-requests";

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Tehran",
});

const timeFormatter = new Intl.DateTimeFormat("fa-IR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Tehran",
});

function toPersianDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}

function normalizeDigits(value: string) {
  return value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const index = "۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩".indexOf(digit);
    return String(index > 9 ? index - 10 : index);
  });
}

function formatPhone(phone: string) {
  return toPersianDigits(phone.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3"));
}

function formatDateTime(createdAt: string) {
  const date = new Date(createdAt);
  return { date: dateFormatter.format(date), time: timeFormatter.format(date) };
}

function StatusBadge({ status }: { status: ContactRequestStatus }) {
  const metadata = contactRequestStatuses[status];
  return (
    <span className={`admin-status-badge ${metadata.className}`}>
      <span className="admin-status-dot" aria-hidden="true" />
      {metadata.label}
    </span>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: "teal" | "yellow" | "green";
}) {
  return (
    <article className="admin-summary-card">
      <span className={`admin-summary-icon admin-summary-icon--${tone}`} aria-hidden="true">
        {icon}
      </span>
      <div>
        <strong>{toPersianDigits(value)}</strong>
        <span>{label}</span>
      </div>
    </article>
  );
}

function RequestMeta({ request }: { request: ContactRequest }) {
  const { date, time } = formatDateTime(request.createdAt);
  return (
    <span className="admin-request-date">
      <span>{date}</span>
      <span>{time}</span>
    </span>
  );
}

export function AdminDashboard() {
  const [requests, setRequests] = useState<ContactRequest[]>(mockContactRequests);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContactRequestStatus | "all">("all");
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [copiedRequestId, setCopiedRequestId] = useState<string | null>(null);
  // Integration point: replace these static states with the request-query state.
  const isLoading = false;
  const loadError: string | null = null;

  useEffect(() => {
    if (!selectedRequest) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedRequest(null);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedRequest]);

  const visibleRequests = useMemo(() => {
    const normalizedQuery = normalizeDigits(query.trim()).toLocaleLowerCase();
    return requests.filter((request) => {
      const matchesStatus = statusFilter === "all" || request.status === statusFilter;
      const matchesQuery = !normalizedQuery
        || request.name.toLocaleLowerCase().includes(normalizedQuery)
        || request.phone.includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [query, requests, statusFilter]);

  const summary = useMemo(() => ({
    total: requests.length,
    newCount: requests.filter((request) => request.status === "new").length,
    inProgress: requests.filter((request) => request.status === "in_progress").length,
  }), [requests]);

  function updateRequestStatus(id: string, status: ContactRequestStatus) {
    setRequests((current) => current.map((request) => (
      request.id === id ? { ...request, status } : request
    )));
    setSelectedRequest((current) => current?.id === id ? { ...current, status } : current);
    // Integration point: persist the status through the backend mutation here.
  }

  async function copyPhone(request: ContactRequest) {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(request.phone);
    setCopiedRequestId(request.id);
    window.setTimeout(() => setCopiedRequestId(null), 1800);
  }

  return (
    <div className="admin-app">
      <button
        className={`admin-mobile-backdrop${isMobileNavOpen ? " is-visible" : ""}`}
        type="button"
        aria-label="بستن منوی پنل"
        onClick={() => setIsMobileNavOpen(false)}
      />

      <aside className={`admin-sidebar${isMobileNavOpen ? " is-open" : ""}`} aria-label="ناوبری پنل مدیریت">
        <div className="admin-sidebar-top">
          <a className="admin-sidebar-brand" href="/admin" aria-label="پنل مدیریت پردیس توس">
            <AdminBrandLogo className="admin-logo-crop--sidebar" />
            <span>
              <strong>پردیس توس</strong>
              <small>پنل مدیریت</small>
            </span>
          </a>
          <button
            className="admin-sidebar-close"
            type="button"
            aria-label="بستن منوی پنل"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <X aria-hidden="true" size={19} />
          </button>
        </div>

        <nav className="admin-sidebar-nav" aria-label="ناوبری داخلی">
          <a className="admin-sidebar-link is-active" href="/admin" aria-current="page" onClick={() => setIsMobileNavOpen(false)}>
            <ClipboardList aria-hidden="true" size={18} />
            <span>درخواست‌های تماس</span>
          </a>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-logout-button" type="button">
            <LogOut aria-hidden="true" size={18} />
            <span>خروج از حساب</span>
          </button>
        </div>
      </aside>

      <main className="admin-main" id="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-mobile-menu"
            type="button"
            aria-label="باز کردن منوی پنل"
            aria-expanded={isMobileNavOpen}
            onClick={() => setIsMobileNavOpen(true)}
          >
            <Menu aria-hidden="true" size={21} />
          </button>
          <div className="admin-identity">
            <span className="admin-identity-avatar" aria-hidden="true"><UserRound size={17} /></span>
            <span>
              <strong>سلام، مدیر</strong>
              <small>مدیر سیستم</small>
            </span>
            <MoreVertical className="admin-identity-more" aria-hidden="true" size={19} />
          </div>
        </header>

        <div className="admin-content">
          <section className="admin-page-heading" aria-labelledby="admin-page-title">
            <div>
              <p className="admin-eyebrow">مرکز پیگیری ارتباط با خانواده‌ها</p>
              <h1 id="admin-page-title">درخواست‌های تماس</h1>
              <p>مدیریت و پیگیری درخواست‌های ثبت‌شده از طریق سایت</p>
            </div>
            <span className="admin-data-note"><Inbox aria-hidden="true" size={16} /> داده نمایشی</span>
          </section>

          <section className="admin-summary-grid" aria-label="خلاصه درخواست‌ها">
            <SummaryCard icon={<Inbox size={21} />} label="کل درخواست‌ها" value={summary.total} tone="teal" />
            <SummaryCard icon={<MessageSquareText size={21} />} label="جدید" value={summary.newCount} tone="green" />
            <SummaryCard icon={<CalendarDays size={21} />} label="در حال پیگیری" value={summary.inProgress} tone="yellow" />
          </section>

          <section className="admin-requests-panel" aria-labelledby="request-list-title">
            <div className="admin-panel-heading">
              <div>
                <h2 id="request-list-title">فهرست درخواست‌ها</h2>
                <p>{toPersianDigits(visibleRequests.length)} درخواست نمایش داده می‌شود</p>
              </div>
              <span className="admin-panel-count">{toPersianDigits(requests.length)} مورد</span>
            </div>

            <div className="admin-toolbar">
              <label className="admin-search-field" htmlFor="admin-request-search">
                <Search aria-hidden="true" size={18} />
                <input
                  id="admin-request-search"
                  type="search"
                  value={query}
                  placeholder="جستجو بر اساس نام یا شماره تماس..."
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <div className="admin-filter-tabs" role="tablist" aria-label="فیلتر وضعیت درخواست">
                {requestStatusFilters.map((filter) => {
                  const isActive = statusFilter === filter.value;
                  return (
                    <button
                      className={`admin-filter-tab${isActive ? " is-active" : ""}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      key={filter.value}
                      onClick={() => setStatusFilter(filter.value)}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div aria-live="polite" aria-busy={isLoading}>
              {isLoading ? (
                <div className="admin-loading-state" role="status">
                  <span className="admin-loading-line" />
                  <span className="admin-loading-line" />
                  <span className="admin-loading-line" />
                  <p>در حال دریافت درخواست‌ها...</p>
                </div>
              ) : loadError ? (
                <div className="admin-state-card admin-state-card--error" role="alert">
                  <span className="admin-state-icon"><X aria-hidden="true" size={22} /></span>
                  <h3>دریافت درخواست‌ها با خطا روبه‌رو شد.</h3>
                  <p>{loadError}</p>
                </div>
              ) : (
                <>
                  <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th scope="col">نام متقاضی</th>
                      <th scope="col">شماره تماس</th>
                      <th scope="col">موضوع</th>
                      <th scope="col">تاریخ ثبت</th>
                      <th scope="col">وضعیت</th>
                      <th scope="col">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="admin-request-name">{request.name}</td>
                        <td dir="ltr" className="admin-request-phone">{formatPhone(request.phone)}</td>
                        <td>{request.topic}</td>
                        <td><RequestMeta request={request} /></td>
                        <td><StatusBadge status={request.status} /></td>
                        <td>
                          <button className="admin-view-button" type="button" onClick={() => setSelectedRequest(request)}>
                            <Eye aria-hidden="true" size={15} />
                            <span>مشاهده</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  </div>

                  <div className="admin-request-cards">
                {visibleRequests.map((request) => (
                  <article className="admin-request-card" key={request.id}>
                    <div className="admin-request-card-top">
                      <StatusBadge status={request.status} />
                      <button
                        className="admin-icon-button"
                        type="button"
                        aria-label={`مشاهده گزینه‌های ${request.name}`}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <MoreVertical aria-hidden="true" size={18} />
                      </button>
                    </div>
                    <h3>{request.name}</h3>
                    <p className="admin-request-card-topic">{request.topic}</p>
                    <div className="admin-request-card-meta">
                      <span dir="ltr"><Phone aria-hidden="true" size={15} />{formatPhone(request.phone)}</span>
                      <RequestMeta request={request} />
                    </div>
                    <button className="admin-card-view-button" type="button" onClick={() => setSelectedRequest(request)}>
                      <span>مشاهده درخواست</span>
                      <Eye aria-hidden="true" size={16} />
                    </button>
                  </article>
                ))}
                  </div>

                  {visibleRequests.length === 0 && (
                    <div className="admin-state-card" role="status">
                      <span className="admin-state-icon"><Search aria-hidden="true" size={22} /></span>
                      <h3>{requests.length === 0 ? "هنوز درخواست تماسی ثبت نشده است." : "درخواستی با این مشخصات پیدا نشد."}</h3>
                      <p>{requests.length === 0 ? "پس از ثبت درخواست در سایت، موارد جدید در این بخش نمایش داده می‌شوند." : "عبارت جستجو یا فیلتر وضعیت را تغییر دهید."}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      {selectedRequest && (
        <>
          <button className="admin-drawer-overlay" type="button" aria-label="بستن جزئیات درخواست" onClick={() => setSelectedRequest(null)} />
          <aside className="admin-details-drawer" role="dialog" aria-modal="true" aria-labelledby="request-details-title">
            <div className="admin-drawer-header">
              <div>
                <p className="admin-eyebrow">درخواست تماس</p>
                <h2 id="request-details-title">جزئیات درخواست</h2>
              </div>
              <button className="admin-drawer-close" type="button" aria-label="بستن جزئیات" onClick={() => setSelectedRequest(null)}>
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            <div className="admin-drawer-body">
              <div className="admin-drawer-meta">
                <StatusBadge status={selectedRequest.status} />
                <span>ثبت شده در {formatDateTime(selectedRequest.createdAt).date}</span>
              </div>

              <dl className="admin-details-list">
                <div>
                  <dt>نام متقاضی</dt>
                  <dd>{selectedRequest.name}</dd>
                </div>
                <div>
                  <dt>شماره تماس</dt>
                  <dd className="admin-details-phone" dir="ltr">
                    <a href={`tel:${selectedRequest.phone}`}>{formatPhone(selectedRequest.phone)}</a>
                    <button className="admin-copy-button" type="button" onClick={() => copyPhone(selectedRequest)}>
                      {copiedRequestId === selectedRequest.id ? <Check aria-hidden="true" size={14} /> : <Copy aria-hidden="true" size={14} />}
                      <span>{copiedRequestId === selectedRequest.id ? "کپی شد" : "کپی"}</span>
                    </button>
                  </dd>
                </div>
                <div>
                  <dt>موضوع درخواست</dt>
                  <dd>{selectedRequest.topic}</dd>
                </div>
                <div>
                  <dt>تاریخ و ساعت ثبت</dt>
                  <dd>{formatDateTime(selectedRequest.createdAt).date}، ساعت {formatDateTime(selectedRequest.createdAt).time}</dd>
                </div>
              </dl>

              <section className="admin-message-section" aria-labelledby="request-message-title">
                <h3 id="request-message-title">پیام</h3>
                <p>{selectedRequest.details || "پیامی برای این درخواست ثبت نشده است."}</p>
              </section>

              <div className="admin-status-control">
                <label htmlFor="request-status">وضعیت درخواست</label>
                <select
                  id="request-status"
                  value={selectedRequest.status}
                  onChange={(event) => updateRequestStatus(selectedRequest.id, event.target.value as ContactRequestStatus)}
                >
                  {Object.entries(contactRequestStatuses).map(([value, metadata]) => (
                    <option key={value} value={value}>{metadata.label}</option>
                  ))}
                </select>
                <p>این تغییر در نسخه فعلی فقط در وضعیت نمایشی پنل اعمال می‌شود.</p>
              </div>

              <a className="admin-call-button" href={`tel:${selectedRequest.phone}`}>
                <Phone aria-hidden="true" size={18} />
                <span>تماس با {formatPhone(selectedRequest.phone)}</span>
              </a>
            </div>

            <div className="admin-drawer-footer">
              <button className="admin-secondary-button" type="button" onClick={() => setSelectedRequest(null)}>بستن</button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
