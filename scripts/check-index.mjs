import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const html=fs.readFileSync('index.html','utf8');
assert.match(html,/<!doctype html>/i);
assert.match(html,/<canvas id="world"/);
assert.doesNotMatch(html,/<script[^>]+src=/i,'External JavaScript dependency detected');
assert.doesNotMatch(html,/https:\/\/cdn\./i,'CDN dependency detected');
const chapters=html.match(/short:'[^']+'/g) || [];
assert.equal(chapters.length,5,'Expected five learning chapters');
for(const id of ['world','chapters','bookTitle','question','choices','feedback','viscosity','gas','pressure','run','stop','reset','cutBtn','rotateBtn','homeBtn']){
  assert.ok(html.includes('id="'+id+'"'),'Missing interactive element: '+id);
}
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length,1,'Expected one self-contained inline script');
new vm.Script(scripts[0][1],{filename:'volcano-inline.js'});
assert.ok(html.includes('requestAnimationFrame(draw)'),'Expected animated scene');
assert.ok(html.includes('pointermove'),'Expected 3D camera interaction');
console.log('PASS: standalone HTML, five chapters, controls, inline JavaScript syntax, no CDN');
