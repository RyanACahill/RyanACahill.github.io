// Theme: persist + toggle
(function () {
  const root = document.body;
  const btn = document.getElementById("theme-toggle");
  const lbl = document.getElementById("theme-label");
  const saved = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    lbl.textContent = theme === "dark" ? "Dark" : "Light";
    localStorage.setItem("theme", theme);
  }

  apply(saved ? saved : prefersDark ? "dark" : "light");

  btn.addEventListener("click", () => {
    apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
})();

// Intersection Observer for slide-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  },
  { threshold: 0.16 }
);

document
  .querySelectorAll(".card, .project, .contact-item")
  .forEach((el) => observer.observe(el));

// Active nav link on scroll
const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];

const setActive = (id) => {
  navLinks.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + id)
  );
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  },
  { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] }
);

sections.forEach((s) => sectionObserver.observe(s));

document
  .querySelectorAll(".card, .project-card, .contact-item, .icon-btn")
  .forEach((el) => observer.observe(el));
