(() => {
  const toggle = document.querySelector("[data-pricing-toggle]");
  if (!toggle) return;

  // Kill-switch: if data-lifetime-remaining is missing, zero, or negative,
  // hide the Lifetime tab entirely. Keeps the launch promotion self-expiring.
  const remaining = parseInt(toggle.dataset.lifetimeRemaining || "0", 10);
  const lifetimeBtn = toggle.querySelector('button[data-period="lifetime"]');
  if (lifetimeBtn && (!Number.isFinite(remaining) || remaining <= 0)) {
    lifetimeBtn.remove();
  }

  let buttons = Array.from(toggle.querySelectorAll("button[data-period]"));
  const swapTargets = document.querySelectorAll("[data-period-text]");

  const apply = (period) => {
    buttons.forEach((btn) => {
      const active = btn.dataset.period === period;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-checked", active ? "true" : "false");
      btn.setAttribute("tabindex", active ? "0" : "-1");
    });

    swapTargets.forEach((el) => {
      const next = el.dataset[period];
      if (next != null) el.textContent = next;
    });

    toggle.dataset.active = period;
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.dataset.period));
    btn.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const idx = buttons.indexOf(btn);
      const next = buttons[(idx + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length];
      next.focus();
      apply(next.dataset.period);
    });
  });

  // If the stored default isn't available (e.g. lifetime tab was stripped),
  // fall back to annual.
  const requested = toggle.dataset.active || "annual";
  const available = buttons.some((b) => b.dataset.period === requested);
  apply(available ? requested : "annual");
})();
