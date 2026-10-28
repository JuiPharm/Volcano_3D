export const createState = (energy = 60) => ({initial:energy*1e6,stored:energy*1e6,heat:0,kinetic:0,fracture:0,time:0});
// Illustrative closed ledger, not calibrated geophysics. Values are joules.
export function step(state,dt,{temperature,gas,viscosity}) {
 if(dt<=0 || state.stored<=0) return {...state};
 const rate=(.025+(temperature-700)/12000+gas*.006)/(1+viscosity/60);
 const released=state.stored*(1-Math.exp(-rate*dt));
 const k=.08+gas*.035, f=.06+viscosity*.001;
 return {...state,stored:state.stored-released,heat:state.heat+released*(1-k-f),kinetic:state.kinetic+released*k,fracture:state.fracture+released*f,time:state.time+dt};
}
