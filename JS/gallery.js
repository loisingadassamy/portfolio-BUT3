/* ============================================================
   gallery.js  –  Galerie avec images, PDF et vidéos
   Modale : contenu à gauche · description à droite
   ============================================================ */

const categories = [
  {
    id: "graphisme",
    label: "Graphisme",
    items: [
      {
        type: "image",
        url: "images/Black-pink.jpg",
        full: "images/Black-pink.jpg",
        name: "Post Instagram",
        description: "Création d'un post Instagram pour une marque de mode. Mise en page graphique avec typographie et palette de couleurs personnalisée.",
        tags: ["Adobe Illustrator", "Photoshop"],
        year: "2024",
      },
      {
        type: "image",
        url: "images/Logo Wild Mind.png",
        full: "images/Logo Wild Mind.png",
        name: "Identité Visuelle",
        description: "Conception d'un logo et d'une charte graphique complète pour la marque Wild Mind. Travail sur la symbolique, les couleurs et la typographie.",
        tags: ["Adobe Illustrator"],
        year: "2024",
      },
      {
        type: "image",
        url: "images/Femmes fond vert.png",
        full: "images/Femmes fond vert.png",
        name: "Illustration",
        description: "Illustration numérique réalisée dans le cadre d'un projet créatif personnel. Travail sur la composition et le contraste colorimétrique.",
        tags: ["Ibis Paint X", "Photoshop"],
        year: "2023",
      },
      {
        type: "image",
        url: "images/Take a photo.png",
        full: "images/Take a photo.png",
        name: "Affiche",
        description: "Design d'affiche événementielle. Composition centrée sur la mise en valeur du message avec un traitement typographique fort.",
        tags: ["Canva", "Illustrator"],
        year: "2024",
      },
    ],
  },
  {
    id: "audiovisuel",
    label: "Audiovisuel",
    items: [
      {
        type: "image",
        url: "images/Miniature blo'k.png",
        full: "images/Miniature blo'k.png",
        name: "Carrousel Instagram",
        description: "Création d'un carrousel Instagram pour la marque Blo'k. Mise en cohérence visuelle des slides avec la charte graphique existante.",
        tags: ["Canva", "Photoshop"],
        year: "2025",
      },
      {
        type: "video",
        url: "videos/Pourquoi choisir carré tropical.mp4",
        thumbnail: "images/Miniature carré tropical.png",
        name: "Vidéo Carré Tropical",
        description: "Vidéo de présentation réalisée pour Carré Tropical, agence événementielle. Montage, habillage graphique et sous-titrage inclus.",
        tags: ["DaVinci Resolve", "CapCut"],
        year: "2025",
      },
      {
        type: "image",
        url: "images/Miniature documentaire.png",
        full: "images/Miniature documentaire.png",
        name: "Documentaire",
        description: "Réalisation d'un court-métrage documentaire dans le cadre du BUT MMI. Tournage, montage et étalonnage couleur.",
        tags: ["DaVinci Resolve"],
        year: "2024",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing Digital",
    items: [
      {
        type: "image",
        url: "images/Jeu Concours.png",
        full: "images/Jeu Concours.png",
        name: "Jeu concours Instagram",
        description: "Conception et mise en œuvre d'un jeu concours Instagram. Visuel accrocheur, rédaction du post et suivi des statistiques d'engagement.",
        tags: ["Meta Business Suite", "Canva"],
        year: "2025",
      },
      {
        type: "image",
        url: "images/miniature newsletter.png",
        full: "images/miniature newsletter.png",
        name: "Newsletter",
        description: "Design et rédaction d'une newsletter mensuelle. Structuration du contenu éditorial et optimisation pour mobile.",
        tags: ["Canva"],
        year: "2025",
      },
      {
        type: "video",
        url: "",
        thumbnail: "",
        name: "Vidéo Promotion soirée jeux",
        description: "Vidéo promotionnelle pour une soirée jeux organisée dans le cadre de l'alternance. Réalisation, montage et diffusion sur les réseaux.",
        tags: ["CapCut"],
        year: "2025",
      },
    ],
  },
  {
    id: "entrepreneuriat",
    label: "Entrepreneuriat",
    items: [
      {
        type: "pdf",
        url: "images/Miniature DOSSIER PPP.png",       // vignette affichée dans la grille
        full: "documents/Dossier PPP.pdf",             // ← remplace par ton vrai chemin PDF
        name: "Projet Personnel et Professionnel",
        description: "Dossier de Projet Personnel et Professionnel réalisé en 2ème année de BUT MMI. Réflexion sur mon orientation, mes compétences et mes ambitions professionnelles.",
        tags: ["Word", "Canva"],
        year: "2024",
      },
      {
        type: "image",
        url: "",
        full: "",
        name: "Atelier FabLab",
        description: "Participation à un atelier FabLab dans le cadre du module Entrepreneuriat. Prototypage et réflexion autour de l'innovation.",
        tags: ["FabLab"],
        year: "2024",
      },
      {
        type: "image",
        url: "",
        full: "",
        name: "Présentation Recyclerie solidaire",
        description: "Présentation d'un projet de recyclerie solidaire élaboré en équipe. Étude de marché, modèle économique et pitch.",
        tags: ["PowerPoint", "Canva"],
        year: "2023",
      },
    ],
  },
  {
    id: "gestion",
    label: "Gestion de Projet",
    items: [
      {
        type: "image",
        url: "",
        full: "",
        name: "À venir",
        description: "Ce projet sera bientôt ajouté.",
        tags: [],
        year: "",
      },
    ],
  },
];

/* ── État actif ── */
let activeId = "graphisme";

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
