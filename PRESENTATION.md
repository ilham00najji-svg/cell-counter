# Comptage de Cellules Médullaires — Présentation du Projet

| | |
|---|---|
| **Module** | Nouvelles Technologies et IA dans l'enseignement des sciences |
| **Encadrant** | Pr. Ahmed MHAMDI |
| **Réalisé par** | Ilham NAJJI |

---

## Qu'est-ce que c'est ?

**Cell Counter** est une application web médicale permettant de compter et de classer les cellules sanguines observées au microscope (hémogramme / myélogramme). Elle remplace les compteurs mécaniques utilisés en laboratoire par une interface visuelle moderne et intuitive, accessible directement depuis un navigateur, sans installation.

---

## Problème résolu

En laboratoire d'hématologie, le technicien doit compter manuellement des dizaines de cellules sur une lame de sang et les classer par type. Ce travail est fastidieux et sujet aux erreurs. Cette application centralise le comptage par catégorie, affiche un total en temps réel et permet d'imprimer un résumé structuré.

---

## Fonctionnalités principales

| Fonctionnalité | Description |
|---|---|
| **Cartes visuelles** | Chaque type cellulaire est représenté par une photo réelle découpée en cercle |
| **Clic gauche** | Incrémente le compteur de la cellule (+1) |
| **Clic droit** | Décrémente le compteur (−1), pour corriger une erreur |
| **Total en direct** | Le total global est affiché en permanence dans l'entête |
| **Onglets de catégories** | Navigation entre *Série érythrocytaire* et *Leucocytes* |
| **Résumé** | Affichage d'une synthèse des comptages avec option d'impression |
| **Réinitialisation** | Remise à zéro de tous les compteurs en un clic |
| **Responsive** | S'adapte automatiquement à la largeur de l'écran |

---

## Cellules couvertes

### Série érythrocytaire (globules rouges)
Érythrocyte normal, Cellule cible, Sphérocyte, Ovalocyte, Drépanocyte, Acanthocyte, Dacryocyte, Stomatocyte, Échinocyte, Elliptocyte, Schizocyte mordu, Schistocyte

### Leucocytes (globules blancs)
Neutrophile segmenté, Éosinophile, Basophile, et autres types leucocytaires

---

## Architecture du projet

```
cell-counter/
├── index.html          ← Page principale (structure HTML + navigation)
├── css/
│   └── style.css       ← Styles visuels (variables CSS, thème violet)
├── js/
│   ├── cellData.js     ← Données : types cellulaires et comptages
│   ├── cellDrawing.js  ← Chargement et affichage des images
│   └── sketch.js       ← Logique principale : rendu et interactions
└── cells/              ← Photos JPG des cellules (une par type)
```

---

## Comment ça fonctionne — Les 3 couches

### 1. Couche Données — `cellData.js`

C'est le **cerveau des données**. Ce fichier définit un tableau `cellCategories` contenant toutes les catégories et leurs cellules. Chaque cellule possède :
- `name` : le nom affiché à l'écran
- `count` : le compteur courant (commence à 0)
- `svgKey` : la clé qui correspond au fichier image `.jpg`

Des fonctions utilitaires comme `getTotalCount()` et `eraseAllCounts()` opèrent sur ces données.

### 2. Couche Dessin — `cellDrawing.js`

C'est le **moteur d'affichage des images**. Il utilise la bibliothèque **p5.js** pour :
- Charger toutes les photos JPG au démarrage (`preloadCellImages()`)
- Afficher chaque photo découpée en cercle sur le canvas (`drawCell()`)

Le découpage circulaire est réalisé via le `canvas 2D Context` natif du navigateur (`clip()`), ce qui donne un rendu propre et homogène quelle que soit la forme originale de la photo.

### 3. Couche Interaction — `sketch.js`

C'est le **chef d'orchestre**. Il utilise le cycle de vie de p5.js :
- **`preload()`** : déclenche le chargement des images avant l'affichage
- **`setup()`** : crée le canvas, calcule la grille de cartes selon la largeur disponible
- **`draw()`** : dessine toutes les cartes (fond, image circulaire, badge compteur, libellé)
- **`mousePressed()` / `mouseReleased()`** : détecte les clics gauche et droit pour incrémenter ou décrémenter les compteurs

Le moteur fonctionne en mode **rendu à la demande** (`noLoop()` + `redraw()`) : le canvas ne se redessine que quand l'utilisateur interagit, ce qui économise les ressources.

---

## Technologies utilisées

| Technologie | Rôle |
|---|---|
| **HTML5** | Structure de la page |
| **CSS3** | Mise en forme, variables de thème, responsive design |
| **JavaScript (ES5)** | Logique applicative |
| **p5.js v1.9.4** | Rendu canvas : grille de cartes, images circulaires |
| **Google Fonts (Montserrat)** | Typographie |

> Aucun framework, aucun build tool. Il suffit d'ouvrir `index.html` dans un navigateur.

---

## Flux d'exécution (du démarrage au clic)

```
Ouverture de index.html
        │
        ▼
   preload()  →  chargement de toutes les images JPG
        │
        ▼
   setup()    →  calcul de la grille, création du canvas p5.js
        │
        ▼
   draw()     →  affichage de toutes les cartes avec compteurs à 0
        │
        ▼
   [Clic gauche sur une carte]
        │
        ▼
   mousePressed()  →  détecte la carte sous le curseur
        │
        ▼
   cell.count++    →  incrémente le compteur dans cellData.js
        │
        ▼
   redraw()        →  redessine le canvas avec la nouvelle valeur
        │
        ▼
   [Total mis à jour dans l'entête HTML]
```

---

## Points techniques notables

- **Grille dynamique** : la largeur des cartes est recalculée à chaque redimensionnement de fenêtre (`windowResized()`), garantissant un affichage correct sur tous les écrans.
- **Découpage circulaire des images** : utilisation de `drawingContext.clip()` (canvas 2D natif) pour masquer les images en cercle, une technique qui dépasse les capacités natives de p5.js.
- **Aucune dépendance serveur** : toutes les ressources sont locales, l'application fonctionne hors-ligne.
- **Surbrillance au survol** : une couche de couleur semi-transparente est appliquée sur la carte survolée pour améliorer le retour visuel.

---

## Comment lancer le projet

```bash
# Option 1 — ouverture directe
Double-cliquer sur index.html

# Option 2 — serveur local (recommandé pour le développement)
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

---

*Projet développé en HTML / CSS / JavaScript avec p5.js — sans framework, sans build tool.*
