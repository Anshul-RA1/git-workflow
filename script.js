// Interactivity and Animations for Git Workflow Visual Guide

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

// Initial theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(current);
});

// Section 1: Node hover highlights connections
const gitNodes = document.querySelectorAll(".git-node");
const arrows = document.querySelectorAll(".arrow");

gitNodes.forEach((node, idx) => {
  node.addEventListener("mouseenter", () => {
    node.classList.add("active");
    if (arrows[idx]) arrows[idx].classList.add("highlighted");
  });
  node.addEventListener("mouseleave", () => {
    node.classList.remove("active");
    if (arrows[idx]) arrows[idx].classList.remove("highlighted");
  });
});

// Step-by-step highlight animation
let cycling = false;
let cycleStep = 0;
let cycleInterval = null;
const cycleBtn = document.getElementById("cycle-btn");

function highlightStep(step) {
  gitNodes.forEach((n, i) => n.classList.toggle("active", i === step));
  arrows.forEach((a, i) => a.classList.toggle("highlighted", i === step));
}

function startCycle() {
  cycling = true;
  cycleBtn.textContent = "Stop Animation";
  cycleStep = 0;
  highlightStep(cycleStep);
  cycleInterval = setInterval(() => {
    cycleStep = (cycleStep + 1) % gitNodes.length;
    highlightStep(cycleStep);
  }, 1200);
}

function stopCycle() {
  cycling = false;
  cycleBtn.textContent = "Step-by-Step Animation";
  gitNodes.forEach((n) => n.classList.remove("active"));
  arrows.forEach((a) => a.classList.remove("highlighted"));
  clearInterval(cycleInterval);
}

cycleBtn.addEventListener("click", () => {
  if (!cycling) startCycle();
  else stopCycle();
});

// Section 2: Timeline node hover for tooltip and arrow highlight
const timelineNodes = document.querySelectorAll(".timeline-node");
const timelineArrows = document.querySelectorAll(".timeline-arrow");

timelineNodes.forEach((node, idx) => {
  node.addEventListener("mouseenter", () => {
    node.classList.add("active");
    if (timelineArrows[idx]) timelineArrows[idx].classList.add("highlighted");
  });
  node.addEventListener("mouseleave", () => {
    node.classList.remove("active");
    if (timelineArrows[idx])
      timelineArrows[idx].classList.remove("highlighted");
  });
});

// Fade-in animation on load
window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "opacity 1.2s";
    document.body.style.opacity = 1;
  }, 100);
});
