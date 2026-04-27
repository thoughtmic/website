(() => {
  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll("[data-stream-text]");
  if (!targets.length) return;

  const CHAR_MS = 35;
  const IDLE_MS = 1500;

  const renderStatic = (el) => {
    const visible = el.querySelector(".card-rec__visible");
    if (visible) visible.textContent = el.dataset.streamText;
  };

  if (prefersReduced) {
    targets.forEach(renderStatic);
    return;
  }

  const controllers = new WeakMap();

  const cancel = (el) => {
    const ctrl = controllers.get(el);
    if (ctrl) ctrl.timers.forEach(clearTimeout);
  };

  const start = (el) => {
    cancel(el);
    const full = el.dataset.streamText || "";
    const visible = el.querySelector(".card-rec__visible");
    if (!visible) return;

    visible.textContent = "";
    let i = 0;
    const ctrl = { timers: [] };
    controllers.set(el, ctrl);

    const step = () => {
      if (i < full.length) {
        i += 1;
        visible.textContent = full.slice(0, i);
        ctrl.timers.push(setTimeout(step, CHAR_MS));
      } else {
        ctrl.timers.push(setTimeout(() => start(el), IDLE_MS));
      }
    };
    step();
  };

  const cardNumberOf = (el) => {
    const card = el.closest(".deck__card");
    if (!card) return 0;
    const match = card.className.match(/deck__card--(\d)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  document.addEventListener("deck:frontchange", (e) => {
    const frontN = e.detail && e.detail.front;
    targets.forEach((el) => {
      if (cardNumberOf(el) === frontN) {
        start(el);
      } else {
        cancel(el);
        renderStatic(el);
      }
    });
  });

  const deck = document.querySelector(".deck");
  if (deck) {
    const n = parseInt(deck.dataset.front || "1", 10);
    document.dispatchEvent(new CustomEvent("deck:frontchange", { detail: { front: n } }));
  }
})();
