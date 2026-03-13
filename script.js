// Custom cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();

document
  .querySelectorAll(
    "a, button, .project-card, .stat-card, .skill-item, .aspire-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "16px";
      cursor.style.height = "16px";
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "rgba(0,229,255,0.6)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(0,229,255,0.4)";
    });
  });

// Particles
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 1.5 + 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color =
      Math.random() > 0.7
        ? "#00e5ff"
        : Math.random() > 0.5
          ? "#a8ff78"
          : "#ffffff";
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function animParticles() {
  ctx.clearRect(0, 0, W, H);
  ctx.globalAlpha = 1;

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "#00e5ff";
        ctx.globalAlpha = (1 - dist / 100) * 0.08;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animParticles);
}
animParticles();

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
);

reveals.forEach((el) => observer.observe(el));

// Typewriter in hero tag
const tagEl = document.querySelector(".hero-tag");
const texts = [
  "Self-taught Developer & Creator",
  "Android & Web Builder",
  "Learning by Shipping",
  "Zero → One Mindset",
];
let ti = 0,
  ci = 0,
  deleting = false;
const tagSpan = document.createElement("span");
tagEl.appendChild(tagSpan);
tagEl.firstChild.remove();

function typewriter() {
  const txt = texts[ti];
  if (!deleting) {
    tagSpan.textContent = txt.substring(0, ci + 1);
    ci++;
    if (ci === txt.length) {
      deleting = true;
      setTimeout(typewriter, 2200);
      return;
    }
  } else {
    tagSpan.textContent = txt.substring(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      ti = (ti + 1) % texts.length;
    }
  }
  setTimeout(typewriter, deleting ? 40 : 80);
}
setTimeout(typewriter, 1500);
