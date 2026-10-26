# VOLCANO — The Living Earth 🌋

Interactive Science Book about volcanoes, inspired by the instructional approach of [Every Joule](https://iamtechartist.com/every-joule/) (Predict → Test → Prove). This project uses **original code and diagrams**; it does not copy the Every Joule code or assets.

## Live site

https://juipharm.github.io/Volcano_3D/

## Features

- Five Thai/English learning chapters, each with a self-check question
- Rotatable and zoomable software-rendered 3D volcano, interactive cutaway and labels
- Eruption experiment: viscosity, dissolved gases, pressure and presets
- Animated ash and lava, pause/step/reset controls
- Saved learning progress with localStorage where browser storage is available
- One **index.html** file; no external libraries, WebGL, CDN, compilation or build step
- Responsive layout for phones, tablets and desktops

## Running

Open `index.html` in a modern browser. GitHub Pages deploys automatically from the repository configuration. Internet connectivity is not required for the model itself.

## Limits

The eruption simulation is a **qualitative educational illustration**, not a geophysical calculation or disaster prediction. Physical parameters do not report measured magnitudes or actual Volcanic Explosivity Index (VEI).

## Quality checks

`node scripts/check-index.mjs` validates inline JavaScript, required controls, five chapters, and no external dependencies. GitHub Actions runs this on push/PR. Browser interaction smoke tests were completed locally in Chromium at 1440px desktop and 390px mobile sizes.

## Scientific background

- [USGS: How Do Volcanoes Erupt?](https://www.usgs.gov/faqs/how-do-volcanoes-erupt)
- [USGS: Eruption Styles](https://volcanoes.usgs.gov/volcanic_ash/eruption_styles.html)
- [USGS: Volcanoes! Lesson 1](https://pubs.usgs.gov/gip/70043848/lesson-1.pdf)
