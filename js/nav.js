(function () {
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("primary-nav");
  if (!toggle || !menu) return;

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }
  function open() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }
  function close() {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", function () {
    isOpen() ? close() : open();
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) {
      close();
      toggle.focus();
    }
  });

  var media = window.matchMedia("(min-width: 721px)");
  function handleViewport(e) {
    if (e.matches) close();
  }
  if (media.addEventListener) {
    media.addEventListener("change", handleViewport);
  } else if (media.addListener) {
    media.addListener(handleViewport);
  }
})();
