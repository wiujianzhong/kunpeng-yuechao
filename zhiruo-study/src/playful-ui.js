let activeMascot = null;
let lastSparkleAt = 0;
let lastPointer = { x: 0, y: 0 };

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");
const sparkleColors = ["#ff79aa", "#ffc95f", "#65b8ff", "#77d8b2", "#9a87ff"];

export function initPlayfulUI() {
  if (document.documentElement.dataset.playfulReady) return;
  document.documentElement.dataset.playfulReady = "true";

  if (!finePointer.matches || reducedMotion.matches) return;

  const cursor = document.createElement("div");
  cursor.className = "star-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = "<i></i><b></b>";
  document.body.append(cursor);
  document.documentElement.classList.add("has-star-cursor");

  document.addEventListener("pointermove", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    cursor.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
    cursor.classList.add("visible");
    moveMascotEyes(x, y);

    const distance = Math.hypot(x - lastPointer.x, y - lastPointer.y);
    const now = Date.now();
    if (distance > 14 && now - lastSparkleAt > 48) {
      createCursorSparkle(x, y);
      lastSparkleAt = now;
      lastPointer = { x, y };
    }
  }, { passive: true });

  document.addEventListener("pointerover", (event) => {
    cursor.classList.toggle("hovering", Boolean(event.target.closest("button, a, input, textarea, select, [role='button']")));
  });

  document.addEventListener("pointerleave", () => cursor.classList.remove("visible"));
}

export function refreshPlayfulUI(root = document) {
  activeMascot = root.querySelector(".study-mascot");
  document.body.dataset.page = window.location.hash.replace("#", "") || "home";
}

export function celebrateSuccess() {
  if (reducedMotion.matches) return;
  const burst = document.createElement("div");
  burst.className = "success-burst";
  burst.setAttribute("aria-hidden", "true");

  for (let index = 0; index < 14; index += 1) {
    const particle = document.createElement("i");
    const angle = (Math.PI * 2 * index) / 14;
    const distance = 72 + (index % 3) * 20;
    particle.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--burst-color", sparkleColors[index % sparkleColors.length]);
    particle.style.setProperty("--burst-delay", `${(index % 4) * 25}ms`);
    burst.append(particle);
  }

  document.body.append(burst);
  document.body.classList.add("celebrating");
  window.setTimeout(() => {
    burst.remove();
    document.body.classList.remove("celebrating");
  }, 1050);
}

function createCursorSparkle(x, y) {
  const sparkle = document.createElement("i");
  sparkle.className = "cursor-sparkle";
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkle.style.setProperty("--sparkle-color", sparkleColors[Math.floor(Math.random() * sparkleColors.length)]);
  sparkle.style.setProperty("--sparkle-drift", `${Math.round(Math.random() * 22 - 11)}px`);
  document.body.append(sparkle);
  sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
}

function moveMascotEyes(x, y) {
  if (!activeMascot) return;
  const bounds = activeMascot.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;
  const offsetX = Math.max(-2.5, Math.min(2.5, (x - centerX) / 90));
  const offsetY = Math.max(-2, Math.min(2, (y - centerY) / 100));
  activeMascot.style.setProperty("--eye-x", `${offsetX}px`);
  activeMascot.style.setProperty("--eye-y", `${offsetY}px`);
}
