// ===== VARIABLES =====
const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const header = document.querySelector("nav");
const hamburger1 = document.getElementById("hamburger");
const hamburger2 = document.getElementById("hamburger2"); // tombol kedua
const navOverlay = document.getElementById("navOverlay");
const navLinks = document.querySelectorAll(".nav-tautan a, .nav-overlay a");
const skillCards = document.querySelectorAll(".kartu-keahlian");
const projectCards = document.querySelectorAll(".kartu-proyek");

// ===== THEME (DARK / LIGHT) =====
function initializeTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    html.classList.add("light-mode");
    themeToggle.textContent = "☀️"; // ikon terang
  } else {
    html.classList.remove("light-mode");
    themeToggle.textContent = "🌙"; // ikon gelap
  }
}

function toggleTheme() {
  html.classList.toggle("light-mode");
  const isLight = html.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
}
themeToggle?.addEventListener("click", toggleTheme);
document.addEventListener("DOMContentLoaded", initializeTheme);

// ===== STICKY NAVBAR =====
window.addEventListener("scroll", () => {
  header.style.background = window.scrollY > 40 ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)";
});

// ===== HAMBURGER MENU (DUA TOMBOL) =====
[hamburger1, hamburger2].forEach(btn => {
  btn?.addEventListener("click", () => navOverlay.classList.toggle("buka"));
});

// Tutup overlay saat link diklik
navOverlay.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navOverlay.classList.remove("buka"));
});

// ===== SMOOTH SCROLL =====
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const target = link.getAttribute("href");
    if (!target.startsWith("#")) return;
    e.preventDefault();
    const el = document.querySelector(target);
    if (!el) return;
    const offset = el.offsetTop - 60; // navbar height
    window.scrollTo({ top: offset, behavior: "smooth" });
  });
});

// ===== KEAHLIAN PROGRESS BAR =====
skillCards.forEach(card => {
  card.addEventListener("click", () => {
    const fill = card.querySelector(".progress-fill");
    const max = fill.style.getPropertyValue("--fill");
    fill.style.width = (fill.style.width === max ? "0%" : max);
  });
});

// ===== PROYEK TERBONGKAR =====
projectCards.forEach(card => {
  card.addEventListener("click", () => card.classList.toggle("terbuka"));
});