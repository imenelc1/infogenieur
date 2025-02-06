// Sélection des éléments du DOM
const body = document.querySelector("body");
const header = document.querySelector(".header");
const navOpenBtn = document.querySelector(".navOpen-btn");
const navCloseBtn = document.querySelector(".navClose-btn");

// Gestion de l'ouverture et fermeture du menu de navigation
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
  // Masquer toutes les sections d'années
  const sections = document.querySelectorAll("[id^='annee']");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Afficher uniquement l'année sélectionnée
  const anneeEl = document.getElementById("annee" + annee);
  if (anneeEl) {
    anneeEl.style.display = "block";
  }

  // Mettre à jour l'état actif du menu
  const menuItems = document.querySelectorAll(".menu-list a");
  menuItems.forEach((item) => item.classList.remove("first"));
  if (menuItems[annee - 1]) {
    menuItems[annee - 1].classList.add("first");
  }

  // Gérer l'affichage des semestres dans l'année active
  // On recherche les boutons et les conteneurs de semestres uniquement dans anneeEl
  const semesterButtons = anneeEl.querySelectorAll(".semester-button");
  const semesters = anneeEl.querySelectorAll(".semester");

  if (semesterButtons.length > 0) {
    // S'il y a des boutons, on affiche par défaut le premier semestre du conteneur
    // Pour l'année 1, le premier semestre correspond à "Semestre 1"
    // Pour l'année 2, le premier bouton correspond à "Semester 3"
    // On récupère le numéro indiqué dans l'attribut data-semester et on affiche le bon conteneur
    const defaultSemester = semesterButtons[0].dataset.semester;
    showSemester(parseInt(defaultSemester, 10), anneeEl);
  } else {
    // Sinon, on affiche tous les semestres présents
    semesters.forEach((semester) => {
      semester.style.display = "flex";
      semester.classList.add("active");
    });
  }

  console.log("Affichage de l'année: " + annee, anneeEl);
}

// Rendre la fonction accessible globalement (pour les onclick dans le HTML)
window.afficherAnnee = afficherAnnee;

// --- Gestion de l'affichage des semestres dans l'année active ---
function showSemester(semesterNumber, anneeEl) {
  const semesterButtons = anneeEl.querySelectorAll(".semester-button");
  const semesters = anneeEl.querySelectorAll(".semester");

  semesters.forEach((semester) => {
    // On se base sur l'ID pour associer le bon semestre
    // Exemple : pour semesterNumber 1 (année 1) on attend l'élément avec id "semestre1"
    // Pour semesterNumber 3 (année 2), l'élément a l'id "semestre3"
    if (semester.id === "semestre" + semesterNumber) {
      semester.style.display = "flex";
      semester.classList.add("active");
    } else {
      semester.style.display = "none";
      semester.classList.remove("active");
    }
  });

  semesterButtons.forEach((button) => {
    if (parseInt(button.dataset.semester, 10) === semesterNumber) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// Lorsqu'un bouton de semestre est cliqué, on gère l'affichage dans son conteneur d'année
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("semester-button")) {
    const anneeEl = e.target.closest("[id^='annee']");
    const semesterNumber = parseInt(e.target.dataset.semester, 10);
    showSemester(semesterNumber, anneeEl);
  }
});

// --- Initialisation sur chargement de la page ---
const params = new URLSearchParams(window.location.search);
const anneeParam = parseInt(params.get("year"), 10);
if (anneeParam) {
  afficherAnnee(anneeParam);
} else {
  afficherAnnee(1);
}

// Gestion du canvas et des animations
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("circuitCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
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

  // Dessiner les lignes du circuit
  function drawCircuitLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;

    // Dessiner la ligne centrale avec effet de lueur
    createGlowEffect("#0066ff", 10);
    ctx.strokeStyle = "rgba(0, 102, 255, 0.3)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    resetShadow();

    // Dessiner la ligne centrale animée avec un gradient
    const gradient = ctx.createLinearGradient(centerX, 0, centerX, canvas.height);
    gradient.addColorStop(Math.max(0, animationProgress - 0.1), "rgba(0, 102, 255, 0)");
    gradient.addColorStop(animationProgress, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(Math.min(1, animationProgress + 0.1), "rgba(0, 102, 255, 0)");

    createGlowEffect("#fff", 15);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    resetShadow();

    // Mise à jour des positions des modules lors du redimensionnement de la fenêtre
    window.addEventListener("resize", () => {
      requestAnimationFrame(updateModulePositions);
    });

    function updateModulePositions() {
      modules.forEach((module, index) => {
        const rect = module.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(module);

        // Vérifier si le module est caché ou invalide
        if (computedStyle.display === "none" || computedStyle.visibility === "hidden" || rect.width === 0 || rect.height === 0) {
          return;
        }

        const moduleX = rect.x - canvasRect.x + rect.width / 2;
        const moduleY = rect.y - canvasRect.y + rect.height / 2;

        module.dataset.moduleX = moduleX;
        module.dataset.moduleY = moduleY;
      });

      redrawConnections();
    }

    function redrawConnections() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      modules.forEach((module, index) => {
        if (!module.dataset.moduleX || !module.dataset.moduleY) return;

        const moduleX = parseFloat(module.dataset.moduleX);
        const moduleY = parseFloat(module.dataset.moduleY);

        ctx.beginPath();
        ctx.moveTo(centerX, moduleY);
        ctx.lineTo(moduleX, moduleY);
        ctx.stroke();
      });
    }

    // Dessiner les lignes de circuit de style PCB
    const modules = document.querySelectorAll(".module");

    modules.forEach((module, index) => {
      const rect = module.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(module);

      if (computedStyle.display === "none" || computedStyle.visibility === "hidden" || rect.width === 0 || rect.height === 0) {
        console.warn(`Module ${index} ignoré (invisible ou sans dimensions valides).`);
        return;
      }

      if (isNaN(rect.x) || isNaN(rect.y)) {
        console.error(`Module ${index} a des coordonnées invalides.`);
        return;
      }

      if (rect.x + rect.width < 0 || rect.y + rect.height < 0 || rect.x > window.innerWidth || rect.y > window.innerHeight) {
        console.warn(`Module ${index} est hors écran.`);
        return;
      }

      const moduleX = rect.x - canvasRect.x + rect.width / 2;
      const moduleY = rect.y - canvasRect.y + rect.height / 2;

      const isLeft = moduleX < centerX;
      const direction = isLeft ? -1 : 1;

      createGlowEffect("#0066ff", 5);
      ctx.strokeStyle = "rgba(0, 102, 255, 0.3)";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(centerX, moduleY);
      ctx.lineTo(moduleX, moduleY);
      ctx.stroke();
      resetShadow();

      createGlowEffect("#fff", 10);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(moduleX, moduleY, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, moduleY, 3, 0, Math.PI * 2);
      ctx.fill();
      resetShadow();

      const smallDotCount = 6;
      for (let i = 0; i < smallDotCount; i++) {
        const dotX = moduleX + direction * (i + 1) * 8;
        ctx.beginPath();
        ctx.arc(dotX, moduleY, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 102, 255, 0.5)";
        ctx.fill();
      }

      const sideLineProgress = (animationProgress - index / modules.length + 1) % 1;
      if (sideLineProgress >= 0 && sideLineProgress <= 1) {
        const gradientSide = ctx.createLinearGradient(centerX, moduleY, moduleX, moduleY);
        gradientSide.addColorStop(Math.max(0, sideLineProgress - 0.1), "rgba(0, 102, 255, 0)");
        gradientSide.addColorStop(sideLineProgress, "rgba(255, 255, 255, 1)");
        gradientSide.addColorStop(Math.min(1, sideLineProgress + 0.1), "rgba(0, 102, 255, 0)");

        createGlowEffect("#fff", 10);
        ctx.strokeStyle = gradientSide;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX, moduleY);
        ctx.lineTo(moduleX, moduleY);
        ctx.stroke();
        resetShadow();

        if (sideLineProgress > 1) {
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

  // Fonction d'animation principale
  function animate() {
    drawCircuitLines();
    requestAnimationFrame(animate);
  }

  animate();

  // Gestion des boutons de sélection d'année
  const yearButtons = document.querySelectorAll(".year-button");
  yearButtons.forEach((button) => {
    button.addEventListener("click", () => {
      yearButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Gestion des boutons de semestre
  const semesterButtons = document.querySelectorAll(".semester-button");
  const semesters = document.querySelectorAll(".semester");

  function showSemester(semesterNumber) {
    semesters.forEach((semester, index) => {
      if (index + 1 === semesterNumber) {
        semester.classList.add("active");
        semester.style.display = "flex";
      } else {
        semester.classList.remove("active");
        semester.style.display = "none";
      }
    });

    semesterButtons.forEach((button, index) => {
      if (index + 1 === semesterNumber) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  semesterButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showSemester(index + 1);
    });
  });

  // Initialisation avec le premier semestre actif
  showSemester(1);
});