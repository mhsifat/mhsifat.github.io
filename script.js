// Typing Effect
const typingText = document.querySelector(".typing-text");
const words = ["Chemical Engineer", "Data Enthusiast", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
  currentWord = words[wordIndex];
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex++);
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 80 : 120);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Skills animation
const skills = document.querySelectorAll(".skill-card");
window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;
  skills.forEach(skill => {
    if (skill.getBoundingClientRect().top < trigger) {
      skill.style.opacity = "1";
    }
  });
});
