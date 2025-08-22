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

// Animate Education Progress Bars
const progressBars = document.querySelectorAll('.progress');

function animateProgress() {
  const section = document.getElementById('education');
  const sectionTop = section.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight - 50) {
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = width; // triggers CSS transition
    });
    window.removeEventListener('scroll', animateProgress);
  }
}

window.addEventListener('scroll', animateProgress);
