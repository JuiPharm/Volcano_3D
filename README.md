# Every Joule — Volcano

An interactive 3D physics book about volcanoes, in Thai. Explore a cutaway volcano, run a controlled eruption experiment, and follow the energy ledger from stored energy to heat, motion and fracture work.

## Modes

- **Explore:** rotate and zoom the 3D stratovolcano, open the internal section, and inspect the magma chamber, conduit, crater and lava flow.
- **Simulation:** adjust initial energy, magma temperature, illustrative gas fraction and relative viscosity; start, pause, reset and compare two presets.
- **Learning:** four guided chapters with scene-linked views and questions with feedback.

## Run locally

Run `node server.cjs`, then open http://127.0.0.1:4173. Serve over HTTP because JavaScript modules do not work reliably from `file://`. No npm install or build is required. The 3D scene loads Three.js 0.164.1 from jsDelivr and requires internet access; the energy model and lessons continue to work if the 3D import fails.

## Model limits

The simulation is an illustrative teaching model, not a calibrated geophysical model, eruption forecast or VEI calculation. Initial energy is an assumed available reservoir, not the volcano's total thermal energy. The energy ledger is closed: `E₀ = E_stored + Q + E_kinetic + W`. At each time step, released energy is partitioned among heat, kinetic energy and fracture/sound work. Rate and partition coefficients are chosen for teaching comparisons, not based on measured values. Temperature and viscosity can be changed independently. Particle trails are visual illustrations and do not solve fluid dynamics.

The [previous standalone Volcano experience](./volcano-legacy.html) remains available for its offline software-rendered 3D model, five-chapter learning flow, and saved progress.

## Validation

Run `node scripts/check-index.mjs` and `node --test physics.test.cjs`. GitHub Actions runs both checks on pushes and pull requests.
