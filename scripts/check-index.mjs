import fs from 'node:fs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const html = fs.readFileSync('index.html', 'utf8');
const importMap = html.match(/<script type="importmap">([\s\S]*?)<\/script>/);
assert.ok(importMap, 'Missing ES module import map');
const imports = JSON.parse(importMap[1]).imports;
assert.ok(/^https:\/\/cdn\.jsdelivr\.net\/npm\/three@0\.164\.1\/build\/three\.module\.js$/.test(imports.three));
assert.ok(/^https:\/\/cdn\.jsdelivr\.net\/npm\/three@0\.164\.1\/examples\/jsm\/$/.test(imports['three/addons/']));
const esm = html.match(/<script type="module">([\s\S]*?)<\/script>/);
assert.ok(esm, 'Missing module script');
assert.match(esm[1], /from ['"]three['"]/);
assert.match(esm[1], /from ['"]three\/addons\/controls\/OrbitControls\.js['"]/);
for (const id of ['scene', 'toggle', 'reset', 'view', 'power', 'visc', 'wind', 'status', 'vei', 'count', 'flow']) {
  assert.ok(html.includes(`id="${id}"`), `Missing control: ${id}`);
}
const check = spawnSync(process.execPath, ['--input-type=module', '--check'], { input: esm[1], encoding: 'utf8' });
assert.equal(check.status, 0, `JavaScript module syntax error: ${check.stderr}`);
console.log('PASS: HTML controls, Three.js imports, import map, JavaScript syntax');
