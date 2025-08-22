const phrases = [
  "Chemical Engineering Student",
  "Process Simulation Enthusiast",
  "Data Analyst",
  "Aspiring Researcher"
];

let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
  isEnd = false;
  document.querySelector(".typing").innerHTML = currentPhrase.join("");

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
    }

    if (isDeleting && j > 0) {
      currentPhrase.pop();
      j--;
    }

    if (j === phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        i = 0;
      }
    }
  }
  const speed = isEnd ? 2000 : isDeleting ? 50 : 150;
  setTimeout(loop, speed);
}

loop();

// Dark Mode Toggle
const toggleButton = document.getElementById("darkModeToggle");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  
  if(document.body.classList.contains("dark")) {
    toggleButton.textContent = "☀ Light Mode";
  } else {
    toggleButton.textContent = "🌙 Dark Mode";
  }
});

// Timeline Scroll Animation
const timelineItems = document.querySelectorAll('.timeline-item');

function showTimelineItems() {
  const triggerBottom = window.innerHeight * 0.85;

  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if(itemTop < triggerBottom) {
      item.classList.add('show');
    }
  });
}

window.addEventListener('scroll', showTimelineItems);
window.addEventListener('load', showTimelineItems);
