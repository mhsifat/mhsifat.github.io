// script.js — DOMContentLoaded initialization (header award removed)
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
  let pIdx = 0, cIdx = 0;
  let buf = [];
  let deleting = false;
  const typingEl = document.querySelector(".typing");

  function typeLoop() {
    if (!typingEl) return;
    const word = phrases[pIdx];
    if (!deleting) {
      if (cIdx < word.length) {
        buf.push(word[cIdx]); cIdx++;
      } else {
        deleting = true;
        setTimeout(typeLoop, 1200);
        typingEl.textContent = buf.join("");
        return;
      }
    } else {
      if (cIdx > 0) {
        buf.pop(); cIdx--;
      } else {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    typingEl.textContent = buf.join("");
    setTimeout(typeLoop, deleting ? 50 : 120);
  }
  typeLoop();

  /* ---------------------------
     Dark mode w/ persistence
     --------------------------- */
  const darkToggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    if (darkToggle) { darkToggle.textContent = "☀"; darkToggle.setAttribute("aria-pressed", "true"); }
  }
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      const on = document.body.classList.toggle("dark");
      localStorage.setItem("darkMode", on ? "true" : "false");
      darkToggle.textContent = on ? "☀" : "🌙";
      darkToggle.setAttribute("aria-pressed", on ? "true" : "false");
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
     Reveal animations (IntersectionObserver)
     - unified observer for timeline, skills, cards, awards
     --------------------------- */
  const timelineItems = Array.from(document.querySelectorAll(".timeline-item"));
  const skillCards = Array.from(document.querySelectorAll(".skill-card"));
  const generalCards = Array.from(document.querySelectorAll(".card"));
  const awardCards = Array.from(document.querySelectorAll(".award-card"));

  const toObserve = Array.from(new Set([...timelineItems, ...skillCards, ...generalCards, ...awardCards]));

  if ('IntersectionObserver' in window && toObserve.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // stagger for skill cards and awards
        if (el.classList.contains("skill-card")) {
          const idx = skillCards.indexOf(el);
          el.style.transitionDelay = (idx * 80) + "ms";
        } else if (el.classList.contains("award-card")) {
          const idx = awardCards.indexOf(el);
          el.style.transitionDelay = (idx * 90) + "ms";
        }
        el.classList.add("show");
        observer.unobserve(el);
      });
    }, { threshold: 0.18 });

    toObserve.forEach(el => obs.observe(el));
  } else {
    // fallback: show all
    toObserve.forEach((el, i) => {
      el.style.transitionDelay = (i * 40) + "ms";
      el.classList.add("show");
    });
  }

  /* ---------------------------
     Skill card accessibility + activation
     --------------------------- */
  (function setupSkillCards() {
    if (!skillCards.length) return;
    let live = document.getElementById('skillLiveRegion');
    if (!live) {
      live = document.createElement('div');
      live.id = 'skillLiveRegion';
      live.setAttribute('aria-live', 'polite');
      live.style.position = 'absolute';
      live.style.left = '-9999px';
      document.body.appendChild(live);
    }

    skillCards.forEach(card => {
      if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title') || card.querySelector('strong')?.textContent || 'Skill';
        const note = card.querySelector('small') ? card.querySelector('small').textContent : '';
        live.textContent = `${title} — ${note}`;
        card.animate([{ transform: 'scale(1.02)' }, { transform: 'scale(1)' }], { duration: 180 });
        card.classList.add('active');
        setTimeout(() => card.classList.remove('active'), 800);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
      });
    });
  })();

  /* ---------------------------
     Small UX: close mobile nav if click outside
     --------------------------- */
  document.addEventListener('click', (evt) => {
    if (!mainNav || !menuButton) return;
    if (mainNav.classList.contains('open')) {
      const t = evt.target;
      if (!mainNav.contains(t) && !menuButton.contains(t)) {
        mainNav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    }
  });

}); // end DOMContentLoaded
