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

function loop() {
  const typingElement = document.querySelector(".typing");
  if (!typingElement) return;

  typingElement.innerHTML = currentPhrase.join("");

  // Logic for typing forward
  if (!isDeleting && j < phrases[i].length) {
    currentPhrase.push(phrases[i][j]);
    j++;
  }

  // Logic for deleting
  if (isDeleting && j > 0) {
    currentPhrase.pop();
    j--;
  }

  // If finished typing a phrase
  if (j === phrases[i].length) {
    isDeleting = true;
  }

  // If finished deleting a phrase
  if (isDeleting && j === 0) {
    isDeleting = false;
    i++;
    if (i >= phrases.length) {
      i = 0;
    }
  }

  const speed = isDeleting ? 50 : 150;
  let delay = (isDeleting && j === 0) ? 1000 : speed; // Add a 1s delay before starting the next phrase
  if (!isDeleting && j === phrases[i].length) {
    delay = 2000; // Longer pause at the end of typing
  }

  setTimeout(loop, delay);
}

loop();
