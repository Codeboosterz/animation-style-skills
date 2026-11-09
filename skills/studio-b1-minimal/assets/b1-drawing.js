// Drawing source from the approved B1 revision. Browser-adapted module;
// the archived MP4 is the visual authority. Bind StoryHand to a licensed font.
const W=1280,H=610;let c;
const C={ink:'#282c2c',paper:'#FDFDFC',desk:'#F7F7F2',grey:'#B5B9B6',light:'#E9EBE7',screen:'#FFFFFF',yellow:'#F1CE6C',coffee:'#79623F'};
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=v=>{v=clamp(v);return v*v*(3-2*v)};
const mix=(a,b,t)=>a+(b-a)*smooth(t);
const pulse=(t,a,b,d,e)=>smooth((t-a)/(b-a))*(1-smooth((t-d)/(e-d)));
function line(p,color=C.ink,width=2){c.beginPath();c.moveTo(...p[0]);for(const v of p.slice(1))c.lineTo(...v);c.strokeStyle=color;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.stroke();}
function shape(cmds,fill=C.paper,stroke=C.ink,width=2.5){c.beginPath();for(const [op,...v]of cmds){if(op==='M')c.moveTo(...v);if(op==='L')c.lineTo(...v);if(op==='C')c.bezierCurveTo(...v);if(op==='Q')c.quadraticCurveTo(...v);if(op==='Z')c.closePath();}if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.stroke();}}
function ellipse(x,y,rx,ry,fill=C.paper,stroke=C.ink,width=2){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function rect(x,y,w,h,fill=C.paper,r=4,stroke=C.ink,lw=2){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
function txt(s,x,y,size=24,color=C.ink,align='left'){c.font=`${size}px StoryHand`;c.textAlign=align;c.textBaseline='middle';c.fillStyle=color;c.fillText(s,x,y);}
function poly(p,fill=C.paper,stroke=C.ink,w=2){shape([['M',...p[0]],...p.slice(1).map(q=>['L',...q]),['Z']],fill,stroke,w);}
function turn(x,y,a,fn){c.save();c.translate(x,y);c.rotate(a);fn();c.restore();}

// One fixed workspace shared by all camera crops. All dimensions are world/design pixels.
const set={screen:[610,165,350,216],mug:[283,420],phone:[1122,447],pencils:[[870,550],[902,565]],papers:[1092,365]};
function clock(){ellipse(1040,136,40,40,C.paper,'#A5AAA5',1.4);for(let i=0;i<12;i++){const a=i*Math.PI/6;line([[1040+Math.sin(a)*32,136-Math.cos(a)*32],[1040+Math.sin(a)*36,136-Math.cos(a)*36]],'#A5AAA5',1.1);}line([[1040,110],[1040,136],[1060,124]],'#858D87',1.8);}
function room(mode){c.fillStyle=C.paper;c.fillRect(-2000,-2000,6000,6000);line([[-400,317],[1500,317]],'#C9CDC7',1);poly([[-400,317],[1500,317],[1700,1400],[-700,1400]],C.desk,null);if(mode==='actor')clock();}
function screenMap(fn){c.save();c.transform(1,0,-.085,1,628,165);fn();c.restore();}
function sentence(t){if(t<14.19)return '';if(t<15.98){const x=t-14.19;return 'This is a start.'.slice(0,x<.32?Math.floor(x/.08):x<.62?5:x<.92?10:x<1.22?10:Math.min(16,10+Math.floor((x-1.22)/.065)));}return 'This is a start.';}
function nextSentence(t){if(t<19.65)return '';const times=[19.65,19.85,20.06,20.24,20.42,20.6,21.1,21.31,21.54,22.63,22.82,23.05,23.26,23.49,24.30,24.80,25.15,25.60,26.00,26.42,26.72];return 'I can work with this.'.slice(0,times.filter(x=>x<=t).length);}
function laptop(t){
 screenMap(()=>{
  rect(0,0,350,216,'#D9DDD8',10,C.ink,2.5);rect(12,12,326,192,C.screen,4,C.ink,1.3);
  c.save();c.beginPath();c.rect(13,13,324,190);c.clip();
  rect(13,13,324,25,'#F0F1EE',0,null);for(let i=0;i<3;i++)ellipse(25+i*12,25,2.8,2.8,'#9DA49E',null);
  txt('Draft',83,26,11,'#717A73');line([[13,38],[337,38]],'#D6DBD4',.8);
  if(t>=7.65&&t<12.80){
   txt('BE PRODUCTIVE',175,64,20,C.ink,'center');rect(67,83,218,100,'#F5F6F1',3,'#C2C8C0',1);
   const arm=8*Math.sin(t*2.3);ellipse(126,111,14,14,C.paper,C.ink,1.5);line([[126,125],[126,162]],C.ink,1.6);line([[126,132],[108,149]],C.ink,1.6);line([[126,132],[148,139],[158,125+arm]],C.ink,1.6);line([[126,162],[112,180]],C.ink,1.6);line([[126,162],[140,180]],C.ink,1.6);poly([[207,113],[207,145],[232,129]],'#89918B',null);line([[78,192],[278,192]],'#D8DCD5',2);line([[78,192],[78+clamp((t-7.65)/8)*200,192]],'#79837B',2);
  }else{
   txt(sentence(t),30,74,24);const second=nextSentence(t);if(second)txt(second,30,107,20,'#626B64');
   const active=t>19.65?second:sentence(t),y=t>19.65?107:74;
   if(Math.floor(t*2)%2===0||t>=14.19&&t<15.9){c.font=`${t>19.65?20:24}px StoryHand`;const tw=c.measureText(active).width;line([[30+tw+3,y-11],[30+tw+3,y+11]],C.ink,1.3);}
  }c.restore();
 });
 poly([[610,381],[960,381],[995,505],[550,505]],'#E7EAE4',C.ink,2.4);
 // Perspective rows terminate at the same edges; no intersecting diagonal construction lines.
 for(let row=0;row<4;row++){const y=392+row*15,spread=row*3;for(let j=0;j<11;j++){const x=621-spread+j*(28+row*.4);poly([[x,y],[x+23,y],[x+25,y+9],[x-2,y+9]],'#CED4CB','#7D887D',.8);}}
 poly([[659,453],[858,453],[862,462],[654,462]],'#CED4CB','#7D887D',.8);
 poly([[697,473],[834,473],[842,496],[687,496]],'#F0F2EC','#9FA99C',1);
}
function mug(t){const lift=22*pulse(t,5.06,5.22,5.34,5.68);const[x,y]=set.mug;c.save();c.translate(x,y-lift);
 ellipse(0,17,43,9,'#DDE0D7',null);shape([['M',32,-9],['C',62,-17,64,29,34,23]],null,C.ink,2.4);shape([['M',35,-1],['C',50,-6,51,18,36,16]],null,C.ink,1.2);
 shape([['M',-36,-21],['L',-33,29],['Q',0,45,34,29],['L',37,-21],['Z']],C.yellow,C.ink,2.3);ellipse(0,-21,36,10,'#F9E5AD');ellipse(0,-22,29,5,C.coffee,null);c.restore();return lift;}
function paper(t){const[x,y]=set.papers;for(let i=2;i>=0;i--)turn(x+i*2,y+i*4,[-.09,.06,-.035][i],()=>rect(-41,-30,83,60,C.paper,0,'#8A928A',1.2));}
function pencil(x,y,a){turn(x,y,a,()=>{poly([[-4,-36],[4,-36],[4,30],[0,39],[-4,30]],'#ECE7D7',C.ink,1.2);line([[0,34],[0,39]],C.ink,1.7);line([[-4,-29],[4,-29]],'#8C9185',1);});}
function pencils(t){const align=smooth((t-6.22)/.65),knock=smooth((t-22.16)/.25);pencil(870+4*knock,550,.9+.24*(1-align)+.22*knock);pencil(902,565,.9-.16*(1-align));}
function timer(t){const[x,y]=set.phone;turn(x,y,.12,()=>{rect(-34,-52,68,108,'#CFD4CE',8,C.ink,1.6);rect(-28,-42,56,85,C.paper,3,'#8D978C',.8);line([[-9,-47],[9,-47]],'#737C72',1.2);const sec=t<17.18?120:Math.max(0,120-Math.floor(t-17.18));const str=`${Math.floor(sec/60).toString().padStart(2,'0')}:${(sec%60).toString().padStart(2,'0')}`;txt(str,0,-11,19,C.ink,'center');rect(-18,11,36,15,t>=17.18?'#DCE4D8':'#F0F1EB',3,'#8B9588',.7);txt(t>=17.18?'Pause':'Start',0,18,9,C.ink,'center');});}

function arm(s,e,w,width=3.2){line([s,e,w],C.ink,width);}
function typingHand(x,y,a=0,press=0){turn(x,y+press,a,()=>shape([['M',-13,11],['Q',-26,0,-16,-9],['Q',-5,-19,1,-12],['Q',10,-19,16,-10],['Q',26,-11,26,-1],['Q',24,5,16,5],['Q',10,18,-4,16],['Z']],C.paper,C.ink,2.5));}
function pointer(x,y,a=0){turn(x,y,a,()=>shape([['M',-11,18],['Q',-23,0,-16,-7],['Q',-12,-12,-5,-3],['L',-5,-33],['Q',0,-41,5,-33],['L',6,-8],['Q',17,-13,20,-5],['Q',31,-3,25,11],['Q',22,24,9,29],['L',-4,26],['Z']],C.paper,C.ink,2));}
function pinchHand(x,y,a=0){turn(x,y,a,()=>shape([['M',-17,17],['Q',-29,3,-17,-9],['Q',-9,-19,1,-16],['L',17,-9],['Q',22,-5,18,-1],['L',3,-5],['Q',-3,0,3,7],['L',16,4],['Q',25,6,19,12],['Q',6,26,-9,22],['Z']],C.paper,C.ink,2.3));}
function head(x,y,a=0){turn(x,y,a,()=>{ellipse(0,0,75,80,C.paper,C.ink,3);shape([['M',-8,-79],['Q',-2,-96,7,-103]],null,C.ink,3);shape([['M',7,-79],['Q',17,-96,25,-99]],null,C.ink,3);});}
function typingPulse(t,side){const beat=Math.max(0,Math.sin(t*19+side*2.6));return beat*beat*4.5;}
function actor(t){
 const shift=130;
 const release=smooth((t-26.8)/.85);
 const slump=(t<9.8?5:smooth((t-17.6)/2.5)*-9)+6*release;
 const hesitate=pulse(t,.28,.8,1.9,2.5);
 const headDrop=(t<2.9?9*smooth((t-.4)/1.1):t<9.8?7:mix(7,-5,(t-17.54)/2))-7*release;
 const lean=t<19.08?0:6*smooth((t-19.08)/1.3);
 let lh=[660,426],rh=[765,441];
 if(t<2.9){lh=[660-12*hesitate,426-14*hesitate];rh=[765-21*hesitate,441+9*smooth((t-1.6)/.7)];}
 if(t>=7.48&&t<14.19)rh=[778,480-4*pulse(t,7.48,7.58,7.65,7.75)];
 if(t>=17.54&&t<19.08){lh=[660,426];rh=[765,441];}
 if(t>21.88&&t<22.65){const k=pulse(t,21.88,22.16,22.32,22.65);rh=[mix(765,850,k),mix(441,548,k)];}
 lh=[lh[0]-5*release,lh[1]+16*release];rh=[rh[0]-12*release,rh[1]+18*release];
 const isTyping=(t>=19.1&&t<21.88)||(t>=22.65&&t<26.88);
 const lp=isTyping?typingPulse(t,0):0,rp=isTyping?typingPulse(t,1):0;
 // Far arm is drawn before the torso, so its hidden section is actually masked.
 arm([402+lean+shift,372+slump],[613,458],lh,3.4);
 c.save();c.translate(shift,0);
 shape([['M',391+lean,346+slump],['C',435+lean,333+slump,476+lean,349+slump,492+lean,388+slump],['C',505+lean,427,507+lean,502,516,578],['L',310,590],['C',316,469,339,391,391+lean,346+slump],['Z']],C.paper,C.ink,3.2);
 // Back silhouette stays clean: no decorative internal seam.
 c.restore();typingHand(lh[0],lh[1],-.28,lp);
 const reach=pulse(t,21.88,22.16,22.32,22.65);
 arm([485+lean+shift,382+slump],[mix(678+lean,715,reach),mix(507+slump,508,reach)],[rh[0]-9,rh[1]+12+rp],3.8);
 typingHand(rh[0],rh[1],-.12,rp);
 head(427+lean+shift,264+headDrop,-.045+headDrop*.002);
 // Foreground chair: behind seated pelvis, not beside the desk.
 c.save();c.translate(shift,0);shape([['M',266,606],['L',264,548],['C',263,495,308,492,366,498],['C',432,497,486,505,493,548],['L',501,625],['Z']],'#DFE2DB',C.ink,2.4);c.restore();
}
function foregroundArm(s,e,w){line([s,e,w],C.ink,10);line([s,e,w],C.paper,6);}
function coffeeHand(t,lift){const y=425-lift;foregroundArm([434,648],[367,571],[338,y+10]);pinchHand(337,y,.08);}
function tidyHand(t){const p=smooth((t-6.18)/.65),x=mix(845,868,p),y=mix(566,556,p);foregroundArm([990,730],[935,650],[x,y+19]);typingHand(x,y,-.28);}
function trackHands(t){
 foregroundArm([605,690],[616,577],[665,447]);typingHand(670,435,-.20);
 const q=pulse(t,12.45,12.78,12.86,13.05);const y=mix(488,514,q),x=mix(812,798,smooth((t-10.20)/1.65));
 foregroundArm([934,680],[883,603],[x+3,y+24]);pointer(x,y,-.26);
}
function timerHand(t){const p=pulse(t,16.18,17.18,17.25,17.48),x=mix(1155,1124,p),y=mix(560,501,p);foregroundArm([1180,730],[1173,638],[x,y+26]);pointer(x,y,.12);}
function workspace(t,mode='actor'){room(mode);paper(t);pencils(t);timer(t);laptop(t);const lift=mug(t);if(mode==='actor')actor(t);if(mode==='coffee')coffeeHand(t,lift);if(mode==='tidy')tidyHand(t);if(mode==='track')trackHands(t);if(mode==='timer')timerHand(t);}
const specs=[
 [0,2.90,'Rear OTS · hesitation','actor',1,640,305],
 [2.90,5.06,'Blank document','screen',2.45,789,266],
 [5.06,6.06,'Coffee grip and set-down','coffee',2.75,309,433],
 [6.06,7.48,'Align two pencils','tidy',2.55,930,548],
 [7.48,9.80,'Productivity video','actor',1.06,667,308],
 [9.80,12.96,'One small click','track',2.35,771,491],
 [12.96,14.19,'Open the document','actor',1.31,656,302],
 [14.19,15.98,'First sentence','screen',2.45,789,266],
 [15.98,17.54,'Start two minutes','timer',2.65,1104,475],
 [17.54,21.18,'Permission to begin','actor',1.06,667,308],
 [21.18,24.72,'Work amid imperfection','actor',.93,649,302],
 [24.72,30,'Quiet payoff','actor',1.01,626,308]
];
function paint(i,t){
 c.resetTransform();c.clearRect(0,0,W,H);c.fillStyle=C.paper;c.fillRect(0,0,W,H);
 const [start,end,label,mode,z,cx,cy]=specs[i];
 c.save();c.translate(W/2,H/2);c.scale(z,z);c.translate(-cx,-cy);workspace(t,mode);c.restore();
 if(i===11&&t>=27.6){const a=smooth((t-27.6)/.4);c.save();c.globalAlpha=a;txt('JUST',98,175,38);txt('BEGIN.',98,223,46);c.restore();}
}

export const shotSpecs=specs;
export function drawB1(context,shotIndex,globalTime){c=context;paint(shotIndex,globalTime);}
