"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- Theme toggle ---------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  root.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---------------- Mobile menu ---------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobileNav");
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mobileNav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------------- Hero role typing ---------------- */
  const typingText = document.getElementById("typing-text");
  const phrases = [
    "Hardware technician → software developer",
    "PC builder → code writer",
    "Diagnosing boards → debugging code",
  ];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    typingText.textContent = phrases[0];
  } else {
    let phraseIndex = 0, charIndex = 0, deleting = false;
    const tick = () => {
      const phrase = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      typingText.textContent = phrase.substring(0, charIndex);
      let speed = deleting ? 45 : 90;

      if (!deleting && charIndex === phrase.length) { speed = 2200; deleting = true; }
      else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 400; }

      setTimeout(tick, speed);
    };
    setTimeout(tick, 800);
  }

  /* ---------------- Hero orb follows cursor ---------------- */
  const orb = document.getElementById("heroOrb");
  const hero = document.querySelector(".hero");
  if (orb && hero && !reduceMotion) {
    hero.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      orb.style.setProperty("--mx", `${x}%`);
      orb.style.setProperty("--my", `${y}%`);
    });
  }

  /* ---------------- Scroll reveals ---------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  /* ---------------- Staggered project cards ---------------- */
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.getAttribute("data-stagger") || 0) * 110;
        setTimeout(() => entry.target.classList.add("stagger-visible"), delay);
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".project-card").forEach(card => staggerObserver.observe(card));

  /* ---------------- Active nav link on scroll ---------------- */
  const sections = document.querySelectorAll("main .section, .hero");
  const navLinks = document.querySelectorAll(".nav-links a");
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => navObserver.observe(s));
});
