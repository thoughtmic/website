(() => {
  const deck = document.querySelector(".deck");
  if (!deck) return;

  const ORDER = [1, 2, 3];
  const TOTAL = ORDER.length;
  let current = parseInt(deck.dataset.front || "1", 10);
  if (!ORDER.includes(current)) current = 1;

  const labelFor = (n) => `Pipeline step ${n} of ${TOTAL} — press Enter or click to see next step`;

  const setFront = (n) => {
    current = n;
    deck.setAttribute("data-front", String(n));
    deck.setAttribute("aria-label", labelFor(n));
    document.dispatchEvent(new CustomEvent("deck:frontchange", { detail: { front: n } }));
  };

  const next = () => {
    const idx = ORDER.indexOf(current);
    setFront(ORDER[(idx + 1) % TOTAL]);
  };

  deck.setAttribute("role", "button");
  deck.setAttribute("tabindex", "0");
  deck.setAttribute("aria-live", "polite");
  setFront(current);

  deck.addEventListener("click", next);
  deck.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      next();
    }
  });
})();
