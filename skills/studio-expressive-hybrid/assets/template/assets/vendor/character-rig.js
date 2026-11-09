import * as THREE from './three.module.js';

const W=1672,H=941;
const loader=new THREE.TextureLoader();
async function texture(src){const t=await loader.loadAsync(src);t.colorSpace=THREE.SRGBColorSpace;t.minFilter=THREE.LinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=false;return t;}
function setup(canvas){
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,preserveDrawingBuffer:true});
 renderer.setPixelRatio(1);renderer.setSize(1920,1080,false);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;
 return renderer;
}
const vertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragment=`
 uniform sampler2D baseMap,blinkMap;
 uniform float blinkA,blinkB,breathA,breathB,amplitudeA,amplitudeB;
 uniform vec4 eyeA1,eyeA2,eyeB1,eyeB2,torsoA,torsoB;
 varying vec2 vUv;
 float region(vec2 p,vec4 e){return 1.0-smoothstep(0.88,1.0,length((p-e.xy)/max(e.zw,vec2(0.001))));}
 void main(){
  vec2 p=vec2(vUv.x,1.0-vUv.y)*vec2(1672.0,941.0);
  float a=region(p,torsoA),b=region(p,torsoB);
  vec2 q=p; q.y-=amplitudeA*breathA*a+amplitudeB*breathB*b;
  vec2 uv=vec2(q.x/1672.0,1.0-q.y/941.0);
  vec4 color=texture2D(baseMap,uv);
  float lids=max(step(0.5,blinkA)*max(region(p,eyeA1),region(p,eyeA2)),step(0.5,blinkB)*max(region(p,eyeB1),region(p,eyeB2)));
  color=mix(color,texture2D(blinkMap,vUv),lids);
  gl_FragColor=color;
  #include <colorspace_fragment>
 }`;
export async function createPoster(canvas,cfg){
 const renderer=setup(canvas),scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,10);camera.position.z=1;
 const [base,blink]=await Promise.all([texture(cfg.image),texture(cfg.blink||cfg.image)]);
 const zero=[-1000,-1000,1,1];
 const uniforms={baseMap:{value:base},blinkMap:{value:blink},blinkA:{value:0},blinkB:{value:0},breathA:{value:0},breathB:{value:0},amplitudeA:{value:cfg.amplitudeA??2},amplitudeB:{value:cfg.amplitudeB??2}};
 for(const name of ['eyeA1','eyeA2','eyeB1','eyeB2','torsoA','torsoB'])uniforms[name]={value:new THREE.Vector4(...(cfg[name]||zero))};
 const material=new THREE.ShaderMaterial({uniforms,vertexShader:vertex,fragmentShader:fragment,depthTest:false});
 scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),material));
 const state={blinkA:0,blinkB:0,breathA:0,breathB:0};
 const draw=()=>{for(const k of ['blinkA','blinkB','breathA','breathB'])uniforms[k].value=state[k];renderer.render(scene,camera);};
 await renderer.compileAsync(scene,camera);draw();
 return {state,draw,renderer};
}

export async function createDoor(canvas,cfg){
 const renderer=setup(canvas),scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(0,W,H,0,-3000,3000);camera.position.z=1000;camera.lookAt(0,0,0);
 const [plate,handArt]=await Promise.all([texture(cfg.plate),texture('assets/layers/knocking-hand.png')]);
 const base=new THREE.Mesh(new THREE.PlaneGeometry(W,H),new THREE.MeshBasicMaterial({map:plate}));base.position.set(W/2,H/2,-1000);scene.add(base);
 // A dark, unillustrated gap avoids inventing a different bedroom beyond the door.
 const gap=new THREE.Mesh(new THREE.PlaneGeometry(W-275,H),new THREE.MeshBasicMaterial({color:0x101626}));gap.position.set((W+275)/2,H/2,-900);scene.add(gap);
 const hinge=new THREE.Group();hinge.position.set(W,H/2,0);scene.add(hinge);
 const geo=new THREE.PlaneGeometry(W-275,H);const uv=geo.attributes.uv;
 for(let i=0;i<uv.count;i++)uv.setX(i,(275+uv.getX(i)*(W-275))/W);
 const door=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({map:plate,side:THREE.DoubleSide}));door.position.x=-(W-275)/2;hinge.add(door);
 // Image-generated transparent layer registered to the approved reference canvas.
 const hand=new THREE.Mesh(new THREE.PlaneGeometry(W,H),new THREE.MeshBasicMaterial({map:handArt,transparent:true,depthTest:false}));hand.position.set(W/2,H/2,20);hand.renderOrder=5;scene.add(hand);
 const state={handX:0,handY:0,angle:0};
 const draw=()=>{hand.position.set(W/2+state.handX,H/2-state.handY,20);hinge.rotation.y=-state.angle;renderer.render(scene,camera);};
 await renderer.compileAsync(scene,camera);draw();
 return {state,draw,renderer};
}

export function addBlink(tl,state,key,at){
 tl.fromTo(state,{[key]:0},{[key]:1,duration:2/30,ease:'power1.in',immediateRender:false},at);
 tl.fromTo(state,{[key]:1},{[key]:0,duration:3/30,ease:'power1.out',immediateRender:false},at+3/30);
}
export function addBreath(tl,state,key,duration,phase=0){
 const step=1.7;
 for(let i=0;i<Math.ceil(duration/step);i++){
  const start=i*step+phase;if(start>=duration)break;
  tl.fromTo(state,{[key]:i%2?1:0},{[key]:i%2?0:1,duration:Math.min(step,duration-start),ease:'sine.inOut',immediateRender:false},start);
 }
}
