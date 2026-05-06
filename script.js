const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Try common local profile image names automatically
const profileImage = document.querySelector(".profile-photo");
if (profileImage) {
  const imageCandidates = ["profile.jpg", "profile.png", "profile.jpeg", "Profile.jpg", "Profile.png"];
  let candidateIndex = 0;

  profileImage.addEventListener("error", () => {
    candidateIndex += 1;
    if (candidateIndex < imageCandidates.length) {
      profileImage.src = imageCandidates[candidateIndex];
    }
  });
}

// Scroll progress bar
const progressBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const width = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${width}%`;
});

// Reveal animations
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach((el) => observer.observe(el));

// Typing effect
const typedEl = document.getElementById("typed-text");
const words = [
  "secure applications",
  "AI-powered systems",
  "real-world projects",
  "data-driven solutions",
];
let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedEl) return;
  const current = words[wordIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, letterIndex + 1);
    letterIndex += 1;
    if (letterIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, letterIndex - 1);
    letterIndex -= 1;
    if (letterIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

// Lightweight neon particles background
const canvas = document.getElementById("bg-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const particles = [];
  const count = 70;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.5,
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,255,136,0.8)";
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
}
