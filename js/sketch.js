/* ============================================   Projet  : Comptage de Cellules Médullaires
   Module  : Nouvelles Technologies et IA
             dans l'enseignement des sciences
   Prof    : Pr. Ahmed MHAMDI
   Auteur  : Ilham NAJJI
   ============================================ */

/* ============================================   SKETCH.JS  -  Point d’entrée p5.js principal
   ============================================
   Gère l’initialisation du canvas, le calcul
   de la mise en page, la boucle de rendu
   et les interactions souris.
   ============================================ */

// --- Constantes de mise en page ---
var COLS = 3;              // Cartes par ligne
var CARD_PAD = 10;         // Espacement entre cartes
var CARD_RADIUS = 12;      // Rayon des coins de carte
var CARD_INNER_PAD = 6;    // Marge intérieure de chaque carte

// --- Calculés lors du setup ---
var canvasW = 0;
var cardW = 0;
var cardH = 0;
var totalCanvasH = 0;
var allCards = [];          // Liste plate de {cell, x, y, w, h} pour la détection de clic

// --- Onglet actif (index de catégorie) ---
var activeTabIndex = 0;

/**
 * preload() de p5.js — exécuté avant setup().
 * Charge toutes les images JPG des cellules.
 */
function preload() {
  preloadCellImages();
}

/**
 * setup() de p5.js — exécuté une seule fois au démarrage.
 */
function setup() {
  // Détermine la largeur du canvas selon le conteneur
  var container = document.getElementById("canvas-container");
  canvasW = min(container.offsetWidth - 24, 776);
  cardW = floor((canvasW - CARD_PAD * (COLS + 1)) / COLS);
  cardH = cardW + 36; // image carrée + zone de texte

  totalCanvasH = computeTotalHeight();

  var cnv = createCanvas(canvasW, totalCanvasH);
  cnv.parent("canvas-container");

  textFont("Montserrat, sans-serif");
  noLoop(); // Redessin uniquement sur événement (clic)
}

/**
 * draw() de p5.js — affiche l’interface complète.
 */
function draw() {
  background(243, 232, 255); // correspond à --color-background
  allCards = [];

  var cells = cellCategories[activeTabIndex].cells;

  for (var j = 0; j < cells.length; j++) {
    var col = j % COLS;
    var row = floor(j / COLS);
    var x = CARD_PAD + col * (cardW + CARD_PAD);
    var y = CARD_PAD + row * (cardH + CARD_PAD);

    drawCellCard(cells[j], x, y, cardW, cardH);
    allCards.push({ cell: cells[j], x: x, y: y, w: cardW, h: cardH });
  }
}

// =============================================
//  FONCTIONS DE DESSIN
// =============================================

/**

 * Affiche une carte cellule : badge compteur, illustration et libellé.
 */
function drawCellCard(cell, x, y, w, h) {
  // Fond de carte
  fill(255);
  stroke(230);
  strokeWeight(1);
  rect(x, y, w, h, CARD_RADIUS);

  // Surbrillance au survol
  if (isMouseOver(x, y, w, h)) {
    noStroke();
    fill(107, 33, 168, 15);
    rect(x, y, w, h, CARD_RADIUS);
  }

  var cellAreaSize = w - CARD_INNER_PAD * 2;
  var cellCenterX = x + w / 2;
  var cellCenterY = y + CARD_INNER_PAD + cellAreaSize / 2 + 20;

  // Illustration de la cellule
  drawCell(
    cellCenterX,
    cellCenterY,
    cellAreaSize * 0.75,
    cell.svgKey
  );

  // Badge de comptage (en haut à gauche)
  var badgeX = x + 8;
  var badgeY = y + 8;
  var badgeW = max(26, textWidth(str(cell.count)) + 14);
  noStroke();
  fill(107, 33, 168, 30);
  rect(badgeX, badgeY, badgeW, 24, 6);
  fill(30);
  textAlign(LEFT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(cell.count, badgeX + 7, badgeY + 12);

  // Libellé du nom de la cellule (en bas)
  noStroke();
  fill(80);
  textAlign(CENTER, BOTTOM);
  textSize(11);
  textStyle(NORMAL);
  text(cell.name, x + w / 2, y + h - 6);
}

// =============================================
//  INTERACTION
// =============================================

/**
 * Change l’onglet actif selon l’index de catégorie.
 * Appelé par les boutons onglets du HTML.
 */
function setActiveTab(index) {
  activeTabIndex = index;

  var tabs = document.querySelectorAll(".tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.toggle("active", i === index);
  }

  totalCanvasH = computeTotalHeight();
  resizeCanvas(canvasW, totalCanvasH);
  redraw();
}

/**
 * mousePressed() de p5.js — clic gauche incrémente, clic droit décrémente.
 */
function mousePressed(event) {
  var card = findCardUnderMouse();
  if (!card) return;

  if (event && event.button === 2) {
    // Clic droit : décrémente
    if (card.cell.count > 0) {
      card.cell.count--;
      updateTotalDisplay();
      redraw();
    }
  } else if (event && event.button === 0) {
    // Clic gauche : incrémente
    card.cell.count++;
    updateTotalDisplay();
    redraw();
  }
}

/**
 * Empêche le menu contextuel du navigateur sur le canvas.
 */
document.addEventListener("contextmenu", function (e) {
  var canvas = document.querySelector("#canvas-container canvas");
  if (canvas && canvas.contains(e.target)) {
    e.preventDefault();
  }
});

/**
 * Touche Échap — ferme la modale de résumé si ouverte.
 */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeSummary();
});

/**
 * Redessine lors du déplacement de la souris (effets de survol).
 */
function mouseMoved() {
  redraw();
}

// =============================================
//  FONCTIONS UTILITAIRES
// =============================================

/**
 * Teste si la souris est au-dessus d’un rectangle.
 */
function isMouseOver(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

/**
 * Retourne la carte sous le curseur, ou null.
 */
function findCardUnderMouse() {
  for (var i = 0; i < allCards.length; i++) {
    var c = allCards[i];
    if (isMouseOver(c.x, c.y, c.w, c.h)) {
      return c;
    }
  }
  return null;
}

/**
 * Calcule la hauteur totale du canvas selon la catégorie active.
 */
function computeTotalHeight() {
  var cells = cellCategories[activeTabIndex].cells;
  var rowCount = ceil(cells.length / COLS);
  return CARD_PAD + rowCount * (cardH + CARD_PAD) + CARD_PAD;
}

/**
 * Gestion du redimensionnement de la fenêtre — recalcule la mise en page.
 */
function windowResized() {
  var container = document.getElementById("canvas-container");
  canvasW = min(container.offsetWidth - 24, 776);
  cardW = floor((canvasW - CARD_PAD * (COLS + 1)) / COLS);
  cardH = cardW + 36;
  totalCanvasH = computeTotalHeight();
  resizeCanvas(canvasW, totalCanvasH);
  redraw();
}
