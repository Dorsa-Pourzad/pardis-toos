import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
  preload: true,
});

export const metadata: Metadata = {
  title: "خانه سالمندان پردیس توس مشهد | مرکز مراقبتی و توانبخشی سالمندان",
  description:
    "مرکز توانبخشی و مراقبتی سالمندان پردیس توس در مشهد؛ همراه سالمندان و خانواده‌ها از سال ۱۳۸۹.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.variable}>{children}</body>
    </html>
  );
}
