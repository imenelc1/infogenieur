const modules = document.querySelectorAll(".modul_rect");

function initializeModuleInteractions() {
  modules.forEach((module, index) => {
    module.addEventListener("mouseover", () => onModuleHover(module, index));
    module.addEventListener("mouseout", () => onModuleOut(module));
    module.addEventListener("click", () => onModuleClick(module, index));
  });
}

function onModuleHover(module, index) {
  module.style.transform = "scale(1.05)";
  module.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";

  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.innerText = `Module ${index + 1}`;
  document.body.appendChild(tooltip);

  const rect = module.getBoundingClientRect();
  tooltip.style.position = "absolute";
  tooltip.style.top = `${rect.top - 40}px`;
  tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2
    }px`;
}

function onModuleOut(module) {
  module.style.transform = "scale(1)";
  module.style.boxShadow = "none";

  const tooltip = document.querySelector(".tooltip");
  if (tooltip) tooltip.remove();
}
function onModuleClick(module, index) {
  alert(`Module ${index + 1} cliqué`);
}

initializeModuleInteractions();
