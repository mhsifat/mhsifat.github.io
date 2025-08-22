/* ---------------------------
   Typing effect (hero)
   --------------------------- */
const phrases = [
  "Chemical Engineering Student",
  "Process Simulation Enthusiast",
  "Data Analyst",
  "Aspiring Researcher"
];

let pi = 0, ci = 0;
let buffer = [];
let deleting = false;

function typeLoop() {
  const el = document.querySelector(".typing");
  if (!el) return;
  const word = phrases[pi];

  if (!deleting) {
    if (ci < word.length) {
      buffer.push(word[ci]);
      ci++;
    } else {
      // pause then delete
      deleting = true;
      setTimeout(typeLoop, 1200);
      el.textContent = buffer.join("");
      return;
    }
  } else {
    if (ci > 0) {
      buffer.pop();
      ci--;
    } else {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }

  el.textContent = buffer.join("");
  setTimeout(typeLoop, deleting ? 50 : 120);
}
document.addEventListener("DOMContentLoaded", () => {
  typeLoop();
});

/* ---------------------------
   Dark mode (persistent)
   --------------------------- */
const darkToggle = document.getElementById("darkModeToggle");
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  if (darkToggle) darkToggle.textContent = "☀";
}
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", isDark ? "true" : "false");
    darkToggle.textContent = isDark ? "☀" : "🌙";
    darkToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  });
}

/* ---------------------------
   Hamburger menu (responsive)
   --------------------------- */
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
  });

  mainNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------
   Reveal: timeline + other cards (IntersectionObserver)
   --------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const skillCards = document.querySelectorAll(".skill-card");
  const toObserve = [...timelineItems, ...skillCards, ...document.querySelectorAll(".card")];

  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // stagger skills more smoothly
        if (entry.target.classList.contains("skill-card")) {
          const idx = Array.from(skillCards).indexOf(entry.target);
          entry.target.style.transitionDelay = (idx * 80) + "ms";
        }
        entry.target.classList.add("show");
        o.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  toObserve.forEach(el => obs.observe(el));
});
