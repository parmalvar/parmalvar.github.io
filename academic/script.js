(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  btn.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      btn.focus();
    }
  });

  var sections = [];
  nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var el = document.getElementById(link.getAttribute("href").slice(1));
    if (el) sections.push({ el: el, link: link });
  });

  if (!("IntersectionObserver" in window) || !sections.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sections.forEach(function (section) {
          if (section.el === entry.target) {
            section.link.setAttribute("aria-current", "location");
          } else {
            section.link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section.el);
  });
})();
