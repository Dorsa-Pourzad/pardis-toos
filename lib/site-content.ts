export const navigationItems = [
  { label: "خانه", href: "/#home" },
  { label: "درباره پردیس توس", href: "/#about" },
  { label: "خدمات", href: "/#services" },
  { label: "گالری", href: "/#gallery" },
  { label: "شرایط پذیرش", href: "/#admission" },
  { label: "سوالات متداول", href: "/#faq" },
  { label: "تماس با ما", href: "/#contact" },
] as const;

export const siteContact = {
  phone: "09155031799",
  phoneDisplay: "۰۹۱۵۵۰۳۱۷۹۹",
  address: "مشهد، راهنمایی ۱۴، پلاک ۲",
} as const;

export const consultationTopics = ["شرایط پذیرش", "خدمات و مراقبت", "هزینه‌ها", "سایر"] as const;

export const galleryImages = [
  {
    src: "/images/optimized/hero-seniors-garden.webp",
    alt: "سه سالمند در فضای سبز حیاط پردیس توس؛ چهره‌ها محو شده‌اند",
    caption: "حیاط و فضای سبز پردیس توس",
    category: "فضای باز",
    layout: "wide",
  },
  {
    src: "/images/optimized/hero-community-gathering.webp",
    alt: "دورهمی در حیاط پردیس توس با چهره‌های محوشده",
    caption: "دورهمی در پردیس توس",
    category: "دورهمی‌ها",
    layout: "medium",
  },
  {
    src: "/images/optimized/hero-autumn-courtyard.webp",
    alt: "حیاط پاییزی و درختان مرکز پردیس توس",
    caption: "حیاط پردیس توس در پاییز",
    category: "فضای باز",
    layout: "medium",
  },
  {
    src: "/images/center-building.jpg",
    alt: "ورودی ساختمان مرکز پردیس توس در مشهد",
    caption: "ورودی مرکز پردیس توس",
    category: "محیط مرکز",
    layout: "wide",
  },
] as const;

export const galleryCategories = ["همه", "فضای باز", "دورهمی‌ها", "محیط مرکز"] as const;

export const trustItems = [
  { value: "۱۳۸۹", label: "سال تأسیس" },
  { value: "+۱۵ سال", label: "سابقه فعالیت" },
  { value: "درجه یک", label: "براساس ارزیابی سازمانی" },
  {
    value: "اولین مرکز سالمندان",
    label: "دارای نشان استاندارد در کشور",
    variant: "standard",
  },
] as const;

export const reasonsToChoose = [
  {
    title: "محیطی امن و آرام",
    description:
      "فضایی آرام برای زندگی روزمره سالمندان، با توجه به آسایش، امنیت و حفظ کیفیت زندگی.",
  },
  {
    title: "پرسنل دلسوز و باتجربه",
    description:
      "مراقبت توسط تیمی که تجربه کار با سالمندان را دارد و در کنار رسیدگی حرفه‌ای، با احترام و صبوری همراه آن‌هاست.",
  },
  {
    title: "بیش از ۱۵ سال تجربه",
    description:
      "از سال ۱۳۸۹ در زمینه مراقبت و توانبخشی سالمندان فعالیت می‌کنیم و در این سال‌ها همراه سالمندان و خانواده‌هایشان بوده‌ایم.",
  },
  {
    title: "موقعیت مناسب در مشهد",
    description:
      "قرارگیری مجموعه در محدوده راهنمایی مشهد، دسترسی خانواده‌ها برای مراجعه و دیدار را آسان‌تر می‌کند.",
  },
  {
    title: "درجه یک در ارزیابی سازمانی",
    description:
      "پردیس توس در ارزیابی سازمانی مراکز سالمندان، درجه یک را کسب کرده است.",
  },
  {
    title: "اولین مرکز سالمندان دارای نشان استاندارد در کشور",
    description:
      "پردیس توس نخستین مرکز سالمندان کشور است که نشان استاندارد دریافت کرده است.",
  },
] as const;
