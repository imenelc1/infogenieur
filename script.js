const body = document.querySelector('body');
const header = body.querySelector('.header');
const navOpenBtn = body.querySelector('.navOpen-btn');

if (header && navOpenBtn) {
  navOpenBtn.addEventListener("click", () => {
    header.classList.toggle("open"); // Ajouter/enlever la classe "open"
    body.style.overflowY = header.classList.contains("open") ? "hidden" : "auto"; // Désactiver le défilement si le menu est ouvert
  });
}