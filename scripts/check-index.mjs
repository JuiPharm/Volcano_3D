import fs from 'node:fs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const html = fs.readFileSync('index.html', 'utf8');
const app = fs.readFileSync('app.mjs', 'utf8');
const scene = fs.readFileSync('scene.mjs', 'utf8');
const physics = fs.readFileSync('physics.mjs', 'utf8');

assert.match(html, /<!doctype html>/i);
assert.match(html, /<link rel="stylesheet" href="styles\.css">/);
assert.match(html, /<script type="module" src="app\.mjs"><\/script>/);
assert.match(html, /"three":"https:\/\/cdn\.jsdelivr\.net\/npm\/three@0\.164\.1/);
for (const mode of ['explore', 'simulation', 'learning']) {
  assert.match(html, new RegExp(`data-mode="${mode}"`), `Missing ${mode} mode`);
}
for (const id of ['scene', 'cutaway', 'rotate', 'energy', 'temperature', 'gas', 'viscosity', 'run', 'reset', 'lesson', 'answers', 'stored', 'heat', 'kinetic', 'fracture']) {
  assert.ok(html.includes(`id="${id}"`), `Missing interactive element: ${id}`);
}
assert.equal((app.match(/\{title:'\d{2} \/ /g) || []).length, 4, 'Expected four learning chapters');
assert.match(scene, /OrbitControls/);
assert.match(app, /requestAnimationFrame\(frame\)/);
assert.match(scene, /OrbitControls\(camera,renderer\.domElement\)/);
assert.match(physics, /state\.stored-released/);
for (const file of ['app.mjs', 'scene.mjs', 'physics.mjs']) {
  execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
}
console.log('PASS: 3 modes, 4 chapters, 3D controls, energy ledger, JavaScript syntax');
