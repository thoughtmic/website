(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stages = document.querySelectorAll("[data-autoplay-in-view]");
  if (!stages.length) return;

  if (prefersReduced) {
    stages.forEach((stage) => {
      const v = stage.querySelector("video");
      if (!v) return;
      v.removeAttribute("autoplay");
      try { v.pause(); } catch (e) {}
    });
    return;
  }

  if (!("IntersectionObserver" in window)) {
    stages.forEach((stage) => {
      const v = stage.querySelector("video");
      if (v) { try { v.play(); } catch (e) {} }
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const v = entry.target.querySelector("video");
        if (!v) return;
        if (entry.isIntersecting) {
          const p = v.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } else {
          try { v.pause(); } catch (e) {}
        }
      });
    },
    { threshold: 0.35 }
  );

  stages.forEach((stage) => observer.observe(stage));
})();
