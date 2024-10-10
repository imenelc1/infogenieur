

const body = document.querySelector('body');
const header = body.querySelector('.header');
const navOpenBtn = body.querySelector('.navOpen-btn');

if (header && navOpenBtn) {
  navOpenBtn.addEventListener("click", () => {
    header.classList.toggle("open"); // Ajouter/enlever la classe "open"
    body.style.overflowY = header.classList.contains("open") ? "hidden" : "auto"; // Désactiver le défilement si le menu est ouvert
  });
}
function afficherAnnee(annee) {
  // Masquer toutes les années
  let sections = document.querySelectorAll('.annee');
  sections.forEach(section => section.style.display = 'none');

  // Afficher l'année sélectionnée
  document.getElementById('annee' + annee).style.display = 'block';

  // Sélectionner tous les liens de navigation
  let menuItems = document.querySelectorAll('.menu-list a');

  // Supprimer la classe 'first' de tous les liens
  menuItems.forEach(item => item.classList.remove('first'));

  // Ajouter la classe 'first' au lien cliqué
  menuItems[annee - 1].classList.add('first');

  // Masquer ou afficher le bouton "Next"
  let nextButton = document.querySelector('.explore');
  if (annee === 5) {
    nextButton.style.display = 'none'; // Cache le bouton "Next" pour la 5e année
  } else {
    nextButton.style.display = 'block'; // Affiche le bouton "Next" pour les autres années
  }
}



  // Afficher la section correspondante à l'année cliquée
  document.getElementById('annee' + annee).style.display = 'block';

  // Cacher le bouton "Next" dans la 5ème année
  if (annee === 5) {
    document.querySelector('.explore').style.display = 'none';
  } else {
    document.querySelector('.explore').style.display = 'block';
  }

