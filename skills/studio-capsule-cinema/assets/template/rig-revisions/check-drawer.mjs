import assert from 'node:assert/strict';
import fs from 'node:fs';
import {drawerArmPose} from '../assets/vendor/drawer-arm.js';
let minElbowMargin=Infinity,minWristMargin=Infinity,maxStep=0,maxWristWorldX=-Infinity,prev;
for(let i=0;i<=600;i++){
 const r=i/600,p=drawerArmPose({close:1,lean:12*(1-r),release:r}),[s,e,w]=p.points;
 assert(e[0]>=s[0],'Elbow crosses torso');assert(w[0]>20,'Wrist enters torso');
 const worldX=990+w[0]*1.65;assert(worldX<=1147.0001,'Release pushes wrist into drawer');
 minElbowMargin=Math.min(minElbowMargin,e[0]-s[0]);minWristMargin=Math.min(minWristMargin,w[0]-20);maxWristWorldX=Math.max(maxWristWorldX,worldX);
 if(prev)maxStep=Math.max(maxStep,Math.hypot(w[0]-prev[0],w[1]-prev[1]));prev=w;
}
assert(maxStep<1,'Discontinuous release');
const rest=drawerArmPose({close:1,lean:0,release:1});assert(rest.points[2][1]>-80&&rest.points[2][1]<-60,'Hand does not rest beside thigh');
let contactError=0;for(let i=0;i<=100;i++){let close=i/100,pose=drawerArmPose({close,lean:12*close,release:0}),w=pose.points[2],expected=1150-85*(1-close)-3;contactError=Math.max(contactError,Math.abs(990+w[0]*1.65-expected));}assert(contactError<1e-8);
const report={releaseSamples:601,contactSamples:101,minElbowMargin,minWristMargin,maxWristWorldX,maxStep,contactError,rest,limitations:'Numerical joint constraints supplement visual inspection. Projected 2D lengths intentionally transition between contact and resting drawings.'};
fs.writeFileSync(new URL('./v2-constraints.json',import.meta.url),JSON.stringify(report,null,2));console.log(report);
