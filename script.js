// script.js
// =================================
// Main JS Entry
// =================================
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Confirm load
  console.log("Portfolio loaded");

  // Animate ASCII elements on scroll
  const asciiBlocks = document.querySelectorAll(".ascii-box");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.3 }
  );

  asciiBlocks.forEach(block => {
    block.style.opacity = "0";
    block.style.transform = "translateY(20px)";
    block.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(block);
  });
});
