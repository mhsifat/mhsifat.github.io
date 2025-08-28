// All initialization runs after DOM is ready
document.addEventListener("DOMContentLoaded", () => {

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
  const typingEl = document.querySelector(".typing");

  function typeLoop() {
    if (!typingEl) return;
    const word = phrases[pi];

    if (!deleting) {
      if (ci < word.length) {
        buffer.push(word[ci]);
        ci++;
      } else {
        deleting = true;
        setTimeout(typeLoop, 1200); // pause before deleting
        typingEl.textContent = buffer.join("");
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

    typingEl.textContent = buffer.join("");
    setTimeout(typeLoop, deleting ? 50 : 120);
  }
  typeLoop();

  /* ---------------------------
     Dark mode (persistent)
     --------------------------- */
  const darkToggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    if (darkToggle) darkToggle.textContent = "☀";
    if (darkToggle) darkToggle.setAttribute("aria-pressed", "true");
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

    // close menu when a link clicked (mobile)
    mainNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------
     Reveal animations (IntersectionObserver)
     --------------------------- */
  const timelineItems = document.querySelectorAll(".timeline-item");
  const skillCards = document.querySelectorAll(".skill-card");
  const otherCards = document.querySelectorAll(".card");
  const toObserve = [...timelineItems, ...skillCards, ...otherCards];

  if ('IntersectionObserver' in window && toObserve.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.classList.contains("skill-card")) {
            const idx = Array.from(skillCards).indexOf(el);
            el.style.transitionDelay = (idx * 80) + "ms";
          }
          el.classList.add("show");
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.18 });

    toObserve.forEach(el => obs.observe(el));
  } else {
    // fallback: show everything (no intersection observer)
    toObserve.forEach(el => el.classList.add("show"));
  }

  /* ---------------------------
     Skill card accessibility behavior
     --------------------------- */
  skillCards.forEach(card => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });

    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title") || "Skill";
      const note = card.querySelector('small') ? card.querySelector('small').textContent : '';
      card.animate([{ transform: 'scale(1.02)' }, { transform: 'scale(1)' }], { duration: 160 });
      let live = document.getElementById('skillLiveRegion');
      if (!live) {
        live = document.createElement('div');
        live.id = 'skillLiveRegion';
        live.setAttribute('aria-live', 'polite');
        live.style.position = 'absolute';
        live.style.left = '-9999px';
        document.body.appendChild(live);
      }
      live.textContent = `${title} — ${note}`;
    });
  });

}); // end DOMContentLoaded
