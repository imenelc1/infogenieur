document.addEventListener("DOMContentLoaded", () => {

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


  function afficherAnnee(annee) {

    const sections = document.querySelectorAll("[id^='annee']");
    sections.forEach((section) => {
      section.classList.remove('active');
      section.style.display = "none";
    });


    const anneeEl = document.getElementById("annee" + annee);
    if (anneeEl) {
      anneeEl.style.display = "block";
      setTimeout(() => {
        anneeEl.classList.add('active');
      }, 10);
    }


    const menuItems = document.querySelectorAll(".menu-list a");
    menuItems.forEach((item) => item.classList.remove("first"));
    if (menuItems[annee - 1]) {
      menuItems[annee - 1].classList.add("first");
    }


    const semesterButtons = anneeEl.querySelectorAll(".semester-button");
    const semesters = anneeEl.querySelectorAll(".semester");

    if (semesterButtons.length > 0) {
      const defaultSemester = semesterButtons[0].dataset.semester;
      showSemester(parseInt(defaultSemester, 10), anneeEl);
    } else {
      semesters.forEach((semester) => {
        semester.style.display = "flex";
        semester.classList.add("active");
      });
    }

    console.log("Affichage de l'année: " + annee, anneeEl);
  }



  window.afficherAnnee = afficherAnnee


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




  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("semester-button")) {
      const anneeEl = e.target.closest("[id^='annee']")
      const semesterNumber = Number.parseInt(e.target.dataset.semester, 10)
      showSemester(semesterNumber, anneeEl)
    }
  })


  const modules = document.querySelectorAll(".module")

 /* function checkModules() {
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
  window.addEventListener("resize", checkModules)*/

  function checkModules() {
    const triggerBottom = window.innerHeight * 0.8 // 80% of viewport height
  
    modules.forEach((module) => {
      const moduleTop = module.getBoundingClientRect().top
      const moduleBottom = module.getBoundingClientRect().bottom
  
      if (moduleTop < triggerBottom && moduleBottom > 0) {
        module.classList.add("visible")
      } else if (moduleBottom < 0 || moduleTop > window.innerHeight) {
        module.classList.remove("visible")
      }
    })
  }
  
  window.addEventListener("scroll", checkModules)
  window.addEventListener("resize", checkModules)
  
  // Initial check
  checkModules()
  const params = new URLSearchParams(window.location.search)
  const anneeParam = Number.parseInt(params.get("year"), 10)
  if (anneeParam) {
    afficherAnnee(anneeParam)
  } else {
    afficherAnnee(1)
  }


  const yearButtons = document.querySelectorAll(".year-button")
  yearButtons.forEach((button) => {
    button.addEventListener("click", () => {
      yearButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")
    })
  })
})


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


const semestreParam = getQueryParam("semestre");


const semesters = document.querySelectorAll(".semester");
semesters.forEach((semester) => {
  semester.style.display = "none";
});


if (semestreParam) {
  const selectedSemester = document.getElementById(`semestre${semestreParam}`);
  if (selectedSemester) {
    selectedSemester.style.display = "block";
  } else {
    console.error(`Semestre ${semestreParam} introuvable`);
  }
} else {

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

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height, particles;

function setup() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  particles = [];

  if (window.innerWidth < 600) {

    let numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        radius: Math.random() * 1 + 1
      });
    }
  } else {

    let numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        radius: Math.random() * 1.5 + 0.5
      });
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);


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


  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];


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



function initializeDrives() {
  const drives = [
    { name: "Drive Boumerdas cs engineering (3 years)", link: "https://drive.google.com/drive/folders/10iUDqie0O9xWEo8-d8Krdy0GKaIga3cA?fbclid=PAZXh0bgNhZW0CMTEAAaagGJjKPHLk5JA5MVsspc2OviF4YJcznJrFdEUu_xwZjPS0LlEUPlRP13I_aem_6uZeeOM3j2s36wH7pR_tFg" },
    { name: "Drive L1 MI", link: "https://drive.google.com/drive/folders/1EfFvop6o9OOgqvBoySC8OZ55DAh7k-ty?usp=drive_link" },
    { name: "Drive L2 MI SI", link: "https://drive.google.com/drive/folders/1NByp2j4kr9LZGJ4EQ5f7GEgd-zwEzR6j?usp=drive_link" },
    { name: "Drive L3 MI SI", link: "https://drive.google.com/drive/folders/1xaRFL5oqrMpzCLZU3neBidZvY_juM1gr?usp=drive_link" },
    { name: "Drive M2 GL", link: "https://drive.google.com/drive/folders/1m3PDzUqqLFqFLGGz-VkNkoVkb4CEgKuy?usp=drive_link" },
    { name: "Drive M1 GL", link: "https://drive.google.com/drive/folders/1t2eajW5ua87j3QzNelbTAdBhumgNUnjw?usp=drive_link" },
    { name: "Drive L1 MI & RN", link: "https://drive.google.com/drive/folders/1sZAcALRe5P7nr_Jpm2fOyYqLdO-WyKyL" },
    { name: "Drive L2 RN", link: "https://drive.google.com/drive/folders/1cqHY7Cm-sgKA8B8gD1qcWzvg7UlVV5rM" },
  ];

  const drivesGrid = document.getElementById('drivesGrid');
  if (drivesGrid) {
    drives.forEach((drive, index) => {
      const driveCard = document.createElement('a');
      driveCard.href = drive.link;
      driveCard.target = "_blank";
      driveCard.className = 'drive-card';
      driveCard.innerHTML = `
              <i class='bx bxs-folder'></i>
              <h4>${drive.name}</h4>
          `;

      drivesGrid.appendChild(driveCard);

      // Ajoute un délai pour chaque carte pour l'effet d'apparition progressif
      setTimeout(() => {
        driveCard.classList.add('show');
      }, index * 150); // Décalage de 150ms entre chaque carte
    });
  }
}

document.addEventListener('DOMContentLoaded', initializeDrives);
