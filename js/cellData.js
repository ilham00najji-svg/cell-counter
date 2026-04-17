/* ============================================
   Projet  : Comptage de Cellules Médullaires
   Module  : Nouvelles Technologies et IA
             dans l'enseignement des sciences
   Prof    : Pr. Ahmed MHAMDI
   Auteur  : Ilham NAJJI
   ============================================ */

/* ============================================
   MODULE DE DONNÉES
   ============================================
   Définit tous les types cellulaires, leurs
   catégories et les comptages courants.
   ============================================ */

/**
 * Chaque catégorie possède :
 *  - name  : titre de section affiché à l’écran
 *  - cells : tableau d’objets cellule
 *
 * Chaque objet cellule possède :
 *  - name   : nom affiché
 *  - count  : comptage courant (démarre à 0)
 *  - svgKey : clé correspondant au fichier image
 */

var cellCategories = [
  {
    name: "Série érythrocytaire",
    cells: [
      {
        name: "Érythrocyte (normal)",
        count: 0,
        svgKey: "erythrocyte"
      },
      {
        name: "Cellule cible",
        count: 0,
        svgKey: "target_cell"
      },
      {
        name: "Sphérocyte",
        count: 0,
        svgKey: "spherocyte"
      },
      {
        name: "Ovalocyte",
        count: 0,
        svgKey: "ovalocyte"
      },
      {
        name: "Drépanocyte",
        count: 0,
        svgKey: "sickle_cell"
      },
      {
        name: "Acanthocyte",
        count: 0,
        svgKey: "acanthocyte"
      },
      {
        name: "Dacryocyte",
        count: 0,
        svgKey: "dacryocyte"
      },
      {
        name: "Stomatocyte",
        count: 0,
        svgKey: "stomatocyte"
      },
      {
        name: "Échinocyte",
        count: 0,
        svgKey: "echinocyte"
      },
      {
        name: "Elliptocyte",
        count: 0,
        svgKey: "elliptocyte"
      },
      {
        name: "Schizocyte mordu",
        count: 0,
        svgKey: "bite_cell"
      },
      {
        name: "Schistocyte",
        count: 0,
        svgKey: "schistocyte"
      }
    ]
  },
  {
    name: "Leucocytes",
    cells: [
      {
        name: "Neutrophile segmenté",
        count: 0,
        svgKey: "seg_neutrophil"
      },
      {
        name: "Éosinophile",
        count: 0,
        svgKey: "eosinophil"
      },
      {
        name: "Basophile",
        count: 0,
        svgKey: "basophil"
      },
      {
        name: "Lymphocyte",
        count: 0,
        svgKey: "lymphocyte"
      },
      {
        name: "Monocyte",
        count: 0,
        svgKey: "monocyte"
      },
      {
        name: "Macrophage",
        count: 0,
        svgKey: "macrophage"
      }
    ]
  }
];

/**
 * Retourne le total des comptages de tous les types cellulaires.
 */
function getTotalCount() {
  var total = 0;
  for (var i = 0; i < cellCategories.length; i++) {
    var cells = cellCategories[i].cells;
    for (var j = 0; j < cells.length; j++) {
      total += cells[j].count;
    }
  }
  return total;
}

/**
 * Réinitialise tous les comptages à zéro.
 */
function eraseAllCounts() {
  for (var i = 0; i < cellCategories.length; i++) {
    var cells = cellCategories[i].cells;
    for (var j = 0; j < cells.length; j++) {
      cells[j].count = 0;
    }
  }
  updateTotalDisplay();
}

/**
 * Appelé par le bouton « Effacer » — remet les comptages à zéro et redessine.
 */
function eraseCountsAndRedraw() {
  eraseAllCounts();
  redraw();
}

/**
 * Met à jour le total affiché dans l’en-tête HTML.
 */
function updateTotalDisplay() {
  var el = document.getElementById("total-count");
  if (el) {
    el.textContent = getTotalCount();
  }
}
/**
 * Affiche la modale de résumé avec les statistiques du comptage.
 */
function showSummary() {
  var total = getTotalCount();
  var body = document.getElementById("summary-body");
  var html = "";

  for (var i = 0; i < cellCategories.length; i++) {
    var cat = cellCategories[i];
    var catTotal = 0;
    for (var j = 0; j < cat.cells.length; j++) catTotal += cat.cells[j].count;

    html += '<div class="summary-category">';
    html += '<h3>' + cat.name + '</h3>';
    html += '<table class="summary-table">';
    html += '<thead><tr><th>Cellule</th><th>N</th><th>%</th><th></th></tr></thead><tbody>';

    for (var j = 0; j < cat.cells.length; j++) {
      var cell = cat.cells[j];
      var pct = total > 0 ? (cell.count / total * 100) : 0;
      var barW = Math.round(pct);
      var rowClass = cell.count === 0 ? ' class="zero"' : '';
      html += '<tr' + rowClass + '>';
      html += '<td>' + cell.name + '</td>';
      html += '<td>' + cell.count + '</td>';
      html += '<td>' + (total > 0 ? pct.toFixed(1) + ' %' : '—') + '</td>';
      html += '<td><span class="summary-bar-wrap"><span class="summary-bar" style="width:' + barW + '%"></span></span></td>';
      html += '</tr>';
    }

    html += '<tr class="summary-total-row"><td>Sous-total</td><td>' + catTotal + '</td><td>' + (total > 0 ? (catTotal / total * 100).toFixed(1) + ' %' : '—') + '</td><td></td></tr>';
    html += '</tbody></table></div>';
  }

  html += '<div class="summary-category"><table class="summary-table"><tbody>';
  html += '<tr class="summary-total-row"><td>TOTAL GLOBAL</td><td>' + total + '</td><td>100 %</td><td></td></tr>';
  html += '</tbody></table></div>';

  body.innerHTML = html;
  document.getElementById("summary-overlay").classList.add("open");
}

/**
 * Ferme la modale de résumé.
 */
function closeSummary() {
  document.getElementById("summary-overlay").classList.remove("open");
}