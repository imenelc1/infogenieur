const body = document.querySelector('body');
const header = document.querySelector('.header');
const navOpenBtn = document.querySelector('.navOpen-btn');
const navCloseBtn = document.querySelector('.navClose-btn');

// Ouvrir le menu
if (header && navOpenBtn) {
  navOpenBtn.addEventListener("click", () => {
    header.classList.add("open");
    body.style.overflowY = "hidden";
    navOpenBtn.style.display = "none"; // Masquer le bouton navOpen
  });
}

// Fermer le menu
if (header && navCloseBtn) {
  navCloseBtn.addEventListener("click", () => {
    header.classList.remove("open");
    body.style.overflowY = "scroll";
    navOpenBtn.style.display = "block"; // Afficher à nouveau le bouton navOpen
  });
}


// Fonction pour afficher l'année en fonction de l'ID passé
function afficherAnnee(annee) {
  // Masquer toutes les années
  let sections = document.querySelectorAll('.annee');
  sections.forEach(section => section.style.display = 'none');

  // Afficher l'année sélectionnée
  const anneeEl = document.getElementById('annee' + annee);
  if (anneeEl) {
    anneeEl.style.display = 'block';
  }

  // Supprimer la classe 'first' de tous les liens
  let menuItems = document.querySelectorAll('.menu-list a');
  menuItems.forEach(item => item.classList.remove('first'));

  // Ajouter la classe 'first' au lien correspondant à l'année
  if (menuItems[annee - 1]) {
    menuItems[annee - 1].classList.add('first');
  }

  // Masquer ou afficher le bouton "Next"
  let nextButton = document.querySelector('.explore');
  if (nextButton) {
    if (annee === 5) {
      nextButton.style.display = 'none'; // Cache le bouton "Next" pour la 5e année
    } else {
      nextButton.style.display = 'block'; // Affiche le bouton "Next" pour les autres années
    }
  }
}

// Lire l'URL pour obtenir le paramètre 'year'
const params = new URLSearchParams(window.location.search);
const annee = parseInt(params.get('year'), 10);

// Appeler la fonction pour afficher l'année sélectionnée
if (annee) {
  afficherAnnee(annee);
} else {
  // Si aucune année n'est passée, afficher la première année par défaut
  afficherAnnee(1);
}
