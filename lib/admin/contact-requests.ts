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
  updatedAt: string | null;
  statusUpdatedAt: string | null;
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
