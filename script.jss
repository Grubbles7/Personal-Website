// Dark Mode Toggle
const toggleBtn = document.getElementById("dark-toggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️"; // sun icon
  } else {
    document.body.classList.remove("dark");
    toggleBtn.textContent = "🌙"; // moon icon
  }
}

// Handle click
toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  applyTheme(isDark ? "dark" : "light");
});

// Apply saved theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
});