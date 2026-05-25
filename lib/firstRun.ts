export function hasSeenIntro(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem("untether_seen_intro") === "yes";
  } catch {
    return true;
  }
}

export function markIntroSeen(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("untether_seen_intro", "yes");
  } catch {
    /* ignore - intro will just show again, harmless */
  }
}
