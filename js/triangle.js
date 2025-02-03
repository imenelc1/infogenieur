const triangleContainer = document.getElementById('triangleContainer');

const triangleConfigs = [
  { class: 'triangle1', width: 84, height: 78, gradientId: 'paint0_linear_113_462' },
  { class: 'triangle2', width: 84, height: 78, gradientId: 'paint1_linear_113_462' },
  { class: 'triangle3', width: 84, height: 78, gradientId: 'paint0_linear_113_462' },
  { class: 'triangle4', width: 42, height: 43, gradientId: 'paint0_linear_113_464' },
  { class: 'triangle5', width: 37, height: 32, gradientId: 'paint0_linear_113_470' },
  { class: 'triangle6', width: 36, height: 31, gradientId: 'paint0_linear_113_468' },
  { class: 'triangle7', width: 38, height: 29, gradientId: 'paint0_linear_113_467' },
  { class: 'triangle8', width: 37, height: 31, gradientId: 'paint0_linear_113_469' },
  { class: 'triangle9', width: 38, height: 29, gradientId: 'paint0_linear_113_467' },
  { class: 'triangle10', width: 40, height: 46, gradientId: 'paint0_linear_113_465' },
  { class: 'triangle11', width: 40, height: 46, gradientId: 'paint0_linear_113_465' },
];

triangleConfigs.forEach(({ class: className, width, height, gradientId }) => {
  const svg = `
    <svg class="triangle ${className}" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
      <path opacity="0.3" d="M0 0L${width} ${height}L0 ${height}Z" fill="url(#${gradientId})" fill-opacity="0.2"/>
      <defs>
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
          <stop stop-color="#8854E1"/>
          <stop offset="1" stop-color="#13C4FA"/>
        </linearGradient>
      </defs>
    </svg>
  `;
  triangleContainer.innerHTML += svg;
});