const categories = [
  {
    id: "comprendre",
    label: "Comprendre",
    items: [
      {
        type: "pdf",
        url: "Projets/Lyannaj.png",
        full: "Projets/Lyannaj.pdf",
        name: "Business Model Canva",
        description: "Réalisation du business model canva d'un projet fictif innovant.",
        tags: ["comprendre", "concevoir", "entreprendre"],
        year: "2025",
      },
      {
        type: "image",
        url: "Projets/Carré tropical logo.jpg",
        full: "Projets/Stats.png",
        name: "Gestion du compte Instagram de Carré Tropical",
        description: "Animation du compte Instagram de Carré Tropical. Analyse des statistiques et des performances.",
        tags: ["comprendre", "concevoir", "entreprendre"],
        year: "2024",
      },
      {
        type: "pdf",
        url: "Projets/Newsletter.png",
        full: "Projets/Newsletter.pdf",
        name: "Newsletter",
        description: "Newsletter visant à promouvoir les activités de Carré Tropical",
        tags: ["Concevoir", "Exprimer", "Comprendre"],
        year: "2026",
      },
    ],
  },
  {
    id: "concevoir",
    label: "Concevoir",
    items: [
      {
        type: "pdf",
        url: "Projets/Lyannaj.png",
        full: "Projets/Lyannaj.pdf",
        name: "Business Model Canva",
        description: "Réalisation du business model canva d'un projet fictif innovant.",
        tags: ["comprendre", "concevoir", "entreprendre"],
        year: "2025",
      },
      {
        type: "image",
        url: "Projets/Carré tropical logo.jpg",
        full: "Projets/Stats.png",
        name: "Gestion du compte Instagram de Carré Tropical",
        description: "Animation du compte Instagram de Carré Tropical. Analyse des statistiques et des performances.",
        tags: ["comprendre", "concevoir", "entreprendre"],
        year: "2024",
      },
      {
        type: "video",
        url: "videos/Pourquoi choisir carré tropical.mp4",
        thumbnail: "Projets/Miniature carré tropical.png",
        name: "Vidéo Carré Tropical",
        description: "Vidéo de présentation réalisée pour promouvoir les services de Carré Tropical, une agence événementielle. Montage et habillage graphique.",
        tags: ["Exprimer", "Concevoir"],
        year: "2026",
      },
      {
        type: "pdf",
        url: "Projets/Newsletter.png",
        full: "Projets/Newsletter.pdf",
        name: "Newsletter",
        description: "Newsletter visant à promouvoir les activités de Carré Tropical",
        tags: ["Concevoir", "Exprimer", "Comprendre"],
        year: "2026",
      },
    ],
  },
  {
    id: "exprimer",
    label: "Exprimer",
    items: [
      {
        type: "video",
        url: "videos/Pourquoi choisir carré tropical.mp4",
        thumbnail: "Projets/Miniature carré tropical.png",
        name: "Vidéo Carré Tropical",
        description: "Vidéo de présentation réalisée pour promouvoir les services de Carré Tropical, une agence événementielle. Montage et habillage graphique.",
        tags: ["Exprimer", "Concevoir"],
        year: "2026",
      },
      {
        type: "image",
        url: "Projets/Post.png",
        full: "Projets/Post.png",
        name: "Post Instagram",
        description: "Conception d'un post instagram pour l'annonce d'un jeu concours. Visuel accrocheur.",
        tags: ["Exprimer"],
        year: "2026",
      },
      {
        type: "pdf",
        url: "Projets/Newsletter.png",
        full: "Projets/Newsletter.pdf",
        name: "Newsletter",
        description: "Newsletter visant à promouvoir les activités de Carré Tropical",
        tags: ["Concevoir", "Exprimer", "Comprendre"],
        year: "2026",
      },
    ],
  },
  {
    id: "entreprendre",
    label: "Entreprendre",
    items: [
      {
        type: "pdf",
        url: "Projets/Lyannaj.png",
        full: "Projets/Lyannaj.pdf",
        name: "Business Model Canva",
        description: "Réalisation du business model canva d'un projet fictif innovant.",
        tags: ["comprendre", "concevoir", "entreprendre"],
        year: "2025",
      },
      {
        type: "pdf",
        url: "Projets/PPP.png",       // vignette affichée dans la grille
        full: "Projets/Dossier PPP.pdf",             // ← remplace par ton vrai chemin PDF
        name: "Projet Personnel et Professionnel",
        description: "Dossier de Projet Personnel et Professionnel réalisé en 2ème année de BUT MMI. Réflexion sur mon orientation, mes compétences et mes ambitions professionnelles.",
        tags: ["Entreprendre"],
        year: "2025",
      },
      {
        type: "image",
        url: "Projets/Carré tropical logo.jpg",
        full: "Projets/Stats.png",
        name: "Gestion du compte Instagram de Carré Tropical",
        description: "Animation du compte Instagram de Carré Tropical. Analyse des statistiques et des performances.",
        tags: ["comprendre", "concevoir", "entreprendre"],
        year: "2024",
      },
    ],
  },
  {
    id: "Developper",
    label: "Développer",
    items: [

    ],
  },
];

/* ── État actif ── */
let activeId = "comprendre";

/* ── Référence vers la carte qui a ouvert la modale (pour y remettre le focus) ── */
let lastFocusedCard = null;

/* ============================================================
   BOUTONS DE FILTRE
   ============================================================ */
function renderButtons() {
  const bar = document.getElementById("btnBar");
  bar.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className =
      "filter-btn" + (cat.id === activeId ? " active-" + cat.id : "");
    btn.setAttribute("aria-pressed", cat.id === activeId ? "true" : "false");
    btn.textContent = cat.label;

    /* Clic souris */
    btn.addEventListener("click", () => {
      activeId = cat.id;
      render();
    });

    /* Clavier : Enter et Espace déclenchent le filtre */
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();   // évite le scroll sur Espace
        activeId = cat.id;
        render();
      }
    });

    bar.appendChild(btn);
  });
}

/* ============================================================
   GALERIE
   ============================================================ */
function renderGallery() {
  const grid = document.getElementById("gallery");
  grid.innerHTML = "";
  const cat = categories.find((c) => c.id === activeId);

  cat.items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "Voir " + item.name);

    /* Choix de la vignette selon le type */
    const thumbSrc =
      item.type === "video" ? item.thumbnail :
      item.type === "pdf"   ? item.url :       // vignette PNG pour les PDF
      item.url;

    /* Badge de type */
    const badge =
      item.type === "video" ? '<span class="card-badge badge-video">▶ Vidéo</span>' :
      item.type === "pdf"   ? '<span class="card-badge badge-pdf">PDF</span>' :
      "";

    card.innerHTML = `
      <div class="card-img-wrap">
        <div class="skeleton"></div>
        ${badge}
        <img src="${thumbSrc}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="card-label">${item.name}</div>
    `;

    const img      = card.querySelector("img");
    const skeleton = card.querySelector(".skeleton");

    if (thumbSrc) {
      img.addEventListener("load",  () => skeleton.remove());
      img.addEventListener("error", () => skeleton.remove());
    } else {
      skeleton.remove();
    }

    card.addEventListener("click", () => {
      lastFocusedCard = card;
      openModal(item);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();   // évite le scroll sur Espace
        lastFocusedCard = card;
        openModal(item);
      }
    });

    grid.appendChild(card);
  });
}

function render() {
  renderButtons();
  renderGallery();
}

/* ============================================================
   MODALE  –  layout côte à côte
   ============================================================ */
const overlay  = document.getElementById("modalOverlay");
const closeBtn = document.getElementById("modalClose");

function buildModalContent(item) {
  const mediaZone = document.getElementById("modalMedia");
  const infoZone  = document.getElementById("modalInfo");

  /* ── ZONE GAUCHE : média ── */
  mediaZone.innerHTML = "";

  if (item.type === "video") {
    if (item.url) {
      const video = document.createElement("video");
      video.src      = item.url;
      video.controls = true;
      video.autoplay = false;
      video.className = "modal-video";
      mediaZone.appendChild(video);
    } else {
      mediaZone.innerHTML = '<p class="modal-placeholder">Vidéo non disponible</p>';
    }

  } else if (item.type === "pdf") {
    if (item.full) {
      const embed = document.createElement("iframe");
      embed.src       = item.full;
      embed.className = "modal-pdf";
      embed.title     = item.name;
      mediaZone.appendChild(embed);
    } else {
      mediaZone.innerHTML = '<p class="modal-placeholder">PDF non disponible</p>';
    }

  } else {
    /* image */
    if (item.full) {
      const img   = document.createElement("img");
      img.src     = item.full;
      img.alt     = item.name;
      img.className = "modal-img";
      mediaZone.appendChild(img);
    } else {
      mediaZone.innerHTML = '<p class="modal-placeholder">Image non disponible</p>';
    }
  }

  /* ── ZONE DROITE : description ── */
  const tagsHTML = item.tags && item.tags.length
    ? `<div class="modal-tags">${item.tags.map(t => `<span class="modal-tag">${t}</span>`).join("")}</div>`
    : "";

  const yearHTML = item.year
    ? `<p class="modal-year">${item.year}</p>`
    : "";

  infoZone.innerHTML = `
    <div class="modal-type-badge modal-type-${item.type || "image"}">${
      item.type === "video" ? "Vidéo" :
      item.type === "pdf"   ? "PDF"   : "Image"
    }</div>
    <h2 class="modal-title">${item.name}</h2>
    ${yearHTML}
    <p class="modal-desc">${item.description || ""}</p>
    ${tagsHTML}
    ${item.full && item.type !== "video"
      ? `<a class="modal-link" href="${item.full}" target="_blank" rel="noopener noreferrer">
           ${ item.type === "pdf" ? "📄 Ouvrir le PDF" : "🔍 Voir en plein écran" }
         </a>`
      : ""}
  `;
}

/* ============================================================
   FOCUS TRAP  –  Tab reste dans la modale quand elle est ouverte
   ============================================================ */
function getFocusable() {
  return Array.from(
    overlay.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => !el.closest('[aria-hidden="true"]'));
}

function trapFocus(e) {
  if (e.key !== "Tab") return;
  const focusable = getFocusable();
  if (!focusable.length) { e.preventDefault(); return; }
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey) {
    // Shift+Tab : si on est sur le premier élément, on boucle vers le dernier
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    // Tab : si on est sur le dernier élément, on boucle vers le premier
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

function openModal(item) {
  buildModalContent(item);
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  closeBtn.focus();
  overlay.addEventListener("keydown", trapFocus);
}

function closeModal() {
  /* Arrête la vidéo si elle joue */
  const video = overlay.querySelector("video");
  if (video) { video.pause(); video.src = ""; }
  overlay.classList.remove("open");
  overlay.removeEventListener("keydown", trapFocus);
  document.body.style.overflow = "";
  /* Remet le focus sur la carte qui avait ouvert la modale */
  if (lastFocusedCard) {
    lastFocusedCard.focus();
    lastFocusedCard = null;
  }
}

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
});

/* ── Lancement ── */
render();

 
