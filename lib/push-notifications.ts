export function isPushNotificationSupported() {
  return (
    typeof window !== "undefined" &&
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
}

export async function getPushServiceWorkerRegistration() {
  if (!isPushNotificationSupported()) return null;
  const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  await registration.update();
  return navigator.serviceWorker.ready;
}

function decodeBase64Url(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const normalized = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const decoded = window.atob(normalized);
  return Uint8Array.from(decoded, (character) => character.charCodeAt(0));
}

export async function getOrCreatePushSubscription(publicKey: string) {
  const registration = await getPushServiceWorkerRegistration();
  if (!registration) return null;

  const existingSubscription = await registration.pushManager.getSubscription();
  if (existingSubscription) return existingSubscription;

  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: decodeBase64Url(publicKey) as BufferSource,
  });
}

export async function removeLocalPushSubscription() {
  const registration = await getPushServiceWorkerRegistration();
  const subscription = await registration?.pushManager.getSubscription();
  if (!subscription) return null;
  const endpoint = subscription.endpoint;
  await subscription.unsubscribe();
  return endpoint;
}
