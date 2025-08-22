/* ---------------------------
   Typing effect (hero)
   --------------------------- */
const phrases = [
  "Chemical Engineering Student",
  "Process Simulation Enthusiast",
  "Data Analyst",
  "Aspiring Researcher"
];

let pIndex = 0, cIndex = 0;
let typing = [];
let deleting = false;

function typingLoop() {
  const el = document.querySelector(".typing");
  if (!el) return;

  const current = phrases[pIndex];
  if (!deleting) {
    if (cIndex < current.length) {
      typing.push(current[cIndex]);
      cIndex++;
    } else {
      // finished typing: pause then start deleting
      deleting = true;
      setTimeout(typingLoop, 1200);
      el.textContent = typing.join('');
      return;
    }
  } else {
    if (cIndex > 0) {
      typing.pop();
      cIndex--;
    } else {
      // finished deleting: move to next phrase
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
    }
  }
  el.textContent = typing.join('');
  const speed = deleting ? 50 : 120;
  setTimeout(typingLoop, speed);
}
typingLoop();

/* ---------------------------
   Dark mode with persistence
   --------------------------- */
const darkToggle = document.getElementById("darkModeToggle");
const userPref = localStorage.getItem("darkMode");
if (userPref === "true") {
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
    // animate hamburger via aria-expanded (css)
  });

  // close menu when clicking a nav link (mobile)
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------
   Timeline scroll reveal
   --------------------------- */
const timelineItems = document.querySelectorAll('.timeline-item');

function revealTimeline() {
  const trigger = window.innerHeight * 0.82;
  timelineItems.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if (top < trigger) {
      item.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealTimeline);
window.addEventListener('load', () => {
  revealTimeline();
  // small initial reveal of top items
  setTimeout(revealTimeline, 300);
});

/* ---------------------------
   Small UX: close nav if click outside (mobile)
   --------------------------- */
document.addEventListener('click', (evt) => {
  const target = evt.target;
  if (!mainNav || !menuButton) return;
  if (mainNav.classList.contains('open')) {
    if (!mainNav.contains(target) && !menuButton.contains(target)) {
      mainNav.classList.remove('open');
      menuButton.setAttribute("aria-expanded", "false");
    }
  }
});

/* ---------------------------
   Minor: reveal other content (cards)
   --------------------------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .section .card, .timeline-item').forEach(el => observer.observe(el));

// Timeline reveal on scroll
const timelineItems = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => observer.observe(item));
