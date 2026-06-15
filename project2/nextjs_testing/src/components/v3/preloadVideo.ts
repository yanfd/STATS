/** Wait until a video can start playback, with a hard timeout fallback. */
export function preloadVideo(src: string, timeoutMs = 12000): Promise<void> {
  return new Promise((resolve) => {
    if (typeof document === "undefined") {
      resolve();
      return;
    }

    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      video.removeEventListener("canplay", finish);
      video.removeEventListener("error", finish);
      video.src = "";
      video.load();
      resolve();
    };

    const timer = window.setTimeout(finish, timeoutMs);

    video.addEventListener("canplay", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    video.src = src;
    video.load();
  });
}
