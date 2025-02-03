// Sélectionnez tous les modules rectangulaires
const modules = document.querySelectorAll('.modul_rect');

// Fonction d'initialisation d'interactions pour chaque module
function initializeModuleInteractions() {
  modules.forEach((module, index) => {
    module.addEventListener('mouseover', () => onModuleHover(module, index));
    module.addEventListener('mouseout', () => onModuleOut(module));
    module.addEventListener('click', () => onModuleClick(module, index));
  });
}

// Fonction exécutée lors du survol d'un module
function onModuleHover(module, index) {
  module.style.transform = 'scale(1.05)';
  module.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
  
  // Affichage d'une info-bulle
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.innerText = `Module ${index + 1}`;
  document.body.appendChild(tooltip);

  // Positionnement de l'info-bulle au-dessus du module
  const rect = module.getBoundingClientRect();
  tooltip.style.position = 'absolute';
  tooltip.style.top = `${rect.top - 40}px`;
  tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
}

// Fonction exécutée lorsque le survol d'un module est terminé
function onModuleOut(module) {
  module.style.transform = 'scale(1)';
  module.style.boxShadow = 'none';

  
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) tooltip.remove();
}
function onModuleClick(module, index) {
  alert(`Module ${index + 1} cliqué`);

}

// Initialisation des interactions
initializeModuleInteractions();