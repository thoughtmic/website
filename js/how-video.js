(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stage = document.querySelector("[data-autoplay-in-view]");
  if (!stage) return;
  const video = stage.querySelector("video");
  if (!video) return;

  if (prefersReduced) {
    video.removeAttribute("autoplay");
    try { video.pause(); } catch (e) {}
    return;
  }

  if (!("IntersectionObserver" in window)) {
    try { video.play(); } catch (e) {}
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const p = video.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } else {
          try { video.pause(); } catch (e) {}
        }
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(stage);
})();
