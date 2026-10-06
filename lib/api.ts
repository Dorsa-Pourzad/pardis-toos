import type {
  ContactRequest,
  ContactRequestStatus,
} from "@/lib/admin/contact-requests";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api/v1"
).replace(/\/$/, "");

type ApiEnvelope<T> = {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      perPage: number;
      total: number;
      pages: number;
    };
    summary?: RequestSummary;
  };
};

export type RequestSummary = {
  total: number;
  new: number;
  in_progress: number;
  followed_up: number;
};

export type AdminUser = {
  id: string;
  identity: string;
  displayName: string;
  isActive: boolean;
  createdAt: string | null;
};

export type PushNotificationConfig = {
  enabled: boolean;
  publicKey: string | null;
};

export type ContactRequestQuery = {
  q?: string;
  status?: ContactRequestStatus | "all";
  page?: number;
  perPage?: number;
};

export type ContactRequestList = {
  requests: ContactRequest[];
  summary: RequestSummary;
  total: number;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields?: Record<string, string>;

  constructor(
    status: number,
    code: string,
    message: string,
    fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

let csrfToken: string | null = null;

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<ApiEnvelope<T>> {
  const method = (init.method ?? "GET").toUpperCase();
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (csrfToken && method !== "GET" && method !== "HEAD") {
    headers.set("X-CSRF-Token", csrfToken);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
      credentials: "include",
    });
  } catch {
    throw new ApiError(0, "network_error", "ارتباط با سرور برقرار نشد.");
  }

  let payload: Partial<ApiEnvelope<T>> & {
    error?: { code?: string; message?: string; fields?: Record<string, string> };
  } = {};
  try {
    payload = await response.json();
  } catch {
    // Keep a useful API error even when the server returns an empty body.
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      payload.error?.code ?? "request_failed",
      payload.error?.message ?? "درخواست با خطا روبه‌رو شد.",
      payload.error?.fields,
    );
  }

  return payload as ApiEnvelope<T>;
}

export function getApiErrorMessage(error: unknown, fallback = "عملیات با خطا روبه‌رو شد.") {
  if (error instanceof ApiError && error.message) return error.message;
  return fallback;
}

export async function createContactRequest(input: {
  name: string;
  phone: string;
  topic: string;
  details: string;
}): Promise<ContactRequest> {
  const response = await apiRequest<ContactRequest>("/contact-requests", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return response.data;
}

export async function loginAdmin(input: {
  identity: string;
  password: string;
  remember: boolean;
}): Promise<AdminUser> {
  const response = await apiRequest<{ admin: AdminUser; csrfToken: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
  csrfToken = response.data.csrfToken;
  return response.data.admin;
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const response = await apiRequest<{ admin: AdminUser; csrfToken: string }>("/auth/me");
    csrfToken = response.data.csrfToken;
    return response.data.admin;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
}

export async function logoutAdmin(): Promise<void> {
  await apiRequest<{ loggedOut: boolean }>("/auth/logout", { method: "POST" });
  csrfToken = null;
}

export async function fetchContactRequests(query: ContactRequestQuery = {}): Promise<ContactRequestList> {
  const perPage = query.perPage ?? 100;
  const firstPage = query.page ?? 1;
  const fetchPage = async (page: number) => {
    const params = new URLSearchParams();
    if (query.q?.trim()) params.set("q", query.q.trim());
    if (query.status && query.status !== "all") params.set("status", query.status);
    params.set("page", String(page));
    params.set("per_page", String(perPage));
    return apiRequest<ContactRequest[]>(`/admin/contact-requests?${params.toString()}`);
  };

  const response = await fetchPage(firstPage);
  const pagination = response.meta?.pagination;
  const remainingPages = Math.max(0, (pagination?.pages ?? firstPage) - firstPage);
  const remainingResponses = await Promise.all(
    Array.from({ length: remainingPages }, (_, index) => fetchPage(firstPage + index + 1)),
  );
  const requests = [
    ...response.data,
    ...remainingResponses.flatMap((pageResponse) => pageResponse.data),
  ];
  const summary = response.meta?.summary ?? {
    total: pagination?.total ?? requests.length,
    new: 0,
    in_progress: 0,
    followed_up: 0,
  };
  return {
    requests,
    summary,
    total: pagination?.total ?? requests.length,
  };
}

export async function fetchContactRequest(id: string): Promise<ContactRequest> {
  const response = await apiRequest<ContactRequest>(`/admin/contact-requests/${encodeURIComponent(id)}`);
  return response.data;
}

export async function updateContactRequestStatus(
  id: string,
  status: ContactRequestStatus,
): Promise<ContactRequest> {
  const response = await apiRequest<ContactRequest>(`/admin/contact-requests/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return response.data;
}

export async function fetchPushNotificationConfig(): Promise<PushNotificationConfig> {
  const response = await apiRequest<PushNotificationConfig>("/admin/push/config");
  return response.data;
}

export async function registerPushSubscription(subscription: PushSubscription): Promise<void> {
  const serialized = subscription.toJSON();
  if (!serialized.endpoint || !serialized.keys?.p256dh || !serialized.keys.auth) {
    throw new ApiError(422, "invalid_push_subscription", "اطلاعات اعلان مرورگر کامل نیست.");
  }
  await apiRequest<{ subscribed: boolean }>("/admin/push/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      endpoint: serialized.endpoint,
      keys: {
        p256dh: serialized.keys.p256dh,
        auth: serialized.keys.auth,
      },
    }),
  });
}

export async function unregisterPushSubscription(endpoint: string): Promise<void> {
  await apiRequest<{ unsubscribed: boolean }>("/admin/push/subscriptions", {
    method: "DELETE",
    body: JSON.stringify({ endpoint }),
  });
}
