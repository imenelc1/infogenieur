const body = document.querySelector("body");
const header = document.querySelector(".header");
const navOpenBtn = document.querySelector(".navOpen-btn");
const navCloseBtn = document.querySelector(".navClose-btn");

if (header && navOpenBtn) {
  navOpenBtn.addEventListener("click", () => {
    header.classList.add("open");
    //body.style.overflowY = "hidden";
    navOpenBtn.style.display = "none";
  });
}

if (header && navCloseBtn) {
  navCloseBtn.addEventListener("click", () => {
    header.classList.remove("open");
    body.style.overflowY = "scroll";
    navOpenBtn.style.display = "block";
  });
}

function afficherAnnee(annee) {
  let sections = document.querySelectorAll(".annee");
  sections.forEach((section) => (section.style.display = "none"));

  const anneeEl = document.getElementById("annee" + annee);
  if (anneeEl) {
    anneeEl.style.display = "block";
  }

  let menuItems = document.querySelectorAll(".menu-list a");
  menuItems.forEach((item) => item.classList.remove("first"));

  if (menuItems[annee - 1]) {
    menuItems[annee - 1].classList.add("first");
  }

  let nextButton = document.querySelector(".explore");
  if (nextButton) {
    if (annee === 5) {
      nextButton.style.display = "none";
    } else {
      nextButton.style.display = "block";
    }
  }
}

const params = new URLSearchParams(window.location.search);
const annee = parseInt(params.get("year"), 10);

if (annee) {
  afficherAnnee(annee);
} else {
  afficherAnnee(1);
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("circuitCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Nettoyage pour éviter les artefacts visuels

  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function createGlowEffect(color, blur) {
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  function resetShadow() {
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
  }

  let animationProgress = 0;

  function drawCircuitLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;

    // Draw central line with glow
    createGlowEffect("#0066ff", 10);
    ctx.strokeStyle = "rgba(0, 102, 255, 0.3)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    resetShadow();

    // Draw animated central line gradient
    const gradient = ctx.createLinearGradient(
      centerX,
      0,
      centerX,
      canvas.height
    );
    gradient.addColorStop(
      Math.max(0, animationProgress - 0.1),
      "rgba(0, 102, 255, 0)"
    );
    gradient.addColorStop(animationProgress, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(
      Math.min(1, animationProgress + 0.1),
      "rgba(0, 102, 255, 0)"
    );

    createGlowEffect("#fff", 15);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    resetShadow();

    // Draw PCB-style circuit lines
    const modules = document.querySelectorAll(".module");

    modules.forEach((module, index) => {
      const rect = module.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();

      const moduleX = rect.x - canvasRect.x + rect.width / 2;
      const moduleY = rect.y - canvasRect.y + rect.height / 2;

      const isLeft = moduleX < centerX;
      const direction = isLeft ? -1 : 1;

      // Draw base circuit path
      createGlowEffect("#0066ff", 5);
      ctx.strokeStyle = "rgba(0, 102, 255, 0.3)";
      ctx.lineWidth = 3;

      // Complex PCB-style path
      ctx.beginPath();
      ctx.moveTo(centerX, moduleY);

      // Calculate control points for the path
      const midX = centerX + (moduleX - centerX) * 0.5;
      const offset1 = 30 * Math.sin(moduleY / 50);
      const offset2 = 20 * Math.cos(moduleY / 40);

      // Draw main connection line with angles

      ctx.lineTo(moduleX, moduleY);


      ctx.stroke();
      resetShadow();

      // Draw glowing endpoints
      createGlowEffect("#fff", 10);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(moduleX, moduleY, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, moduleY, 3, 0, Math.PI * 2);
      ctx.fill();
      resetShadow();

      // Add decorative elements
      const smallDotCount = 6;
      for (let i = 0; i < smallDotCount; i++) {
        const dotX = moduleX + direction * (i + 1) * 8;
        ctx.beginPath();
        ctx.arc(dotX, moduleY, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 102, 255, 0.5)";
        ctx.fill();
      }

      // Animate side lines
      const sideLineProgress =
        (animationProgress - index / modules.length + 1) % 1;
      if (sideLineProgress >= 0 && sideLineProgress <= 1) {
        const gradientSide = ctx.createLinearGradient(
          centerX,
          moduleY,
          moduleX,
          moduleY
        );
        gradientSide.addColorStop(
          Math.max(0, sideLineProgress - 0.1),
          "rgba(0, 102, 255, 0)"
        );
        gradientSide.addColorStop(sideLineProgress, "rgba(255, 255, 255, 1)");
        gradientSide.addColorStop(
          Math.min(1, sideLineProgress + 0.1),
          "rgba(0, 102, 255, 0)"
        );

        createGlowEffect("#fff", 10);
        ctx.strokeStyle = gradientSide;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX, moduleY);
        ctx.lineTo(moduleX, moduleY);
        ctx.stroke();
        resetShadow();

        // Highlight the module
        if (sideLineProgress >1 ) {
          module.classList.add("highlight");
        } else {
          module.classList.remove("highlight");
        }
      } else {
        module.classList.remove("highlight");
      }
    });

    animationProgress += 0.005;
    if (animationProgress > 1) animationProgress = 0;
  }

  function animate() {
    drawCircuitLines();
    requestAnimationFrame(animate);
  }

  animate();

  // Handle year button clicks
  const yearButtons = document.querySelectorAll(".year-button");
  yearButtons.forEach((button) => {
    button.addEventListener("click", () => {
      yearButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});
