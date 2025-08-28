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
   Robust skills reveal + interaction
   --------------------------- */
(function setupSkills() {
  const skillCards = Array.from(document.querySelectorAll('.skill-card'));
  if (!skillCards.length) return;

  // IntersectionObserver to reveal with stagger
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const idx = skillCards.indexOf(el);
        el.style.transitionDelay = (idx * 80) + 'ms';
        el.classList.add('show');
        o.unobserve(el);
      });
    }, { threshold: 0.18 });
    skillCards.forEach(c => obs.observe(c));
  } else {
    // fallback: show all
    skillCards.forEach((c, i) => {
      c.style.transitionDelay = (i * 60) + 'ms';
      c.classList.add('show');
    });
  }

  // keyboard accessible activation + live region announcement
  let live = document.getElementById('skillLiveRegion');
  if (!live) {
    live = document.createElement('div');
    live.id = 'skillLiveRegion';
    live.setAttribute('aria-live', 'polite');
    live.style.position = 'absolute';
    live.style.left = '-9999px';
    document.body.appendChild(live);
  }

  skillCards.forEach((card) => {
    // ensure keyboard focusable
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');

    // click/activation
    card.addEventListener('click', () => {
      // toggle a brief active state
      card.classList.add('active');
      setTimeout(() => card.classList.remove('active'), 900);

      const title = card.getAttribute('data-title') || card.querySelector('strong')?.textContent || 'Skill';
      const note = card.querySelector('small') ? card.querySelector('small').textContent : '';
      live.textContent = `${title} — ${note}`;

      // small visual press effect
      card.animate([{ transform: 'scale(1.02)' }, { transform: 'scale(1)' }], { duration: 200 });
    });

    // keyboard activation (Enter / Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

    // nicer hover outline for focus-visible
    card.addEventListener('focus', () => card.classList.add('focus'));
    card.addEventListener('blur', () => card.classList.remove('focus'));
  });
})();


}); // end DOMContentLoaded
