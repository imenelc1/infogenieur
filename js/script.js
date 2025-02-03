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

////////////////////////////////
// Fonction pour charger le fichier HTML `media786.html`
/*function chargerMediaSection() {
  const sectionContainer = document.getElementById('section-container'); // Sélectionnez où le contenu sera injecté
  console.log("Tentative de chargement de media_767.html...");
  //fetch('D:/Users/mbi/Desktop/html;css/infogenieurr/html/media_767.html')//// Chemin du fichier à charger//
  fetch('/html/media_786.html')
  .then(response => {
      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status); // En cas de réponse non valide
      }
      return response.text();
    })
    .then(data => {
      sectionContainer.innerHTML = data; // Injecte le contenu dans le conteneur
    })
    .catch(error => console.error("Erreur lors du chargement:", error.message, error)); // Gère les erreurs de chargement
}*/

function chargerMediaSection() {
  const sectionContainer = document.getElementById('section-container');
  console.log("Tentative de chargement de media_767.html...");

  // Utilisez l'URL locale
  function chargerMediaSection() {
    const sectionContainer = document.getElementById('section-container');
    console.log("Tentative de chargement de media_767.html...");
  
    // URL locale générée par Live Server
    function chargerMediaSection() {
      const sectionContainer = document.getElementById('section-container');
      console.log("Tentative de chargement de media_767.html...");
    
      // Utiliser le chemin relatif avec Live Server
      fetch('/html/media786.html')
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
          }
          return response.text();
        })
        .then(data => {
          sectionContainer.innerHTML = data;
        })
        .catch(error => console.error("Erreur lors du chargement:", error.message, error));
    }
    
  }
}
// Vérifiez si la largeur de l'écran est inférieure ou égale à 767px
if (window.matchMedia("(max-width: 767px)").matches) {
  console.log("Condition de média remplie (max-width: 767px)");
  chargerMediaSection();
} else {
  console.log("Condition de média non remplie");
}