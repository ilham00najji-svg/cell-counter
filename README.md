# Bone Marrow Cell Counter

> **Module :** Nouvelles Technologies et IA dans l'enseignement des sciences  
> **Encadrant :** Pr. Ahmed MHAMDI  
> **Réalisé par :** Ilham NAJJI

A beginner-friendly **p5.js** web application for counting bone marrow cells in a medical laboratory setting.

![Preview](preview.png)

## Features

- **Visual cell cards** — each cell type is drawn as a stylized illustration using p5.js
- **Click to count** — left-click a cell card to increment its count
- **Right-click / long-press to undo** — decrement a miscount
- **Live total** — running total displayed at the top
- **Erase all** — one-click reset
- **Responsive** — adapts to different screen widths
- **No build tools** — just open `index.html` in a browser

## Cell Categories

| Category | Cell Types |
|----------|-----------|
| Red blood cell series | Proerythroblast, Basophilic, Polychromatophilic, Orthochromatic e., Reticulocyte, Erythrocyte |
| Granulocytes | Myeloblast, Promyelocyte, Myelocyte, Metamyelocyte, Band neutrophil, Seg. neutrophil |
| Other WBCs | Eosinophil, Basophil, Lymphocyte, Monocyte, Plasma cell, Blast (other) |
| Other cells | Megakaryocyte, Macrophage, Unidentified |

## Project Structure

```
cell-counter/
├── index.html          ← Entry point
├── css/
│   └── style.css       ← All styles (CSS variables for theming)
├── js/
│   ├── cellData.js     ← Cell types, categories, counts, helpers
│   ├── cellDrawing.js  ← p5.js drawing functions for each cell style
│   └── sketch.js       ← Main p5.js sketch (setup, draw, interaction)
└── README.md
```

## How to Run

1. **Open directly** — double-click `index.html` in your file explorer
2. **Or use a local server** (recommended for development):
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .
   ```
   Then visit `http://localhost:8000`

## How It Works (for beginners)

### 1. Data layer (`cellData.js`)
Defines an array of categories, each containing cell objects with `name`, `count`, `fillColor`, `nucleusColor`, and a `style` hint. Functions like `getTotalCount()` and `eraseAllCounts()` operate on this data.

### 2. Drawing layer (`cellDrawing.js`)
A `drawCell()` function takes coordinates, size, colors, and a style string, then uses p5.js shapes (`ellipse`, `arc`, `rect`) to paint the cell. Each style (e.g. `"kidney-nucleus"`, `"segmented-nucleus"`) triggers a different helper function.

### 3. Sketch layer (`sketch.js`)
- `setup()` creates the canvas and computes the card grid layout
- `draw()` renders all section titles and cell cards
- `mousePressed()` / `mouseReleased()` handle click-to-count and long-press-to-undo

### Key p5.js concepts used
- `setup()` and `draw()` lifecycle
- `noLoop()` + `redraw()` for on-demand rendering (efficient)
- `push()` / `pop()` for isolated transformations
- `fill()`, `stroke()`, `ellipse()`, `rect()`, `arc()` for drawing
- `mouseX`, `mouseY` for interaction
- `windowResized()` for responsive behavior

## Customization

- **Add/remove cell types** — edit the `cellCategories` array in `cellData.js`
- **Change colors** — modify `fillColor` and `nucleusColor` arrays (RGB)
- **Change theme** — edit CSS variables in `css/style.css`
- **Change grid columns** — edit `COLS` in `sketch.js`

## License

MIT — free for educational and clinical use.
