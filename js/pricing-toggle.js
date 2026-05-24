(() => {
  const toggle = document.querySelector("[data-pricing-toggle]");
  if (!toggle) return;

  // Lifetime kill-switch: when the Founder's Deal sells out (remaining
  // missing, zero, or negative), drop the deal card and collapse the grid
  // to two columns. Keeps the launch promotion self-expiring.
  const grid = document.querySelector(".pricing__grid");
  const remaining = parseInt((grid && grid.dataset.lifetimeRemaining) || "0", 10);
  const dealCard = grid && grid.querySelector("[data-lifetime-card]");
  if (dealCard && (!Number.isFinite(remaining) || remaining <= 0)) {
    dealCard.remove();
    grid.classList.add("is-2up");
  } else if (dealCard) {
    const label = dealCard.querySelector("[data-lifetime-remaining-label]");
    if (label) label.textContent = String(remaining);
  }

  // Billing-period toggle: swaps the Pro card between monthly and annual.
  const buttons = Array.from(toggle.querySelectorAll("button[data-period]"));
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

  const requested = toggle.dataset.active || "annual";
  const available = buttons.some((b) => b.dataset.period === requested);
  apply(available ? requested : "annual");
})();
