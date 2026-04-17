/* ============================================
   Projet  : Comptage de Cellules Médullaires
   Module  : Nouvelles Technologies et IA
             dans l'enseignement des sciences
   Prof    : Pr. Ahmed MHAMDI
   Auteur  : Ilham NAJJI
   ============================================ */

/* ============================================
   MODULE DE DESSIN  (photos JPG)
   ============================================
   Charge les photos .jpg depuis le dossier cells/
   via loadImage() de p5.js, puis les affiche
   decoupees en cercle sur le canvas.

   API publique
   preloadCellImages()  - appeler dans preload() de p5
   drawCell(cx, cy, taille, cle)  - dessiner une cellule
   ============================================ */

/** Chemin vers le dossier des images. */
var CELLS_PATH = "cells/";

/** Stocke les objets p5.Image charges, indexes par cle. */
var loadedImages = {};

/**
 * Charge tous les fichiers JPG depuis cellCategories.
 * Doit etre appele dans preload() de p5.
 */
function preloadCellImages() {
  for (var i = 0; i < cellCategories.length; i++) {
    var cells = cellCategories[i].cells;
    for (var j = 0; j < cells.length; j++) {
      var k = cells[j].svgKey;
      loadedImages[k] = loadImage(CELLS_PATH + k + ".jpg");
    }
  }
}

/**
 * Affiche la photo d une cellule decoupee en cercle, centree en (cx, cy).
 */
function drawCell(cx, cy, size, key) {
  var img = loadedImages[key];
  if (img) {
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(cx, cy, size / 2, 0, Math.PI * 2);
    drawingContext.clip();
    imageMode(CENTER);
    image(img, cx, cy, size, size);
    drawingContext.restore();
  } else {
    // Repli : cercle uni si l image n est pas encore chargee
    noStroke();
    fill(200, 190, 220);
    ellipseMode(CENTER);
    ellipse(cx, cy, size, size);
  }
}