"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Live clock (Perth / AWST, UTC+8) ---------------- */
  const clockEl = document.getElementById("clock");
  const updateClock = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const perth = new Date(utc + 8 * 3600000);
    const hh = String(perth.getHours()).padStart(2, "0");
    const mm = String(perth.getMinutes()).padStart(2, "0");
    const ss = String(perth.getSeconds()).padStart(2, "0");
    clockEl.textContent = `${hh}:${mm}:${ss}`;
  };
  updateClock();
  setInterval(updateClock, 1000);

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

  /* ---------------- Terminal typing line ---------------- */
  const typingLine = document.getElementById("typing-line");
  const lines = [
    "> diagnosing hardware since 2021",
    "> writing C# and JavaScript daily",
    "> building toward junior dev roles",
  ];

  if (reduceMotion) {
    typingLine.textContent = lines[0];
  } else {
    let li = 0, ci = 0, deleting = false;
    const tick = () => {
      const line = lines[li];
      ci += deleting ? -1 : 1;
      typingLine.textContent = line.substring(0, ci);
      let speed = deleting ? 35 : 55;
      if (!deleting && ci === line.length) { speed = 2200; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; li = (li + 1) % lines.length; speed = 400; }
      setTimeout(tick, speed);
    };
    setTimeout(tick, 600);
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

  /* ---------------- Status bars fill on scroll ---------------- */
  const statusPanel = document.querySelector(".status-panel");
  if (statusPanel) {
    const statusObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".status-fill").forEach((fill, i) => {
            setTimeout(() => fill.classList.add("filled"), i * 90);
          });
          statusObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statusObserver.observe(statusPanel);
  }
});
