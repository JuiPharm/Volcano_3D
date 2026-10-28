const {test}=require('node:test');
const assert=require('node:assert/strict');
test('energy is conserved over a complete discharge',async()=>{
 const {createState,step}=await import('./physics.mjs');
 let s=createState(60);
 for(let i=0;i<1000;i++) s=step(s,.1,{temperature:1100,gas:4,viscosity:50});
 assert.ok(Math.abs(s.stored+s.heat+s.kinetic+s.fracture-60e6)<.01);
 assert.ok(s.stored>=0); assert.ok(s.kinetic>0);
});
test('pause leaves energy and elapsed time unchanged',async()=>{
 const {createState,step}=await import('./physics.mjs');
 const s=createState(60); assert.deepEqual(step(s,0,{temperature:1100,gas:4,viscosity:50}),s);
});
test('more gas increases kinetic energy; viscosity slows release',async()=>{
 const {createState,step}=await import('./physics.mjs');
 const run=(gas,viscosity)=>step(createState(60),1,{temperature:1100,gas,viscosity});
 assert.ok(run(6,50).kinetic>run(1,50).kinetic);
 assert.ok(run(4,90).stored>run(4,10).stored);
});
