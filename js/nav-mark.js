/**
 * Nav logo hover-replay handler.
 *
 * The CSS in components.css runs the entrance animation once on page load
 * (scaleY 0.05 → 1.0, 0.7s ease-out, 80ms stagger across 7 bars). After the
 * entrance completes, this script enables a hover-replay using the Web
 * Animations API.
 *
 * The CSS :hover approach was abandoned because changing the animation
 * property on hover-in AND hover-out both trigger a re-animation, and
 * rapid mouse movement in/out of the wordmark caused mid-animation
 * restarts that looked janky. The JS approach below:
 *
 *   - Only listens to mouseenter (not mouseleave)
 *   - Debounces: if a replay is already running, ignores the new mouseenter
 *   - Respects prefers-reduced-motion (no JS animation, CSS handles the
 *     reduce-motion case too)
 */
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const xs = ["312", "372", "432", "492", "552", "612", "672"];
  const delays = [0, 80, 160, 240, 320, 400, 480];
  const duration = 700;
  const totalDuration = delays[delays.length - 1] + duration; // 1180ms

  document.querySelectorAll(".nav__wordmark").forEach((wordmark) => {
    const mark = wordmark.querySelector(".nav__mark");
    if (!mark) return;

    const bars = xs.map((x) => mark.querySelector(`rect[x="${x}"]`)).filter(Boolean);
    if (bars.length !== xs.length) return;

    // CSS on-load entrance is running right now; block hover until it finishes.
    let isAnimating = true;
    setTimeout(() => { isAnimating = false; }, totalDuration);

    wordmark.addEventListener("mouseenter", () => {
      if (isAnimating) return;
      isAnimating = true;

      bars.forEach((bar, i) => {
        bar.animate(
          [{ transform: "scaleY(0.05)" }, { transform: "scaleY(1)" }],
          { duration, easing: "ease-out", delay: delays[i], fill: "forwards" }
        );
      });

      setTimeout(() => { isAnimating = false; }, totalDuration);
    });
  });
})();
