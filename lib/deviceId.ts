export function getDeviceId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let id = window.localStorage.getItem("untether_device_id");
    if (!id) {
      id = "dev_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      window.localStorage.setItem("untether_device_id", id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}
