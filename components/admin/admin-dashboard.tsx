"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Bell,
  BellOff,
  BellRing,
  CalendarDays,
  Check,
  ClipboardList,
  Copy,
  Eye,
  Inbox,
  LoaderCircle,
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
  ApiError,
  type AdminUser,
  fetchContactRequests,
  fetchPushNotificationConfig,
  getApiErrorMessage,
  getCurrentAdmin,
  logoutAdmin,
  registerPushSubscription,
  unregisterPushSubscription,
  updateContactRequestStatus,
  type PushNotificationConfig,
  type RequestSummary,
} from "@/lib/api";
import {
  contactRequestStatuses,
  requestStatusFilters,
  type ContactRequest,
  type ContactRequestStatus,
} from "@/lib/admin/contact-requests";
import {
  getOrCreatePushSubscription,
  isPushNotificationSupported,
  removeLocalPushSubscription,
} from "@/lib/push-notifications";

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

type PushStatus = "checking" | "disabled" | "unsupported" | "default" | "subscribed" | "denied" | "error";

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
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [summary, setSummary] = useState<RequestSummary>({
    total: 0,
    new: 0,
    in_progress: 0,
    followed_up: 0,
  });
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContactRequestStatus | "all">("all");
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [copiedRequestId, setCopiedRequestId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);
  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [pushStatus, setPushStatus] = useState<PushStatus>("checking");
  const [pushConfig, setPushConfig] = useState<PushNotificationConfig | null>(null);
  const [pushError, setPushError] = useState<string | null>(null);
  const [isPushBusy, setIsPushBusy] = useState(false);

  useEffect(() => {
    if (!selectedRequest) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedRequest(null);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedRequest]);

  useEffect(() => {
    let active = true;
    async function checkAuthentication() {
      try {
        const admin = await getCurrentAdmin();
        if (!admin) {
          window.location.replace("/admin/login");
          return;
        }
        if (active) {
          setCurrentAdmin(admin);
          setIsAuthChecking(false);
        }
      } catch (error) {
        if (!active) return;
        setLoadError(getApiErrorMessage(error, "احراز هویت مدیر انجام نشد."));
        setIsAuthChecking(false);
        setIsLoading(false);
      }
    }
    void checkAuthentication();
    return () => {
      active = false;
    };
  }, []);

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const result = await fetchContactRequests({
        q: normalizeDigits(query),
        status: statusFilter,
        page: 1,
        perPage: 100,
      });
      setRequests(result.requests);
      setSummary(result.summary);
      setFilteredTotal(result.total);
      const requestedId = new URLSearchParams(window.location.search).get("request");
      const requestedRequest = requestedId
        ? result.requests.find((request) => request.id === requestedId)
        : null;
      if (requestedRequest) {
        setSelectedRequest(requestedRequest);
        window.history.replaceState({}, "", "/admin");
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        window.location.replace("/admin/login");
        return;
      }
      setLoadError(getApiErrorMessage(error, "دریافت درخواست‌ها با خطا روبه‌رو شد."));
    } finally {
      setIsLoading(false);
    }
  }, [query, statusFilter]);

  useEffect(() => {
    if (isAuthChecking || !currentAdmin) return;
    const timeout = window.setTimeout(() => void loadRequests(), query ? 250 : 0);
    return () => window.clearTimeout(timeout);
  }, [currentAdmin, isAuthChecking, loadRequests, query]);

  const syncPushSubscription = useCallback(async () => {
    setPushStatus("checking");
    setPushError(null);
    if (!isPushNotificationSupported()) {
      setPushStatus("unsupported");
      return;
    }

    try {
      const config = await fetchPushNotificationConfig();
      setPushConfig(config);
      if (!config.enabled || !config.publicKey) {
        setPushStatus("disabled");
        return;
      }
      if (Notification.permission === "denied") {
        setPushStatus("denied");
        return;
      }
      if (Notification.permission !== "granted") {
        setPushStatus("default");
        return;
      }

      const subscription = await getOrCreatePushSubscription(config.publicKey);
      if (!subscription) {
        setPushStatus("default");
        return;
      }
      await registerPushSubscription(subscription);
      setPushStatus("subscribed");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        window.location.replace("/admin/login");
        return;
      }
      setPushStatus("error");
      setPushError(getApiErrorMessage(error, "فعال‌سازی اعلان‌ها انجام نشد."));
    }
  }, []);

  useEffect(() => {
    if (isAuthChecking || !currentAdmin) return;
    const timeout = window.setTimeout(() => void syncPushSubscription(), 0);
    return () => window.clearTimeout(timeout);
  }, [currentAdmin, isAuthChecking, syncPushSubscription]);

  async function handleEnablePush() {
    if (!isPushNotificationSupported()) {
      setPushStatus("unsupported");
      return;
    }

    setIsPushBusy(true);
    setPushError(null);
    try {
      const config = pushConfig ?? await fetchPushNotificationConfig();
      setPushConfig(config);
      if (!config.enabled || !config.publicKey) {
        setPushStatus("disabled");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === "denied") {
        setPushStatus("denied");
        return;
      }
      if (permission !== "granted") {
        setPushStatus("default");
        return;
      }

      const subscription = await getOrCreatePushSubscription(config.publicKey);
      if (!subscription) throw new Error("Push subscription was not created.");
      await registerPushSubscription(subscription);
      setPushStatus("subscribed");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        window.location.replace("/admin/login");
        return;
      }
      setPushStatus("error");
      setPushError(getApiErrorMessage(error, "فعال‌سازی اعلان‌ها انجام نشد."));
    } finally {
      setIsPushBusy(false);
    }
  }

  async function handleRequestStatusChange(id: string, status: ContactRequestStatus) {
    const previous = requests.find((request) => request.id === id);
    if (!previous || previous.status === status) return;
    setStatusUpdateError(null);
    setUpdatingRequestId(id);
    try {
      const updated = await updateContactRequestStatus(id, status);
      setRequests((current) => current.map((request) => request.id === id ? updated : request));
      setSelectedRequest((current) => current?.id === id ? updated : current);
      setSummary((current) => ({
        ...current,
        [previous.status]: Math.max(0, current[previous.status] - 1),
        [status]: current[status] + 1,
      }));
      void loadRequests();
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        window.location.replace("/admin/login");
        return;
      }
      setStatusUpdateError(getApiErrorMessage(error, "ذخیره وضعیت انجام نشد."));
    } finally {
      setUpdatingRequestId(null);
    }
  }

  async function handleLogout() {
    try {
      try {
        if (isPushNotificationSupported()) {
          const endpoint = await removeLocalPushSubscription();
          if (endpoint) await unregisterPushSubscription(endpoint);
        }
      } catch {
        // Logging out must still complete if the browser push endpoint is unavailable.
      }
      await logoutAdmin();
    } finally {
      window.location.replace("/admin/login");
    }
  }

  async function copyPhone(request: ContactRequest) {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(request.phone);
    setCopiedRequestId(request.id);
    window.setTimeout(() => setCopiedRequestId(null), 1800);
  }

  if (isAuthChecking) {
    return (
      <div className="admin-app">
        <main className="admin-main" id="admin-main">
          <div className="admin-state-card" role="status">
            <span className="admin-state-icon"><Inbox aria-hidden="true" size={22} /></span>
            <h3>در حال بررسی دسترسی...</h3>
            <p>لطفاً چند لحظه صبر کنید.</p>
          </div>
        </main>
      </div>
    );
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
          <button className="admin-logout-button" type="button" onClick={() => void handleLogout()}>
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
              <strong>سلام، {currentAdmin?.displayName || "مدیر"}</strong>
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
            <div className="admin-heading-actions">
              <div className={`admin-notification-control admin-notification-control--${pushStatus}`} role="status">
                {pushStatus === "subscribed" ? (
                  <BellRing aria-hidden="true" size={16} />
                ) : pushStatus === "denied" || pushStatus === "unsupported" ? (
                  <BellOff aria-hidden="true" size={16} />
                ) : pushStatus === "checking" || isPushBusy ? (
                  <LoaderCircle className="admin-spin" aria-hidden="true" size={16} />
                ) : (
                  <Bell aria-hidden="true" size={16} />
                )}
                <span className="admin-notification-copy">
                  <strong>اعلان درخواست جدید</strong>
                  <small>
                    {pushStatus === "subscribed" && "فعال است"}
                    {pushStatus === "checking" && "در حال بررسی..."}
                    {pushStatus === "disabled" && "نیازمند تنظیم VAPID سرور"}
                    {pushStatus === "unsupported" && "در این مرورگر در دسترس نیست"}
                    {pushStatus === "denied" && "از تنظیمات مرورگر اجازه دهید"}
                    {pushStatus === "default" && "یک‌بار اجازه دهید تا اعلان‌ها فعال شوند"}
                    {pushStatus === "error" && (pushError || "خطا در فعال‌سازی")}
                  </small>
                </span>
                {(pushStatus === "default" || pushStatus === "error") && (
                  <button type="button" onClick={() => void handleEnablePush()} disabled={isPushBusy}>
                    {isPushBusy ? "در حال فعال‌سازی..." : pushStatus === "error" ? "تلاش دوباره" : "اجازه و فعال‌سازی"}
                  </button>
                )}
              </div>
              <span className="admin-data-note"><Inbox aria-hidden="true" size={16} /> داده زنده</span>
            </div>
          </section>

          <section className="admin-summary-grid" aria-label="خلاصه درخواست‌ها">
            <SummaryCard icon={<Inbox size={21} />} label="کل درخواست‌ها" value={summary.total} tone="teal" />
            <SummaryCard icon={<MessageSquareText size={21} />} label="جدید" value={summary.new} tone="green" />
            <SummaryCard icon={<CalendarDays size={21} />} label="در حال پیگیری" value={summary.in_progress} tone="yellow" />
          </section>

          <section className="admin-requests-panel" aria-labelledby="request-list-title">
            <div className="admin-panel-heading">
              <div>
                <h2 id="request-list-title">فهرست درخواست‌ها</h2>
                <p>{toPersianDigits(filteredTotal)} درخواست نمایش داده می‌شود</p>
              </div>
              <span className="admin-panel-count">{toPersianDigits(summary.total)} مورد</span>
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
                    {requests.map((request) => (
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
                {requests.map((request) => (
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

                  {requests.length === 0 && (
                    <div className="admin-state-card" role="status">
                      <span className="admin-state-icon"><Search aria-hidden="true" size={22} /></span>
                      <h3>{summary.total === 0 ? "هنوز درخواست تماسی ثبت نشده است." : "درخواستی با این مشخصات پیدا نشد."}</h3>
                      <p>{summary.total === 0 ? "پس از ثبت درخواست در سایت، موارد جدید در این بخش نمایش داده می‌شوند." : "عبارت جستجو یا فیلتر وضعیت را تغییر دهید."}</p>
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
                  disabled={updatingRequestId === selectedRequest.id}
                  onChange={(event) => void handleRequestStatusChange(selectedRequest.id, event.target.value as ContactRequestStatus)}
                >
                  {Object.entries(contactRequestStatuses).map(([value, metadata]) => (
                    <option key={value} value={value}>{metadata.label}</option>
                  ))}
                </select>
                <p>{updatingRequestId === selectedRequest.id ? "در حال ذخیره وضعیت..." : "تغییر وضعیت در پایگاه داده ذخیره می‌شود."}</p>
                {statusUpdateError && <p role="alert">{statusUpdateError}</p>}
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
