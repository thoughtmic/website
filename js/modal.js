(() => {
  const trigger = document.querySelector('a.btn--ghost[href="#demo"]');
  const modal = document.getElementById("demo-modal");
  if (!trigger || !modal) return;

  const dialog = modal.querySelector(".modal__dialog");
  const closeBtn = modal.querySelector(".modal__close");
  const video = modal.querySelector("video");
  const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), video[controls]';
  let lastFocus = null;

  const getFocusable = () => Array.from(modal.querySelectorAll(FOCUSABLE)).filter((n) => n.offsetParent !== null || n === document.activeElement);

  const open = () => {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      (closeBtn || dialog).focus();
      if (video) {
        try { video.currentTime = 0; video.play(); } catch (e) {}
      }
    });
    document.addEventListener("keydown", onKey);
  };

  const close = () => {
    modal.classList.remove("is-open");
    document.removeEventListener("keydown", onKey);
    document.body.style.overflow = "";
    if (video) { try { video.pause(); } catch (e) {} }
    const finalize = () => {
      modal.hidden = true;
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
      dialog.removeEventListener("transitionend", finalize);
    };
    dialog.addEventListener("transitionend", finalize);
    setTimeout(finalize, 400);
  };

  const onKey = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "Tab") {
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });

  if (closeBtn) closeBtn.addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
})();
