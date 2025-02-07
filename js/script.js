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
    const semesterButtons = anneeEl.querySelectorAll(".semester-button")
    const semesters = anneeEl.querySelectorAll(".semester")

    semesters.forEach((semester) => {
      if (semester.id === "semestre" + semesterNumber) {
        semester.style.display = "flex"
        semester.classList.add("active")
      } else {
        semester.style.display = "none"
        semester.classList.remove("active")
      }
    })

    semesterButtons.forEach((button) => {
      if (Number.parseInt(button.dataset.semester, 10) === semesterNumber) {
        button.classList.add("active")
      } else {
        button.classList.remove("active")
      }
    })
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

