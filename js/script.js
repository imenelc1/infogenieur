document.addEventListener("DOMContentLoaded", () => {
  // --- Gestion du menu ---
  const body = document.querySelector("body")
  const header = document.querySelector(".header")
  const navOpenBtn = document.querySelector(".navOpen-btn")
  const navCloseBtn = document.querySelector(".navClose-btn")

  if (header && navOpenBtn) {
    navOpenBtn.addEventListener("click", () => {
      header.classList.add("open")
      navOpenBtn.style.display = "none"
    })
  }

  if (header && navCloseBtn) {
    navCloseBtn.addEventListener("click", () => {
      header.classList.remove("open")
      body.style.overflowY = "scroll"
      navOpenBtn.style.display = "block"
    })
  }

  // --- Affichage des années et réinitialisation des semestres ---
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
  window.afficherAnnee = afficherAnnee

  // --- Gestion de l'affichage des semestres dans l'année active ---
  function showSemester(semesterNumber, anneeEl) {
    const semesterButtons = anneeEl.querySelectorAll(".semester-button");
    const semesters = anneeEl.querySelectorAll(".semester");
  
    semesters.forEach((semester) => {
      if (semester.id === "semestre" + semesterNumber) {
        semester.style.display = "flex";
        setTimeout(() => {
          semester.style.opacity = "1";
          semester.style.transform = "translateY(0)";
        }, 10);
        semester.classList.add("active");
      } else {
        semester.style.opacity = "0";
        semester.style.transform = "translateY(20px)";
        setTimeout(() => {
          semester.style.display = "none";
        }, 300);
        semester.classList.remove("active");
      }
    });
  
    semesterButtons.forEach((button) => {
      if (Number.parseInt(button.dataset.semester, 10) === semesterNumber) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }
  

  // Gestion des clics sur les boutons de semestre
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("semester-button")) {
      const anneeEl = e.target.closest("[id^='annee']")
      const semesterNumber = Number.parseInt(e.target.dataset.semester, 10)
      showSemester(semesterNumber, anneeEl)
    }
  })

  // --- Animation des modules ---
  const modules = document.querySelectorAll(".module")

  function checkModules() {
    const triggerBottom = (window.innerHeight / 5) * 4

    modules.forEach((module) => {
      const moduleTop = module.getBoundingClientRect().top

      if (moduleTop < triggerBottom) {
        module.classList.add("visible")
      } else {
        module.classList.remove("visible")
      }
    })
  }

  window.addEventListener("scroll", checkModules)
  window.addEventListener("resize", checkModules)

  // Initial check
  checkModules()

  // --- Initialisation sur chargement de la page ---
  const params = new URLSearchParams(window.location.search)
  const anneeParam = Number.parseInt(params.get("year"), 10)
  if (anneeParam) {
    afficherAnnee(anneeParam)
  } else {
    afficherAnnee(1)
  }

  // --- (Optionnel) Gestion des boutons d'année s'ils existent ailleurs ---
  const yearButtons = document.querySelectorAll(".year-button")
  yearButtons.forEach((button) => {
    button.addEventListener("click", () => {
      yearButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")
    })
  })
})

// Fonction pour récupérer la valeur d'un paramètre dans l'URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Récupérer le paramètre 'semestre' dans l'URL
const semestreParam = getQueryParam("semestre");

// Masquer tous les semestres au départ
const semesters = document.querySelectorAll(".semester");
semesters.forEach((semester) => {
  semester.style.display = "none"; // Cacher tous les semestres
});

// Afficher uniquement le semestre correspondant au paramètre
if (semestreParam) {
  const selectedSemester = document.getElementById(`semestre${semestreParam}`);
  if (selectedSemester) {
    selectedSemester.style.display = "block"; // Afficher le semestre sélectionné
  } else {
    console.error(`Semestre ${semestreParam} introuvable`);
  }
} else {
  // Si aucun paramètre 'semestre' n'est défini, afficher le semestre 1 par défaut
  const defaultSemester = document.getElementById("semestre1");
  if (defaultSemester) {
    defaultSemester.style.display = "block";
  }
}
const courseItems = document.querySelectorAll('.course-item');
    
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    courseItems.forEach(item => {
        observer.observe(item);
    });
    // Animation de fond
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    let width, height, particles;

    function setup() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
  
      particles = [];
      
      if (window.innerWidth < 600) {
          // Boucle différente pour les mobiles : moins de particules et une animation simplifiée
          let numParticles = 30; // Moins de particules pour améliorer la performance
          for (let i = 0; i < numParticles; i++) {
              particles.push({
                  x: Math.random() * width,
                  y: Math.random() * height,
                  vx: Math.random() * 0.5 - 0.25,
                  vy: Math.random() * 0.5 - 0.25,
                  radius: Math.random() * 1 + 1 // Moins de variation de taille
              });
          }
      } else {
          // Boucle standard pour les grands écrans
          let numParticles = 100;
          for (let i = 0; i < numParticles; i++) {
              particles.push({
                  x: Math.random() * width,
                  y: Math.random() * height,
                  vx: Math.random() * 0.5 - 0.25,
                  vy: Math.random() * 0.5 - 0.25,
                  radius: Math.random() * 1.5 + 0.5 // Taille plus variée pour les grands écrans
              });
          }
      }
  }
  
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Dessiner les connexions
        ctx.strokeStyle = 'rgba(100, 149, 237, 0.1)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i++) {
            let p1 = particles[i];
            p1.x += p1.vx;
            p1.y += p1.vy;
            
            if (p1.x < 0 || p1.x > width) p1.vx *= -1;
            if (p1.y < 0 || p1.y > height) p1.vy *= -1;
            
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p1.x - p2.x;
                let dy = p1.y - p2.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        // Dessiner les points lumineux
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            
            // Créer un dégradé radial pour chaque point
            let gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
            gradient.addColorStop(0, 'rgba(100, 149, 237, 0.8)');
            gradient.addColorStop(1, 'rgba(100, 149, 237, 0)');
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        
        requestAnimationFrame(draw);
    }

    setup();
    draw();

    window.addEventListener('resize', setup);
    