// Drawer-specific 2D pose controls. Contact uses the approved IK pose;
// release uses authored rotations so the elbow never changes bend side.
const mix=(a,b,t)=>a+(b-a)*t;
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>x*x*(3-2*x);
const joint=(a,b,l1,l2)=>{const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy),u=(l1*l1-l2*l2+d*d)/(2*d),h=Math.sqrt(Math.max(0,l1*l1-u*u));return[a[0]+dx/d*u-dy/d*h,a[1]+dy/d*u+dx/d*h]};
export const drawerRestPose=Object.freeze({shoulder:[20,-139],upperAngle:80*Math.PI/180,forearmAngle:Math.PI/2,upperProjectedLength:36,forearmProjectedLength:34});
export function drawerArmPose({close,lean,release}){
 const p=clamp(release),shoulder=[20+lean,-139];
 if(p===0){const drawerX=1150-85*(1-close),wrist=[(drawerX-3-990)/1.65,(575-851)/1.65];return{points:[shoulder,joint(shoulder,wrist,48,48),wrist],handAngle:-.25,relax:0};}
 const initialShoulder=[32,-139],initialWrist=[(1150-3-990)/1.65,(575-851)/1.65],initialElbow=joint(initialShoulder,initialWrist,48,48);
 const upperStart=Math.atan2(initialElbow[1]-initialShoulder[1],initialElbow[0]-initialShoulder[0]);
 const lowerStart=Math.atan2(initialWrist[1]-initialElbow[1],initialWrist[0]-initialElbow[0]);
 // These are projected 2D lengths: the reaching view turns toward the body's
 // frontal resting view. The approved contact drawing retains its dimensions.
 const upperAngle=mix(upperStart,drawerRestPose.upperAngle,1-(1-p)*(1-p)),lowerAngle=mix(lowerStart,drawerRestPose.forearmAngle,smooth(p));
 const l1=mix(48,drawerRestPose.upperProjectedLength,p),l2=mix(48,drawerRestPose.forearmProjectedLength,p);
 const elbow=[shoulder[0]+Math.cos(upperAngle)*l1,shoulder[1]+Math.sin(upperAngle)*l1];
 const wrist=[elbow[0]+Math.cos(lowerAngle)*l2,elbow[1]+Math.sin(lowerAngle)*l2];
 return{points:[shoulder,elbow,wrist],handAngle:mix(-.25,0,smooth(p)),relax:smooth(p)};
}
