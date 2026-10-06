const DEFAULT_TITLE = "پردیس توس";
const DEFAULT_ICON = "/images/pardis-toos-logo.png";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data ? event.data.text() : "درخواست جدیدی ثبت شد." };
  }

  const title = payload.title || DEFAULT_TITLE;
  const options = {
    body: payload.body || "درخواست جدیدی در پنل مدیریت ثبت شد.",
    icon: payload.icon || DEFAULT_ICON,
    badge: payload.badge || DEFAULT_ICON,
    dir: "rtl",
    lang: "fa",
    tag: payload.data?.requestId || "pardis-toos-new-request",
    renotify: true,
    data: payload.data || { url: "/admin" },
  };

  event.waitUntil(
    self.registration.showNotification(title, options).catch(() => {
      const fallbackOptions = {
        body: options.body,
        dir: options.dir,
        lang: options.lang,
        tag: options.tag,
        renotify: options.renotify,
        data: options.data,
      };
      return self.registration.showNotification(title, fallbackOptions);
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || "/admin", self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const adminClient = clients.find((client) => new URL(client.url).pathname.startsWith("/admin"));
      if (adminClient) {
        return adminClient.navigate(targetUrl).then(() => adminClient.focus());
      }
      return self.clients.openWindow(targetUrl);
    }),
  );
});
