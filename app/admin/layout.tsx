import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل مدیریت | پردیس توس",
  description: "پنل داخلی مدیریت درخواست‌های تماس پردیس توس.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
