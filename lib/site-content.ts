export const navigationItems = [
  { label: "خانه", href: "#home" },
  { label: "درباره پردیس توس", href: "#about" },
  { label: "خدمات", href: "#services" },
  { label: "گالری", href: "#gallery" },
  { label: "شرایط پذیرش", href: "#admission" },
  { label: "سوالات متداول", href: "#faq" },
  { label: "تماس با ما", href: "#contact" },
] as const;

export const trustItems = [
  { value: "۱۳۸۹", label: "سال تأسیس" },
  { value: "+۱۵ سال", label: "سابقه فعالیت" },
  { value: "درجه یک", label: "براساس ارزشیابی سازمانی" },
  { value: "دارای استاندارد", label: "مرکز دارای نشان استاندارد" },
] as const;

export const reasonsToChoose = [
  {
    icon: "shield",
    title: "محیطی امن و آرام",
    description: "فضایی روشن و صمیمی برای مراقبت روزمره سالمندان.",
  },
  {
    icon: "heart",
    title: "پرسنل دلسوز و متخصص",
    description: "همراهی پرسنلی باتجربه با نگاه حرفه‌ای و انسانی.",
  },
  {
    icon: "calendar",
    title: "بیش از ۱۵ سال تجربه",
    description: "از سال ۱۳۸۹ در کنار سالمندان و خانواده‌هایشان هستیم.",
  },
  {
    icon: "location",
    title: "موقعیت مناسب در مشهد",
    description: "در محدوده راهنمایی، خیابان راهنمایی ۱۴، پلاک ۲.",
  },
  {
    icon: "badge",
    title: "مرکز درجه یک",
    description: "درجه یک براساس ارزشیابی سازمانی.",
  },
  {
    icon: "standard",
    title: "دارای نشان استاندارد",
    description: "مرکز دارای نشان استاندارد.",
  },
] as const;
