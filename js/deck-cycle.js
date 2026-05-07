(() => {
  const deck = document.querySelector(".deck");
  if (!deck) return;

  const ORDER = [1, 2, 3];
  const TOTAL = ORDER.length;
  let current = parseInt(deck.dataset.front || "1", 10);
  if (!ORDER.includes(current)) current = 1;

  // WCAG label-content-name-mismatch: visible text inside the deck card MUST appear at the start of
  // the accessible name. Pull the active card's `.card-step` text (e.g. "01 · You spoke") and prepend it.
  const stepText = (n) => {
    const card = deck.querySelector(`.deck__card--${n} .card-step`);
    return card ? card.textContent.trim() : `Step ${n}`;
  };
  const labelFor = (n) => `${stepText(n)}. Pipeline step ${n} of ${TOTAL}, press Enter or click to advance.`;

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
