function setActiveNav() {
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(function (el) {
    if (el.getAttribute("href") === path) {
      el.classList.add("active");
    }
  });
}

function setupNavToggle() {
  var btn = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-links");
  if (!btn || !menu) return;

  btn.addEventListener("click", function () {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach(function (item) {
    item.addEventListener("click", function () {
      menu.classList.remove("open");
      document.querySelectorAll(".has-dropdown").forEach(function (node) {
        node.classList.remove("open");
      });
    });
  });
}

function setupDropdowns() {
  var items = document.querySelectorAll(".has-dropdown");
  if (!items.length) return;

  items.forEach(function (item) {
    var btn = item.querySelector(".nav-drop-toggle");
    if (!btn) return;

    btn.addEventListener("click", function (event) {
      event.preventDefault();
      var isMobile = window.matchMedia("(max-width: 860px)").matches;

      if (isMobile) {
        item.classList.toggle("open");
        return;
      }

      items.forEach(function (other) {
        if (other !== item) other.classList.remove("open");
      });
      item.classList.toggle("open");
    });
  });

  document.addEventListener("click", function (event) {
    if (event.target.closest(".has-dropdown")) return;
    items.forEach(function (item) {
      item.classList.remove("open");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    items.forEach(function (item) {
      item.classList.remove("open");
    });
  });
}

function setupReveals() {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  function run() {
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) {
        el.classList.add("visible");
      }
    });
  }

  run();
  window.addEventListener("scroll", run, { passive: true });
}

function setupCounters() {
  var counters = document.querySelectorAll("[data-target]");
  if (!counters.length) return;
  var hasRun = false;

  function runCounter() {
    if (hasRun) return;
    hasRun = true;

    counters.forEach(function (el) {
      var target = Number(el.getAttribute("data-target")) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var current = 0;
      var step = Math.max(1, Math.ceil(target / 60));

      var timer = setInterval(function () {
        current = Math.min(current + step, target);
        el.textContent = String(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 24);
    });
  }

  var impact = document.querySelector(".impact");
  if (!impact || !window.IntersectionObserver) {
    runCounter();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) runCounter();
  }, { threshold: 0.35 });

  observer.observe(impact);
}

function setupTabs() {
  var controls = document.querySelectorAll("[data-tab-btn]");
  if (!controls.length) return;

  controls.forEach(function (button) {
    button.addEventListener("click", function () {
      var target = button.getAttribute("data-tab-btn");
      document.querySelectorAll("[data-tab-btn]").forEach(function (b) {
        b.classList.remove("active");
      });
      document.querySelectorAll(".tab-panel").forEach(function (panel) {
        panel.classList.remove("active");
      });
      button.classList.add("active");
      var activePanel = document.getElementById(target);
      if (activePanel) activePanel.classList.add("active");
    });
  });
}

function setupContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var notice = document.getElementById("contact-notice");
    if (notice) {
      notice.textContent = "Thank you. Your enquiry has been captured. Our team will contact you shortly.";
    }
    form.reset();
  });
}

setActiveNav();
setupNavToggle();
setupDropdowns();
setupReveals();
setupCounters();
setupTabs();
setupContactForm();
