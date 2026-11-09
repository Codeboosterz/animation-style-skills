import { drawerArmPose } from './drawer-arm.js';
import * as THREE from './three.module.js';
const W=1920,H=1080;
const P={bg:'#090e0e',ground:'#323a3b',ink:'#74786e',skin:'#e5e1ca',face:'#303632',prop:'#20242e',edge:'#555c69',pink:'#c0477b'};
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lerp=(a,b,p)=>a+(b-a)*p;
const ease=(a,b,t)=>{const p=clamp((t-a)/(b-a));return p*p*(3-2*p)};
let c;
function line(points,col=P.edge,width=3){c.beginPath();c.moveTo(...points[0]);for(const p of points.slice(1))c.lineTo(...p);c.strokeStyle=col;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.stroke()}
function shape(points,fill,stroke=P.edge,width=3){c.beginPath();c.moveTo(...points[0]);for(const p of points.slice(1))c.lineTo(...p);c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.lineJoin='round';c.stroke()}}
function rect(x,y,w,h,fill,r=0,stroke=null,lw=3){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke()}}
function oval(x,y,rx,ry,fill,stroke=null,lw=2.2){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke()}}
function limb(points,w=15,fill=P.skin){line(points,P.ink,w+4.4);line(points,fill,w)}
function text(s,x,y,size=46,color='#e4e6db',align='center'){c.font=`${size}px "Patrick Hand"`;c.textAlign=align;c.textBaseline='middle';c.fillStyle=color;c.fillText(s,x,y)}
function face(x,y,angle=0,mood='tired',gaze=0,blink=0,hood=false){c.save();c.translate(x,y);c.rotate(angle);
 if(hood){oval(0,-1,40,48,'#383e48','#666d75',2.5);shape([[-31,19],[-37,46],[37,46],[31,19]],'#383e48','#666d75',2.5)}
 oval(0,0,31,37,P.skin,P.ink); // consistent head silhouette
 const ey=mood==='tired'?4:1;
 if(blink>.8){line([[-16,ey],[-9,ey+1]],P.face,2.6);line([[8,ey+1],[15,ey]],P.face,2.6)}else{oval(-12+gaze,ey,2.6,3.5,P.face);oval(12+gaze,ey,2.6,3.5,P.face)}
 if(mood==='tired'){line([[-19,-8],[-7,-12]],P.face,3);line([[6,-12],[18,-8]],P.face,3);line([[-18,12],[-8,14]],'#a5a695',1.6);line([[8,14],[18,12]],'#a5a695',1.6);line([[-6,24],[0,21],[6,23]],P.face,2)}
 else if(mood==='resolve'){line([[-19,-12],[-7,-7]],P.face,3);line([[7,-7],[19,-12]],P.face,3);line([[-6,21],[6,21]],P.face,2)}
 else {line([[-18,-10],[-8,-11]],P.face,2.5);line([[8,-11],[18,-10]],P.face,2.5);c.beginPath();c.arc(0,16,8,.15,Math.PI-.15);c.strokeStyle=P.face;c.lineWidth=2;c.stroke()}
 c.restore();}
function hand(x,y,angle=0,open=false){c.save();c.translate(x,y);c.rotate(angle);oval(0,0,9,11,P.skin,P.ink,2);if(open){line([[-3,-2],[-3,7]],'#aaa996',1);line([[2,-2],[2,8]],'#aaa996',1)}c.restore()}
function ik(a,b,L1,L2,sign=1){const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.max(.001,Math.hypot(dx,dy)),dd=Math.min(d,L1+L2-.001),u=(L1*L1-L2*L2+dd*dd)/(2*dd),h=Math.sqrt(Math.max(0,L1*L1-u*u));return [a[0]+dx/d*u-dy/d*h*sign,a[1]+dy/d*u+dx/d*h*sign]}
function drawerHand(x,y,angle,relax){
 c.save();c.translate(x,y);c.rotate(angle);
 oval(0,0,9,11,P.skin,P.ink,2);
 c.globalAlpha=1-relax;
 line([[-3,-2],[-3,7]],'#aaa996',1);line([[2,-2],[2,8]],'#aaa996',1);
 c.restore();
}
function standing(x,y,s,opt={}){c.save();c.translate(x,y);c.scale(s,s);const lean=opt.lean||0,sh=[lean,-143],hip=[0,-80];
 limb([[-9,-78],[-15,-40],[-16,-8]],17);limb([[9,-78],[16,-39],[17,-8]],17);limb([[-17,-7],[-23,-4]],14);limb([[17,-7],[26,-4]],14);
 const left=opt.left||[[sh[0]-18,sh[1]+5],[sh[0]-27,-105],[sh[0]-26,-72]];
 limb(left,13);hand(...left[2]);
 limb([sh,hip],37); // shoulder tabs are beneath torso
 if(opt.hood){limb([sh,hip],37,'#414653');line([[lean-15,-144],[lean,-122],[lean+15,-144]],'#70747d',2)}
 limb([[lean,-146],[lean,-162]],16);
 const right=opt.right||[[sh[0]+18,sh[1]+5],[sh[0]+28,-106],[sh[0]+27,-73]];
 limb(right,13);if(opt.drawerHand!==undefined)drawerHand(...right[2],opt.handAngle||0,opt.drawerHand);else hand(...right[2],opt.handAngle||0,!!opt.openHand);
 face(lean,-188,opt.headAngle||0,opt.mood||'tired',opt.gaze||0,opt.blink||0,opt.hood);
 c.restore();}
function shadow(x,y,s,alpha=1){c.save();c.translate(x,y);c.scale(s,s);c.globalAlpha=alpha;const black='#07070a';
 c.shadowColor='#ae225b';c.shadowBlur=9;
 line([[-12,-78],[-15,-8]],P.pink,19);line([[12,-78],[14,-8]],P.pink,19);
 line([[-12,-78],[-15,-8]],black,15);line([[12,-78],[14,-8]],black,15);
 line([[-19,-143],[-33,-105],[-29,-72]],P.pink,15);line([[-19,-143],[-33,-105],[-29,-72]],black,11);
 line([[19,-143],[35,-109],[29,-73]],P.pink,15);line([[19,-143],[35,-109],[29,-73]],black,11);
 limbShadow();oval(0,-188,32,38,black,P.pink,1.8);c.shadowBlur=0;
 shape([[-19,-190],[-7,-183],[-13,-179]],P.pink,null);shape([[19,-190],[7,-183],[13,-179]],P.pink,null);
 c.beginPath();c.arc(0,-176,12,.25,Math.PI-.25);c.strokeStyle=P.pink;c.lineWidth=2;c.stroke();c.restore();
 function limbShadow(){line([[0,-142],[0,-80]],P.pink,40);line([[0,-142],[0,-80]],black,36)}
}
function room(){rect(0,0,W,H,P.bg);line([[0,855],[W,855]],P.ground,3);rect(0,858,W,222,'#080c0c')}
function windowSet(x,y,scale=1,dawn=0){c.save();c.translate(x,y);c.scale(scale,scale);let fill='#141c29';if(dawn){const g=c.createLinearGradient(0,0,0,190);g.addColorStop(0,'#323049');g.addColorStop(1,'#b97e66');fill=g}rect(0,0,230,205,fill,15,P.edge,5);line([[115,0],[115,205]],P.edge,3);line([[0,102],[230,102]],P.edge,3);if(!dawn)oval(170,58,24,24,'#aeb8c5');c.restore()}
function bed(x=500,y=735,s=1){c.save();c.translate(x,y);c.scale(s,s);rect(-20,-180,14,295,'#292c35',7,P.edge);rect(520,-50,14,165,'#292c35',7,P.edge);rect(0,-36,520,84,'#242a38',10,P.edge);rect(5,-8,402,44,'#252d3e',12,'#343d50');oval(455,-26,56,19,'#3b4253',P.edge);line([[0,52],[520,52]],P.edge,5);c.restore()}
function phone(x,y,a=0,s=1){c.save();c.translate(x,y);c.rotate(a);c.scale(s,s);rect(-18,-30,36,60,'#11161c',5,'#7a838b',2.5);rect(-13,-24,26,43,'#708699',2);line([[-8,-16],[7,-16]],'#a4b0b5',2);line([[-8,-8],[8,-8]],'#8d9eab',2);oval(0,24,2,2,'#949da7');c.restore()}
function clock(x,y,label){rect(x,y,113,68,'#242028',5,P.edge);text(label,x+56,y+32,34,'#bc6b5d')}
function blinkAt(t,at){return ease(at,at+.07,t)*(1-ease(at+.12,at+.22,t))}
function captions(s,state){c.save();c.globalAlpha=state.caption; text(s,960,178,52);c.restore()}
function drawBed(t,state){room();windowSet(490,315,.95);bed(430,745,1.1);rect(1080,692,158,160,'#25252c',6,P.edge);line([[1080,745],[1238,745]],P.edge);oval(1158,774,4,4,'#727679');clock(1100,623,t<2.6?'11:08':'3:17');
 // reclining pose, head right on pillow, phone held above face
 c.save();c.translate(910,696);c.scale(1.32,1.32);
 limb([[-48,4],[-105,1],[-160,6]],24);limb([[-155,6],[-209,5],[-250,11]],17);
 limb([[-61,3],[-95,7],[-135,11]],14); // resting far arm
 limb([[-55,1],[-27,2]],23);
 const sh=[-49,-2],el=[-80,-45],wr=[-47,-101-state.scroll*3];
 limb([sh,el,wr],14);phone(wr[0]+5,wr[1]-19,-.25,1);hand(wr[0],wr[1],-.2);line([[wr[0]+3,wr[1]-8],[wr[0]+8-state.scroll*2,wr[1]-14]],P.skin,7);
 face(0,-7,.22,'tired',-2,blinkAt(t,1.7));c.restore();
 // blanket occludes legs and torso cleanly
 c.save();c.translate(430,745);c.scale(1.1,1.1);shape([[10,-33],[307,-33],[330,-7],[330,33],[10,33]],'#252d3e','#465064',2.5);c.restore();
 shadow(1450,850,1.5,state.shadow);c.save();c.globalAlpha=state.shadow;text('just one more',1460,455,40,P.pink);c.restore();captions('Every night ended the same.',state)
}
function drawMirror(t,state){room();rect(1040,340,370,350,'#262d3a',13,P.edge,5);rect(1053,354,344,320,'#141e28',7);
 // reflection is the same head/pose in the glass, aligned at eye level
 c.save();c.beginPath();c.rect(1056,357,338,314);c.clip();c.globalAlpha=.65;standing(1220,852,1.8,{lean:state.lean,headAngle:state.head,gaze:-2,mood:'tired',blink:blinkAt(t,1.9)});c.restore();
 line([[1080,380],[1105,355]],'#46515e',3);line([[1365,650],[1388,627]],'#46515e',3);
 rect(1070,706,315,28,'#373d47',9,P.edge);rect(1195,735,58,115,'#2c333c',6,P.edge);rect(1157,837,134,18,'#303740',5,P.edge);
 standing(840,852,1.8,{lean:state.lean,headAngle:state.head,gaze:state.gaze,mood:'tired',blink:blinkAt(t,1.9)});
 captions('Morning came too soon.',state)
}
function drawerSet(open){const dx=1150-open;
 rect(1150,487,330,363,'#232630',5,P.edge,4);rect(1167,645,295,83,'#252832',4,P.edge);rect(1167,746,295,83,'#252832',4,P.edge);line([[1270,686],[1350,686]],'#747b86',7);line([[1270,787],[1350,787]],'#747b86',7);
 // top of open tray and its side recede into cabinet
 shape([[dx,511],[dx+262,511],[1470,487],[1165,487]],'#343a46',P.edge,3);
 if(open>12){c.save();c.beginPath();c.rect(dx,467,open+260,47);c.clip();phone(dx+155,494,Math.PI/2,.9);c.restore();}
 rect(dx,514,330,101,'#2b303b',4,'#656d7a',3);line([[dx+115,561],[dx+207,561]],'#858c97',7);
 rect(1140,465,350,22,'#313640',6,P.edge,3);
 return dx;
}
function drawDrawer(t,state){room();const open=85*(1-state.close);const dx=drawerSet(open);const heroX=990,heroY=851,s=1.65;
 const arm=drawerArmPose(state);
 standing(heroX,heroY,s,{lean:state.lean,right:arm.points,drawerHand:arm.relax,handAngle:arm.handAngle,mood:'resolve',headAngle:.08,gaze:3,blink:blinkAt(t,4.2)});
 // hand touches the left front edge until release; fingers overlay the prop edge
 captions('He changed the next move.',state);text('DAY 1',350,306,30,'#8c9893','left');
}
function pushup(x,y,s,down){c.save();c.translate(x,y);c.scale(s,s);
 const angle=lerp(.65,.22,down),toes=[200,0],handA=[80,-5],handB=[61,-5];const sh=[200-160*Math.cos(angle),-160*Math.sin(angle)],hip=[200-90*Math.cos(angle),-90*Math.sin(angle)];
 // far supporting limb and far foot first
 const shB=[sh[0]-11,sh[1]+3],elB=ik(shB,handB,50,50,-1);limb([shB,elB,handB],13);oval(handB[0],-4,15,6,P.skin,P.ink,2);
 limb([hip,[lerp(hip[0],200,.5),hip[1]*.5],toes],18);limb([[hip[0]-6,hip[1]+4],[lerp(hip[0],200,.5)-6,hip[1]*.5+4],[194,-4]],15);
 limb([sh,hip],32);limb([[sh[0]-2,sh[1]-2],[sh[0]-26,sh[1]-11]],17);
 face(sh[0]-39,sh[1]-18,-.5,'resolve',-2,0);
 const el=ik(sh,handA,50,50,-1);limb([sh,el,handA],15);oval(handA[0],-4,16,6,P.skin,P.ink,2);line([[handA[0]+3,-4],[handA[0]+10,-4]],'#999e90',1);
 c.restore();}
function drawPush(t,state){room();windowSet(1020,339,.78);bed(975,747,.8);pushup(440,850,1.65,state.down);shadow(1570,851,lerp(1.25,.42,state.shrink),lerp(1,.5,state.shrink));captions('The urge rose. Then eased.',state);text('DAY 1',350,306,30,'#8c9893','left');}
function tick(x,y,p,col='#6f9d85'){if(p<=0)return;const a=[x-15,y],b=[x-3,y+12],d=[x+20,y-17];const q=clamp(p*2);line([a,[lerp(a[0],b[0],q),lerp(a[1],b[1],q)]],col,5);if(p>.5){const q=(p-.5)*2;line([b,[lerp(b[0],d[0],q),lerp(b[1],d[1],q)]],col,5)}}
function drawCalendar(t,state){room();const X=970,Y=330,cell=57;
 rect(X,Y,426,440,'#d6d3bf',8,'#72796e',4);rect(X,Y,426,62,'#aa5147',8);rect(X,Y+40,426,22,'#aa5147');text('KEEP GOING',X+213,Y+31,33,'#efe7ce');
 for(let k=0;k<7;k++){const xx=X+13+k*cell;line([[xx,Y+72],[xx,Y+415]],'#b6b8a6',2)}
 for(let k=0;k<7;k++){const yy=Y+72+k*57;line([[X+13,yy],[X+412,yy]],'#b6b8a6',2)}
 for(let k=0;k<24;k++){const xx=X+42+k%7*cell,yy=Y+101+Math.floor(k/7)*57;if(k===22){line([[xx-13,yy-13],[xx+13,yy+13]],'#b05a74',5);line([[xx+13,yy-13],[xx-13,yy+13]],'#b05a74',5)}else if(k===23)tick(xx,yy,state.check);else tick(xx,yy,1)}
 const target=[X+42+2*cell,Y+101+3*57],hx=910,hy=851,sc=1.7;
 const sh=[19,-139],rest=[35,-77],aim=[(target[0]-26-hx)/sc,(target[1]-hy)/sc];const wrist=[lerp(rest[0],aim[0],state.point),lerp(rest[1],aim[1],state.point)];const elbow=ik(sh,wrist,48,48,1);
 standing(hx,hy,sc,{right:[sh,elbow,wrist],headAngle:lerp(.17,0,state.point),mood:state.point<.2?'tired':'resolve',gaze:3});
 if(state.point>.85){const wx=hx+wrist[0]*sc,wy=hy+wrist[1]*sc;line([[wx+8,wy],[wx+23,wy-2]],P.ink,10);line([[wx+8,wy],[wx+23,wy-2]],P.skin,6)}
 captions('One setback wasn’t zero.',state);
}
function drawRoof(t,state){const g=c.createLinearGradient(0,0,0,850);g.addColorStop(0,'#191923');g.addColorStop(.6,'#5d3a43');g.addColorStop(1,'#c27f50');rect(0,0,W,H,g);
 const heights=[180,265,130,345,210,150,280,190,245,140,365,180,260,150,320,195];for(let i=0;i<heights.length;i++){const x=i*131-45,h=heights[i];rect(x,850-h,101,h,'#11191d');for(let j=0;j<3;j++)for(let k=0;k<2;k++)if((i+j+k)%3===0)rect(x+20+k*40,880-h+j*43,9,15,'#9b7755')}
 rect(0,840,W,240,'#151b20');line([[0,840],[W,840]],'#52545a',4);line([[0,933],[W,933]],'#363e45',3);
 rect(320,580,140,258,'#292c32',3,'#4d5059',3);rect(335,595,110,242,'#20252b',2);oval(425,728,4,4,'#73767b');shadow(406,837,.38,.5);
 // seated actor: seat hips contact the roof edge; both calves hang in front
 c.save();c.translate(1070,840);c.scale(1.55,1.55);
 limb([[-8,-12],[31,15],[59,60]],17);limb([[8,-10],[48,13],[79,56]],17);limb([[59,60],[69,65]],16);limb([[79,56],[88,62]],16);
 limb([[0,-100],[0,-15]],42,'#414652');line([[-15,-100],[0,-82],[15,-100]],'#737780',2);
 limb([[-21,-96],[-27,-53],[4,-35]],13,'#414652');limb([[20,-96],[31,-55],[13,-34]],13,'#414652');hand(4,-34);hand(13,-34);
 face(0,-141,lerp(.12,-.06,state.look),'soft',lerp(0,4,state.look),blinkAt(t,2.3),true);c.restore();
 captions('He chose again.',state);
}
const scenes=[drawBed,drawMirror,drawDrawer,drawPush,drawCalendar,drawRoof];
export async function createStory(canvas,index){await document.fonts.load('52px "Patrick Hand"');
 const source=document.createElement('canvas');source.width=W;source.height=H;const ctx=source.getContext('2d');
 const renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:false,preserveDrawingBuffer:true});renderer.setSize(W,H,false);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-W/2,W/2,H/2,-H/2,.1,10);camera.position.z=2;
 const texture=new THREE.CanvasTexture(source);texture.colorSpace=THREE.SRGBColorSpace;texture.minFilter=THREE.LinearFilter;texture.magFilter=THREE.LinearFilter;texture.generateMipmaps=false;
 const material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false});scene.add(new THREE.Mesh(new THREE.PlaneGeometry(W,H),material));
 const state={t:0,caption:1,shadow:0,scroll:0,lean:0,head:0,gaze:3,close:0,release:0,down:0,shrink:0,point:0,check:0,look:0};
 function draw(){c=ctx;c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;scenes[index](state.t,state);texture.needsUpdate=true;renderer.render(scene,camera)}
 await renderer.compileAsync(scene,camera);draw();return{state,draw};
}
export function animate(tl,s,i,duration){tl.to(s,{t:duration,duration,ease:'none'},0);
 if(i===0){tl.to(s,{shadow:1,duration:.8,ease:'power1.inOut'},.7);tl.to(s,{scroll:1,duration:.2,ease:'sine.inOut'},2.1).to(s,{scroll:0,duration:.3,ease:'sine.inOut'},2.3)}
 if(i===1){tl.to(s,{lean:7,head:.15,gaze:-2,duration:.65,ease:'sine.inOut'},1.4)}
 if(i===2){tl.to(s,{close:1,lean:12,duration:1.3,ease:'power2.inOut'},1.1);tl.to(s,{release:1,lean:0,duration:.65,ease:'power2.inOut'},2.75)}
 if(i===3){for(const a of [.55,2.7]){tl.to(s,{down:1,duration:.65,ease:'sine.inOut'},a);tl.to(s,{down:0,duration:.65,ease:'sine.inOut'},a+.9)}tl.to(s,{shrink:1,duration:3.7,ease:'sine.inOut'},.65)}
 if(i===4){tl.to(s,{point:1,duration:.75,ease:'power2.inOut'},1.05);tl.to(s,{check:1,duration:.5,ease:'none'},2.1);tl.to(s,{point:0,duration:.65,ease:'power2.inOut'},3.3)}
 if(i===5){tl.to(s,{look:1,duration:1.2,ease:'sine.inOut'},1.1)}
}
