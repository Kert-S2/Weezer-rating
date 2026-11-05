"use strict";

/* ------------------------------------------------------------------
   Dados
   As capas ficam na pasta covers/, com o nome igual à chave do álbum
   (blue.jpg, pinkerton.jpg, ...). Aceita .jpg, .jpeg, .png ou .webp.
------------------------------------------------------------------- */
const ALBUMS = {
  blue: {
    name: "Blue Album", year: "1994",
    tracks: ["My Name Is Jonas", "No One Else", "The World Has Turned and Left Me Here", "Buddy Holly", "Undone – The Sweater Song", "Surf Wax America", "Say It Ain't So", "In the Garage", "Holiday", "Only in Dreams"]
  },
  pinkerton: {
    name: "Pinkerton", year: "1996",
    tracks: ["Tired of Sex", "Getchoo", "No Other One", "Why Bother?", "Across the Sea", "The Good Life", "El Scorcho", "Pink Triangle", "Falling for You", "Butterfly"]
  },
  green: {
    name: "Green Album", year: "2001",
    tracks: ["Don't Let Go", "Photograph", "Hash Pipe", "Island in the Sun", "Crab", "Knock-down Drag-out", "Smile", "Simple Pages", "Glorious Day", "O Girlfriend"]
  },
  maladroit: {
    name: "Maladroit", year: "2002",
    tracks: ["American Gigolo", "Dope Nose", "Keep Fishin'", "Take Control", "Death and Destruction", "Slob", "Burndt Jamb", "Space Rock", "Slave", "Fall Together", "Possibilities", "Love Explosion", "December"]
  },
  makebelieve: {
    name: "Make Believe", year: "2005",
    tracks: ["Beverly Hills", "Perfect Situation", "This Is Such a Pity", "Hold Me", "Peace", "We Are All on Drugs", "The Damage in Your Heart", "Pardon Me", "My Best Friend", "The Other Way", "Freak Me Out", "Haunt You Every Day"]
  },
  red: {
    name: "The Red Album", year: "2008",
    tracks: ["Troublemaker", "The Greatest Man That Ever Lived", "Pork and Beans", "Heart Songs", "Everybody Get Dangerous", "Dreamin'", "Thought I Knew", "Cold Dark World", "Automatic", "The Angel and the One"]
  },
  white: {
    name: "The White Album", year: "2016",
    tracks: ["California Kids", "Wind in Our Sail", "Thank God for Girls", "(Girl We Got a) Good Thing", "Do You Wanna Get High?", "King of the World", "Summer Elaine and Drunk Dori", "L.A. Girlz", "Jacked Up", "Endless Bummer"]
  },
  okhuman: {
    name: "OK Human", year: "2021",
    tracks: ["All My Favorite Songs", "Aloo Gobi", "Grapes of Wrath", "Numbers", "Playing My Piano", "Mirror Image", "Screens", "Bird with a Broken Wing", "Dead Roses", "Everything Happens for a Reason", "Here Comes the Rain", "La Brea Tar Pits"]
  }
};

const MAX_TRACKS = 24;
const COVER_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const STORAGE_PREFIX = "weezer-rating:";

/* Aparência do card (o canvas usa a mesma fonte da página).
   Cada álbum tem a sua paleta. Para ajustar uma cor, basta editar aqui. */
const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const LIGHT_TEXT = {
  text: "#ffffff",
  line: "rgba(255, 255, 255, 0.28)",
  rowLine: "rgba(255, 255, 255, 0.12)",
  barTrack: "rgba(255, 255, 255, 0.2)",
  frame: "rgba(255, 255, 255, 0.55)",
  coverBorder: "#ffffff"
};
const DARK_TEXT = {
  text: "#1c1a17",
  line: "rgba(28, 26, 23, 0.3)",
  rowLine: "rgba(28, 26, 23, 0.14)",
  barTrack: "rgba(28, 26, 23, 0.16)",
  frame: "rgba(28, 26, 23, 0.5)",
  coverBorder: "#1c1a17"
};

const PALETTES = {
  blue:        { ...LIGHT_TEXT, bg: "#1b4d8f", panel: "#143b70", soft: "#bcd4f5", muted: "#8fb0e0", accent: "#f4c20d", placeholder: "#2d6cc0" },
  pinkerton:   { ...LIGHT_TEXT, bg: "#2a4a52", panel: "#1e373e", soft: "#c9dddc", muted: "#97b4b4", accent: "#f0a6a0", placeholder: "#3d6a74" },
  green:       { ...LIGHT_TEXT, bg: "#2b7a3d", panel: "#1f5c2d", soft: "#d3ecca", muted: "#a0cc9c", accent: "#ffe14d", placeholder: "#3f9a52" },
  maladroit:   { ...LIGHT_TEXT, bg: "#2b2b33", panel: "#1d1d23", soft: "#cacad6", muted: "#9292a3", accent: "#ff7a2f", placeholder: "#45454f" },
  makebelieve: { ...LIGHT_TEXT, bg: "#3d3a6e", panel: "#2d2b55", soft: "#d0cff0", muted: "#9d9bd0", accent: "#ffb347", placeholder: "#57548f" },
  red:         { ...LIGHT_TEXT, bg: "#a3211f", panel: "#7d1715", soft: "#f7ccc7", muted: "#e49c96", accent: "#ffd24a", placeholder: "#c0403d" },
  white:       { ...DARK_TEXT,  bg: "#f3f1ea", panel: "#e3dfd3", soft: "#4a5568", muted: "#7b8494", accent: "#d4452b", placeholder: "#cfd8e3" },
  okhuman:     { ...DARK_TEXT,  bg: "#e3993a", panel: "#cf8526", soft: "#5b3a0e", muted: "#7e5a24", accent: "#1b4d8f", placeholder: "#f0b765" }
};

/* ------------------------------------------------------------------
   Idiomas: en (padrão), pt (BR) e es
------------------------------------------------------------------- */
const LANGUAGES = ["en", "pt", "es"];
const HTML_LANG = { en: "en", pt: "pt-BR", es: "es" };

const I18N = {
  en: {
    topNote: "Fan project, not official",
    heroTitle: "Build your rating of a Weezer album",
    heroCopy: "Pick an album, give each track a score from 0 to 10, and download the card to share.",
    albumHeading: "Album",
    albumLabel: "Choose the album",
    nameLabel: "Your name (optional)",
    namePlaceholder: "E.g.: kert",
    yearLabel: "Year",
    tracksHeading: "Tracks",
    progress: "{n} of {total} rated",
    tracklistLabel: "Edit tracklist (one song per line)",
    tracklistHint: "Applying a different tracklist resets this album's ratings. Maximum of 24 tracks.",
    applyBtn: "Apply tracklist",
    restoreBtn: "Restore original",
    downloadBtn: "Download card as PNG",
    resetBtn: "Clear ratings",
    previewTitle: "Card preview",
    canvasAria: "Preview of the rating card",
    previewHint: "The preview updates as you rate. The PNG is exported at 1080 × 1350.",
    statRated: "Rated",
    statAverage: "Average",
    statBest: "Best score",
    footerLeft: "Made by fans, for fans.",
    footerRight: "Independent project, not affiliated with Weezer.",
    ratingPlaceholder: "Score",
    ratingAria: "Score for {name}",
    coverMissing: "Cover not found. Put the image in the covers folder named {file}.jpg (or .png, .webp).",
    needOneSong: "Type at least one song, one per line.",
    tooMany: "Use at most {max} tracks per card.",
    unchanged: "The tracklist did not change.",
    applied: "Tracklist applied. Ratings were reset.",
    alreadyOriginal: "This album already uses the original tracklist.",
    restored: "Original tracklist restored. Ratings were reset.",
    cleared: "Ratings cleared.",
    downloaded: "Image created. Check your downloads folder.",
    securityError: "The browser blocked the cover because the file was opened directly. Open the project with the Live Server extension in VS Code and try again.",
    genericError: "Could not create the image. Reload the page and try again.",
    posterKicker: "Weezer fan ratings",
    posterReview: "{year} album review",
    posterScore: "Album score",
    posterRated: "{n} of {total} tracks rated",
    posterTracklist: "Tracklist",
    ratedBy: "Rated by {name}",
    personal: "My personal album rating"
  },
  pt: {
    topNote: "Projeto de fã, sem vínculo oficial",
    heroTitle: "Monte a sua avaliação de um álbum do Weezer",
    heroCopy: "Escolha o álbum, dê uma nota de 0 a 10 para cada faixa e baixe o card para compartilhar.",
    albumHeading: "Álbum",
    albumLabel: "Escolha o álbum",
    nameLabel: "Seu nome (opcional)",
    namePlaceholder: "Ex.: kert",
    yearLabel: "Ano",
    tracksHeading: "Faixas",
    progress: "{n} de {total} avaliadas",
    tracklistLabel: "Editar tracklist (uma música por linha)",
    tracklistHint: "Aplicar uma tracklist diferente reinicia as notas deste álbum. Máximo de 24 faixas.",
    applyBtn: "Aplicar tracklist",
    restoreBtn: "Voltar à original",
    downloadBtn: "Baixar card em PNG",
    resetBtn: "Limpar notas",
    previewTitle: "Prévia do card",
    canvasAria: "Prévia do card de avaliação",
    previewHint: "A prévia muda conforme você avalia. O PNG sai em 1080 × 1350.",
    statRated: "Avaliadas",
    statAverage: "Média",
    statBest: "Maior nota",
    footerLeft: "Feito por fãs, para fãs.",
    footerRight: "Projeto independente, sem vínculo oficial com o Weezer.",
    ratingPlaceholder: "Nota",
    ratingAria: "Nota para {name}",
    coverMissing: "Capa não encontrada. Coloque a imagem na pasta covers com o nome {file}.jpg (ou .png, .webp).",
    needOneSong: "Digite pelo menos uma música, uma por linha.",
    tooMany: "Use no máximo {max} faixas por card.",
    unchanged: "A tracklist não mudou.",
    applied: "Tracklist aplicada. As notas foram reiniciadas.",
    alreadyOriginal: "Este álbum já está com a tracklist original.",
    restored: "Tracklist original restaurada. As notas foram reiniciadas.",
    cleared: "Notas limpas.",
    downloaded: "Imagem gerada. Confira sua pasta de downloads.",
    securityError: "O navegador bloqueou a capa ao abrir o arquivo direto. Abra o projeto com a extensão Live Server do VS Code e tente de novo.",
    genericError: "Não foi possível gerar a imagem. Recarregue a página e tente de novo.",
    posterKicker: "Avaliações de fãs do Weezer",
    posterReview: "Álbum de {year}",
    posterScore: "Nota do álbum",
    posterRated: "{n} de {total} faixas avaliadas",
    posterTracklist: "Tracklist",
    ratedBy: "Avaliado por {name}",
    personal: "Minha avaliação pessoal do álbum"
  },
  es: {
    topNote: "Proyecto de fans, no oficial",
    heroTitle: "Arma tu calificación de un álbum de Weezer",
    heroCopy: "Elige un álbum, ponle una nota de 0 a 10 a cada canción y descarga la tarjeta para compartir.",
    albumHeading: "Álbum",
    albumLabel: "Elige el álbum",
    nameLabel: "Tu nombre (opcional)",
    namePlaceholder: "Ej.: kert",
    yearLabel: "Año",
    tracksHeading: "Canciones",
    progress: "{n} de {total} calificadas",
    tracklistLabel: "Editar la lista de canciones (una por línea)",
    tracklistHint: "Aplicar otra lista reinicia las notas de este álbum. Máximo de 24 canciones.",
    applyBtn: "Aplicar lista",
    restoreBtn: "Volver a la original",
    downloadBtn: "Descargar tarjeta en PNG",
    resetBtn: "Borrar notas",
    previewTitle: "Vista previa de la tarjeta",
    canvasAria: "Vista previa de la tarjeta de calificación",
    previewHint: "La vista previa cambia mientras calificas. El PNG sale en 1080 × 1350.",
    statRated: "Calificadas",
    statAverage: "Promedio",
    statBest: "Mejor nota",
    footerLeft: "Hecho por fans, para fans.",
    footerRight: "Proyecto independiente, sin vínculo oficial con Weezer.",
    ratingPlaceholder: "Nota",
    ratingAria: "Nota para {name}",
    coverMissing: "No se encontró la portada. Pon la imagen en la carpeta covers con el nombre {file}.jpg (o .png, .webp).",
    needOneSong: "Escribe al menos una canción, una por línea.",
    tooMany: "Usa como máximo {max} canciones por tarjeta.",
    unchanged: "La lista no cambió.",
    applied: "Lista aplicada. Las notas se reiniciaron.",
    alreadyOriginal: "Este álbum ya usa la lista original.",
    restored: "Lista original restaurada. Las notas se reiniciaron.",
    cleared: "Notas borradas.",
    downloaded: "Imagen creada. Revisa tu carpeta de descargas.",
    securityError: "El navegador bloqueó la portada porque abriste el archivo directamente. Abre el proyecto con la extensión Live Server de VS Code e inténtalo de nuevo.",
    genericError: "No se pudo crear la imagen. Recarga la página e inténtalo de nuevo.",
    posterKicker: "Calificaciones de fans de Weezer",
    posterReview: "Álbum de {year}",
    posterScore: "Nota del álbum",
    posterRated: "{n} de {total} canciones calificadas",
    posterTracklist: "Lista de canciones",
    ratedBy: "Calificado por {name}",
    personal: "Mi calificación personal del álbum"
  }
};

/* ------------------------------------------------------------------
   Estado
------------------------------------------------------------------- */
const $ = (id) => document.getElementById(id);
const canvas = $("posterCanvas");
const ctx = canvas.getContext("2d");

let currentAlbum = "blue";
let ratings = {};          // índice da faixa -> "0".."10"
let customTracks = null;   // tracklist editada, ou null para usar a original
let coverImage = null;
let coverToken = 0;        // evita que uma capa antiga sobrescreva a atual
let COLOR = PALETTES[currentAlbum];  // paleta do álbum atual
let lang = "en";           // idioma da interface e do card
let coverMissing = false;  // true quando não há arquivo de capa para o álbum

/* ------------------------------------------------------------------
   Armazenamento local (notas ficam salvas por álbum)
------------------------------------------------------------------- */
function readStore(key) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    /* sem armazenamento disponível: o site continua funcionando */
  }
}

function saveState() {
  writeStore(currentAlbum, { ratings, customTracks });
}

function loadState(albumKey) {
  ratings = {};
  customTracks = null;
  const saved = readStore(albumKey);
  if (!saved) return;

  if (Array.isArray(saved.customTracks)
      && saved.customTracks.length > 0
      && saved.customTracks.length <= MAX_TRACKS
      && saved.customTracks.every((t) => typeof t === "string" && t.trim())) {
    customTracks = saved.customTracks;
  }

  const total = getTracks(albumKey).length;
  if (saved.ratings && typeof saved.ratings === "object") {
    Object.entries(saved.ratings).forEach(([index, value]) => {
      if (/^\d+$/.test(index) && Number(index) < total && /^(10|[0-9])$/.test(String(value))) {
        ratings[index] = String(value);
      }
    });
  }
}

/* ------------------------------------------------------------------
   Funções de apoio
------------------------------------------------------------------- */
function getTracks(albumKey = currentAlbum) {
  return albumKey === currentAlbum && customTracks ? customTracks : ALBUMS[albumKey].tracks;
}

function getRated() {
  return getTracks()
    .map((name, index) => ({ name, score: ratings[index] }))
    .filter((item) => item.score !== undefined && item.score !== "");
}

function getAverage(rated) {
  if (!rated.length) return null;
  return rated.reduce((sum, item) => sum + Number(item.score), 0) / rated.length;
}

function sameList(a, b) {
  return a.length === b.length && a.every((item, i) => item === b[i]);
}

function t(key, vars = {}) {
  const text = I18N[lang][key] ?? I18N.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (match, name) => (vars[name] !== undefined ? vars[name] : match));
}

function setStatus(message) {
  $("status").textContent = message;
}

function translateStatic() {
  document.documentElement.lang = HTML_LANG[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
}

function setLanguage(code) {
  if (!LANGUAGES.includes(code)) return;
  lang = code;
  try { localStorage.setItem(`${STORAGE_PREFIX}lang`, code); } catch (error) { /* ignora */ }
  translateStatic();
  renderTracks();
  refreshCoverNote();
  update();
  setStatus("");
}

/* ------------------------------------------------------------------
   Interface
------------------------------------------------------------------- */
function fillAlbumSelect() {
  Object.entries(ALBUMS).forEach(([key, album]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = album.name;
    $("albumSelect").appendChild(option);
  });
}

function renderTracks() {
  const list = $("trackList");
  list.innerHTML = "";

  getTracks().forEach((name, index) => {
    const row = document.createElement("div");
    row.className = "track-row";

    const number = document.createElement("span");
    number.className = "track-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("span");
    title.className = "track-name";
    title.textContent = name;

    const select = document.createElement("select");
    select.setAttribute("aria-label", t("ratingAria", { name }));

    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = t("ratingPlaceholder");
    select.appendChild(empty);

    for (let score = 0; score <= 10; score++) {
      const option = document.createElement("option");
      option.value = String(score);
      option.textContent = `${score} / 10`;
      select.appendChild(option);
    }

    select.value = ratings[index] ?? "";
    select.addEventListener("change", () => {
      if (select.value === "") delete ratings[index];
      else ratings[index] = select.value;
      saveState();
      update();
    });

    row.append(number, title, select);
    list.appendChild(row);
  });

  $("customTracks").value = getTracks().join("\n");
}

function updateStats() {
  const rated = getRated();
  const total = getTracks().length;
  const average = getAverage(rated);

  $("ratedCount").textContent = rated.length;
  $("averageScore").textContent = average === null ? "—" : average.toFixed(1);
  $("bestScore").textContent = rated.length ? String(Math.max(...rated.map((x) => Number(x.score)))) : "—";
  $("progressText").textContent = t("progress", { n: rated.length, total });
}

function update() {
  updateStats();
  drawPoster();
}

/* ------------------------------------------------------------------
   Capa do álbum (arquivo local em covers/)
------------------------------------------------------------------- */
function refreshCoverNote() {
  const note = $("coverNote");
  note.hidden = !coverMissing;
  if (coverMissing) note.textContent = t("coverMissing", { file: currentAlbum });
}

function loadCover(albumKey) {
  const token = ++coverToken;
  coverImage = null;
  coverMissing = false;
  refreshCoverNote();

  let attempt = 0;
  const tryNext = () => {
    if (token !== coverToken) return;

    if (attempt >= COVER_EXTENSIONS.length) {
      coverMissing = true;
      refreshCoverNote();
      update();
      return;
    }

    const image = new Image();
    image.onload = () => {
      if (token !== coverToken) return;
      coverImage = image;
      update();
    };
    image.onerror = () => {
      attempt += 1;
      tryNext();
    };
    image.src = `covers/${albumKey}.${COVER_EXTENSIONS[attempt]}`;
  };

  tryNext();
}

/* ------------------------------------------------------------------
   Desenho do card
------------------------------------------------------------------- */
function roundRectPath(x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}

function fitText(text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let cut = text;
  while (cut.length > 1 && ctx.measureText(`${cut}…`).width > maxWidth) cut = cut.slice(0, -1);
  return `${cut.trimEnd()}…`;
}

function drawCover(x, y, size) {
  ctx.fillStyle = COLOR.coverBorder;
  ctx.fillRect(x - 6, y - 6, size + 12, size + 12);

  if (coverImage) {
    const side = Math.min(coverImage.width, coverImage.height);
    const sx = (coverImage.width - side) / 2;
    const sy = (coverImage.height - side) / 2;
    ctx.drawImage(coverImage, sx, sy, side, side, x, y, size, size);
    return;
  }

  ctx.fillStyle = COLOR.placeholder;
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = COLOR.text;
  ctx.textAlign = "center";
  ctx.font = `800 170px ${FONT}`;
  ctx.fillText("W", x + size / 2, y + size / 2 + 40);
  ctx.font = `600 24px ${FONT}`;
  ctx.fillText(ALBUMS[currentAlbum].name, x + size / 2, y + size - 28, size - 40);
  ctx.textAlign = "left";
}

function drawHeader() {
  const album = ALBUMS[currentAlbum];
  ctx.fillStyle = COLOR.soft;
  ctx.font = `600 24px ${FONT}`;
  ctx.fillText(t("posterKicker"), 70, 100);

  ctx.fillStyle = COLOR.text;
  ctx.font = `800 70px ${FONT}`;
  ctx.fillText(album.name, 70, 178, 940);

  ctx.fillStyle = COLOR.soft;
  ctx.font = `500 28px ${FONT}`;
  ctx.fillText(t("posterReview", { year: album.year }), 70, 226);
}

function drawScoreBox(x, y, w, h) {
  const rated = getRated();
  const total = getTracks().length;
  const average = getAverage(rated);

  roundRectPath(x, y, w, h, 12);
  ctx.fillStyle = COLOR.panel;
  ctx.fill();
  ctx.strokeStyle = COLOR.text;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = COLOR.soft;
  ctx.font = `600 26px ${FONT}`;
  ctx.fillText(t("posterScore"), x + 32, y + 56);

  const scoreText = average === null ? "" : average.toFixed(1);
  ctx.fillStyle = average === null ? COLOR.muted : COLOR.accent;
  ctx.font = `800 150px ${FONT}`;
  ctx.fillText(average === null ? "?" : scoreText, x + 28, y + 195);

  if (average !== null) {
    const scoreWidth = ctx.measureText(scoreText).width;
    ctx.fillStyle = COLOR.soft;
    ctx.font = `700 48px ${FONT}`;
    ctx.fillText("/10", x + 28 + scoreWidth + 10, y + 195);
  }

  ctx.fillStyle = COLOR.text;
  ctx.font = `500 26px ${FONT}`;
  ctx.fillText(t("posterRated", { n: rated.length, total }), x + 32, y + h - 34);
}

function drawTrackRows(top, bottom) {
  const tracks = getTracks();
  const rowH = Math.min(58, (bottom - top) / tracks.length);
  const fontSize = Math.max(15, Math.min(27, rowH * 0.5));
  const barX = 745;
  const barW = 150;
  const barH = Math.max(6, Math.min(12, rowH * 0.26));

  tracks.forEach((name, index) => {
    const rowTop = top + index * rowH;
    const baseline = rowTop + rowH / 2 + fontSize * 0.35;
    const raw = ratings[index];
    const hasScore = raw !== undefined && raw !== "";

    ctx.fillStyle = COLOR.muted;
    ctx.font = `600 ${Math.round(fontSize * 0.85)}px ${FONT}`;
    ctx.fillText(String(index + 1).padStart(2, "0"), 70, baseline);

    ctx.fillStyle = COLOR.text;
    ctx.font = `500 ${fontSize}px ${FONT}`;
    ctx.fillText(fitText(name, barX - 125 - 24), 125, baseline);

    const barY = rowTop + rowH / 2 - barH / 2;
    ctx.fillStyle = COLOR.barTrack;
    ctx.fillRect(barX, barY, barW, barH);
    if (hasScore) {
      ctx.fillStyle = COLOR.accent;
      ctx.fillRect(barX, barY, (barW * Number(raw)) / 10, barH);
    }

    ctx.textAlign = "right";
    ctx.font = `700 ${fontSize}px ${FONT}`;
    ctx.fillStyle = hasScore ? COLOR.accent : COLOR.muted;
    ctx.fillText(hasScore ? `${raw}/10` : "—", 1010, baseline);
    ctx.textAlign = "left";

    if (index < tracks.length - 1) {
      ctx.strokeStyle = COLOR.rowLine;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(70, rowTop + rowH);
      ctx.lineTo(1010, rowTop + rowH);
      ctx.stroke();
    }
  });
}

function drawFooter() {
  const user = $("displayName").value.trim();

  ctx.fillStyle = COLOR.text;
  ctx.font = `600 24px ${FONT}`;
  ctx.fillText(user ? t("ratedBy", { name: user }) : t("personal"), 70, 1296);

  ctx.fillStyle = COLOR.soft;
  ctx.font = `500 20px ${FONT}`;
  ctx.textAlign = "right";
  ctx.fillText("Weezer Rating Generator", 1010, 1296);
  ctx.textAlign = "left";
}

function drawPoster() {
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = COLOR.bg;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = COLOR.frame;
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, W - 72, H - 72);

  drawHeader();
  drawCover(70, 276, 300);
  drawScoreBox(412, 270, 598, 312);

  ctx.strokeStyle = COLOR.line;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(70, 632);
  ctx.lineTo(1010, 632);
  ctx.stroke();

  ctx.fillStyle = COLOR.soft;
  ctx.font = `700 24px ${FONT}`;
  ctx.fillText(t("posterTracklist"), 70, 676);

  drawTrackRows(696, 1250);

  ctx.strokeStyle = COLOR.line;
  ctx.beginPath();
  ctx.moveTo(70, 1258);
  ctx.lineTo(1010, 1258);
  ctx.stroke();

  drawFooter();
}

/* ------------------------------------------------------------------
   Ações
------------------------------------------------------------------- */
function changeAlbum(albumKey) {
  currentAlbum = albumKey;
  COLOR = PALETTES[albumKey];
  canvas.style.background = COLOR.bg;
  loadState(albumKey);
  $("albumYear").value = ALBUMS[albumKey].year;
  renderTracks();
  loadCover(albumKey);
  update();
  setStatus("");
}

function applyCustomTracks() {
  const lines = $("customTracks").value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return setStatus(t("needOneSong"));
  if (lines.length > MAX_TRACKS) return setStatus(t("tooMany", { max: MAX_TRACKS }));
  if (sameList(lines, getTracks())) return setStatus(t("unchanged"));

  customTracks = sameList(lines, ALBUMS[currentAlbum].tracks) ? null : lines;
  ratings = {};
  saveState();
  renderTracks();
  update();
  setStatus(t("applied"));
}

function restoreTracks() {
  if (!customTracks) return setStatus(t("alreadyOriginal"));
  customTracks = null;
  ratings = {};
  saveState();
  renderTracks();
  update();
  setStatus(t("restored"));
}

function clearRatings() {
  ratings = {};
  saveState();
  renderTracks();
  update();
  setStatus(t("cleared"));
}

function downloadPoster() {
  drawPoster();
  try {
    const safeName = ALBUMS[currentAlbum].name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const link = document.createElement("a");
    link.download = `weezer-${safeName}-rating.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setStatus(t("downloaded"));
  } catch (error) {
    if (error && error.name === "SecurityError") {
      setStatus(t("securityError"));
    } else {
      setStatus(t("genericError"));
    }
  }
}

/* ------------------------------------------------------------------
   Início
------------------------------------------------------------------- */
fillAlbumSelect();
$("albumSelect").value = currentAlbum;

try { $("displayName").value = localStorage.getItem(`${STORAGE_PREFIX}name`) || ""; } catch (error) { /* ignora */ }

try {
  const savedLang = localStorage.getItem(`${STORAGE_PREFIX}lang`);
  if (LANGUAGES.includes(savedLang)) lang = savedLang;
} catch (error) { /* ignora */ }

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

$("albumSelect").addEventListener("change", () => changeAlbum($("albumSelect").value));
$("displayName").addEventListener("input", () => {
  try { localStorage.setItem(`${STORAGE_PREFIX}name`, $("displayName").value); } catch (error) { /* ignora */ }
  update();
});
$("applyTracks").addEventListener("click", applyCustomTracks);
$("restoreTracks").addEventListener("click", restoreTracks);
$("resetButton").addEventListener("click", clearRatings);
$("downloadButton").addEventListener("click", downloadPoster);

translateStatic();
changeAlbum(currentAlbum);
