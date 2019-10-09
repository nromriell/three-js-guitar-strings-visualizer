import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import React from 'react'

import './ThreeJSScene.css'

class ThreeJSScene extends React.Component {
    componentWillUnmount() {
        cleanup();
    }

    render() {
        return <div className="ThreeDScene"/>
    }
}

export default ThreeJSScene;

/**
 Shaders
 **/

const WaveVSShader = `
    uniform float time;
    uniform float lastTouchTime;
    uniform float period;
    uniform float frequency;
    uniform float falloffTime;
    uniform float scale;
    uniform float amplitude;
    varying lowp vec4 vColor;
    varying vec2 texCoord;
 
     void main() {
        texCoord = uv;
        float relTime = (time-lastTouchTime);
        float falloff = 1.0-(relTime/falloffTime);
        falloff = mix(0.0, falloff, step(0.0, falloff));
        float distance = period*(1000.0*(position.z-0.50)+(time-lastTouchTime)*scale*5.0);
        float displacement = amplitude*falloff*sin(period*(frequency*position.z+relTime*scale));
        float positionX = position.x + displacement;
        vec3 newPosition = vec3(positionX, position.y, position.z);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);
        vColor = vec4(0.9,0.9,0.9,1);
     }
`;

const WaveFSShader = `
    varying lowp vec4 vColor;
    varying vec2 texCoord;
    
    void main() {
        gl_FragColor = vec4(1,1,1,1);
    }  
`;

const BackgroundVSShader = `
    varying vec2 texCoord;
    
    //float step(float edge, float value){
      
       // return edge >= value ? 1 : 0;
    //}
 
     void main() {
        texCoord = uv;
        gl_Position = projectionMatrix * modelViewMatrix*vec4(position, 1.0);
     }
`;

const BackgroundFSShader = `
    uniform float time;
    uniform float lastTouchTime0;
    uniform float lastTouchTime1;
    uniform float lastTouchTime2;
    uniform float lastTouchTime3;
    uniform float lastTouchTime4;
    uniform float lastTouchTime5;
    uniform float lastTouchTime6;
    uniform float lastTouchTime7;
    uniform float lastTouchTime8;
    uniform float lastTouchTime9;
    uniform vec4 color0;
    uniform vec4 color1;
    uniform vec4 color2;
    uniform vec4 color3;
    uniform vec4 color4;
    uniform vec4 color5;
    uniform vec4 color6;
    uniform vec4 color7;
    uniform vec4 color8;
    uniform vec4 color9;
    uniform float period;
    uniform float frequency0;
    uniform float frequency1;
    uniform float frequency2;
    uniform float frequency3;
    uniform float frequency4;
    uniform float frequency5;
    uniform float frequency6;
    uniform float frequency7;
    uniform float frequency8;
    uniform float frequency9;
    uniform float lineWidth0;
    uniform float lineWidth1;
    uniform float lineWidth2;
    uniform float lineWidth3;
    uniform float lineWidth4;
    uniform float lineWidth5;
    uniform float lineWidth6;
    uniform float lineWidth7;
    uniform float lineWidth8;
    uniform float lineWidth9;
    uniform float scale;
    uniform float amplitude0;
    uniform float amplitude1;
    uniform float amplitude2;
    uniform float amplitude3;
    uniform float amplitude4;
    uniform float amplitude5;
    uniform float amplitude6;
    uniform float amplitude7;
    uniform float amplitude8;
    uniform float amplitude9;
    
    varying vec2 texCoord;
    
    float getDist(float lastTouchTime, float amplitude, float frequency, float angleFrag, float distBase)
    {
        return (time-lastTouchTime)*scale-amplitude*cos(period*(frequency*angleFrag*50.0*(time-lastTouchTime)*scale));
    }
    
    void main() {
        vec4 color = vec4(0.0,0,0,1);
        vec2 correctedCoord = vec2(texCoord.x-0.50, texCoord.y-0.50);
        float distBase = sqrt(correctedCoord.x*correctedCoord.x+correctedCoord.y*correctedCoord.y);
        float angleFrag = atan(correctedCoord.y/correctedCoord.x);
        //float dist0 = (time-lastTouchTime0)*scale-amplitude0*sin(period*(frequency0*distBase+(time-lastTouchTime0)*scale));
        //float dist0 = (time-lastTouchTime0)*scale-amplitude0*sin(period*(frequency0*(time-lastTouchTime0)*scale+angleFrag*800.0));
        //float dist0 = (time-lastTouchTime0)*scale-amplitude0*sin(period*(frequency0*angleFrag*50.0*(time-lastTouchTime0)*scale));
        float dist0 = getDist(lastTouchTime0, amplitude0, frequency0, angleFrag, distBase);
        float dist1 = getDist(lastTouchTime1, amplitude1, frequency1, angleFrag, distBase);
        float dist2 = getDist(lastTouchTime2, amplitude2, frequency2, angleFrag, distBase);
        float dist3 = getDist(lastTouchTime3, amplitude3, frequency3, angleFrag, distBase);
        float dist4 = getDist(lastTouchTime4, amplitude4, frequency4, angleFrag, distBase);
        float dist5 = getDist(lastTouchTime5, amplitude5, frequency5, angleFrag, distBase);
        float dist6 = getDist(lastTouchTime6, amplitude6, frequency6, angleFrag, distBase);
        float dist7 = getDist(lastTouchTime7, amplitude7, frequency7, angleFrag, distBase);
        float dist8 = getDist(lastTouchTime8, amplitude8, frequency8, angleFrag, distBase);
        float dist9 = getDist(lastTouchTime9, amplitude9, frequency9, angleFrag, distBase);
        //color += mix(color, color0, step(dist0-lineWidth0, distBase)*step(distBase, dist0+lineWidth0));
        //color += mix(color, vec4(1,1,1,1), step(distBase, dist0));
        //color.y = mix(0.0, 1.0, step(distBase,dist0));
        vec4 zero = vec4(0,0,0,0);
        color += mix(zero, color0*(1.0/4.0), step(dist0-lineWidth0, distBase)*step(distBase, dist0+lineWidth0));
        color += mix(zero, color1*(1.0/4.0), step(dist1-lineWidth1, distBase)*step(distBase, dist1+lineWidth1));
        color += mix(zero, color2*(1.0/4.0), step(dist2-lineWidth2, distBase)*step(distBase, dist2+lineWidth2));
        color += mix(zero, color3*(1.0/4.0), step(dist3-lineWidth3, distBase)*step(distBase, dist3+lineWidth3));
        color += mix(zero, color4*(1.0/4.0), step(dist4-lineWidth4, distBase)*step(distBase, dist4+lineWidth4));
        color += mix(zero, color5*(1.0/4.0), step(dist5-lineWidth5, distBase)*step(distBase, dist5+lineWidth5));
        color += mix(zero, color6*(1.0/4.0), step(dist6-lineWidth6, distBase)*step(distBase, dist6+lineWidth6));
        color += mix(zero, color7*(1.0/4.0), step(dist7-lineWidth7, distBase)*step(distBase, dist7+lineWidth7));
        color += mix(zero, color8*(1.0/4.0), step(dist8-lineWidth8, distBase)*step(distBase, dist8+lineWidth8));
        color += mix(zero, color9*(1.0/4.0), step(dist9-lineWidth9, distBase)*step(distBase, dist9+lineWidth9));
        
        gl_FragColor = color;
    }   
`;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 2000);
let sceneLight = new THREE.DirectionalLight(0xffffff, 1);
let raycaster = new THREE.Raycaster();
sceneLight.position.set(0, 8, 20);
let mouse = new THREE.Vector2();
let renderer = new THREE.WebGLRenderer({alpha:false});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.className = "ThreeDScene";
renderer.setClearColor(0x000000, 1);
renderer.setClearAlpha(1);
document.body.appendChild(renderer.domElement);
scene.add(sceneLight);
camera.position.z = 5;
let mouseDown = false;
let currentStringWave = 0;
let selectedString = "";

let baseAmplitude = .05*100;

const createStringUniforms = (frequency) =>{
    return {
        lastTouchTime: {value: 0},
        period: {value: 3.14 * 0.05},
        time: {value: 1.01},
        scale: {value: 5},
        falloffTime:{value:60},
        frequency: {value: frequency},
        amplitude: {value: baseAmplitude},
    }
};

const createStringMaterial = (uniforms) =>{
    return new THREE.ShaderMaterial({uniforms:uniforms,
        vertexShader:WaveVSShader,
        fragmentShader:WaveFSShader});
};

let lowEMatUniforms = createStringUniforms(82.41);
let aMatUniforms = createStringUniforms(110.00);
let dMatUniforms = createStringUniforms(146.83);
let gMatUniforms = createStringUniforms(196.00);
let bMatUniforms = createStringUniforms(246.96);
let eMatUniforms = createStringUniforms(329.63);

let allStringUniforms = [lowEMatUniforms, aMatUniforms, dMatUniforms, gMatUniforms, bMatUniforms, eMatUniforms];

let lowEMat = createStringMaterial(lowEMatUniforms);
let aMat = createStringMaterial(aMatUniforms);
let dMat = createStringMaterial(dMatUniforms);
let gMat = createStringMaterial(gMatUniforms);
let bMat = createStringMaterial(bMatUniforms);
let eMat = createStringMaterial(eMatUniforms);

let backgroundUniforms = {
    time:{value:0},
    lastTouchTime0:{value:0},
    lastTouchTime1:{value:-100},
    lastTouchTime2:{value:200},
    lastTouchTime3:{value:300},
    lastTouchTime4:{value:400},
    lastTouchTime5:{value:500},
    lastTouchTime6:{value:600},
    lastTouchTime7:{value:700},
    lastTouchTime8:{value:800},
    lastTouchTime9:{value:900},
    color0:{value:new THREE.Vector4(1,1,1,255)},
    color1:{value:new THREE.Vector4(1,1,0.5,1)},
    color2:{value:new THREE.Vector4(0,1,1,1)},
    color3:{value:new THREE.Vector4(1,1,0,1)},
    color4:{value:new THREE.Vector4(1,0,1,1)},
    color5:{value:new THREE.Vector4(0,0,1,1)},
    color6:{value:new THREE.Vector4(1,0,0,1)},
    color7:{value:new THREE.Vector4(0,1,0,1)},
    color8:{value:new THREE.Vector4(1,0,0,1)},
    color9:{value:new THREE.Vector4(0,0.5,1,1)},
    period:{value:3.14*0.01},
    frequency0:{value:100},
    frequency1:{value:.1},
    frequency2:{value:.1},
    frequency3:{value:.1},
    frequency4:{value:.1},
    frequency5:{value:.1},
    frequency6:{value:.1},
    frequency7:{value:.1},
    frequency8:{value:.1},
    frequency9:{value:.1},
    lineWidth0:{value:.01},
    lineWidth1:{value:.01},
    lineWidth2:{value:.01},
    lineWidth3:{value:.01},
    lineWidth4:{value:.01},
    lineWidth5:{value:.01},
    lineWidth6:{value:.01},
    lineWidth7:{value:.01},
    lineWidth8:{value:.01},
    lineWidth9:{value:.01},
    scale:{value:.001},
    amplitude0:{value:.01},
    amplitude1:{value:.01},
    amplitude2:{value:.01},
    amplitude3:{value:.01},
    amplitude4:{value:.01},
    amplitude5:{value:.01},
    amplitude6:{value:.01},
    amplitude7:{value:.01},
    amplitude8:{value:.01},
    amplitude9:{value:.01}
};
const backgroundMat = new THREE.ShaderMaterial({uniforms:
    backgroundUniforms,
    vertexShader:BackgroundVSShader
    ,fragmentShader:BackgroundFSShader});

const cubeGeometry = new THREE.PlaneGeometry(90,90,1);
const plane = new THREE.Mesh(cubeGeometry, backgroundMat);
plane.position.z = -20;
scene.add(plane);
let count = 0;
let objects = [];

const animate = () => {
    if(scene != null) {
        count += 1;
        requestAnimationFrame(animate);
        allStringUniforms.forEach((stringUniform) => stringUniform["time"].value = count);
        backgroundUniforms["time"].value = count;
        renderer.render(scene, camera);
    }
};

const loadObjFile = (objFile, material, position, scale, name) => {
    const loader = new GLTFLoader();
    loader.load(objFile, gltf => {
        let object = gltf.scene;
        object.position.set(position.x, position.y,position.z);
        object.scale.set(scale.x,scale.y,scale.z);
        object.traverse((node) =>{
            if(node.isMesh){
                node.name = name;
                node.material = material;
                objects.push(node);
            }
        });
        scene.add(object);
    }, undefined, (error)=>{
        console.log("Error Loading Model:"+error);
    });
};

const createAudioContext = (frequency) => {
    const newContext = new AudioContext();
    const oscillator = newContext.createOscillator();
    const gain = newContext.createGain();
    oscillator.type = "sine";
    oscillator.connect(gain);
    gain.connect(newContext.destination);
    oscillator.start(0);
    oscillator.frequency.value = frequency;
    gain.gain.linearRampToValueAtTime(0.0001, newContext.currentTime+5.0);
    return {oscillator:oscillator, gain:gain, context:newContext};
};

let allAudioContexts = [null, null, null, null, null, null];

loadObjFile("WaterLine.glb", lowEMat, {x:0,y:5,z:-19.9}, {x:2,y:2,z:1}, "E2");
loadObjFile("WaterLine.glb", aMat, {x:0,y:3,z:-19.8},{x:2,y:1.8,z:1}, "A2");
loadObjFile("WaterLine.glb", dMat, {x:0,y:1,z:-19.9},{x:2,y:1.6,z:1}, "D3");
loadObjFile("WaterLine.glb", gMat, {x:0,y:-1,z:-19.8},{x:2,y:1.4,z:1}, "G3");
loadObjFile("WaterLine.glb", bMat, {x:0,y:-3,z:-19.8},{x:2,y:1.2,z:1}, "B3");
loadObjFile("WaterLine.glb", eMat, {x:0,y:-5,z:-19.8},{x:2,y:1,z:1}, "E4");

const onMouseMove = (event) => {
    event.preventDefault();
    if(event.touches){
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
    }
    mouse.x = (event.clientX/window.innerWidth)*2-1;
    mouse.y = -(event.clientY/window.innerHeight)*2+1;
    if(mouseDown) {
        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(objects);
        //console.log("Intersects Length:" + intersects.length);
        if (intersects.length > 0) {
            //console.log(intersects[0].object.name);
            if (selectedString !== intersects[0].object.name) {
                selectedString = intersects[0].object.name;
                switch (intersects[0].object.name) {
                    case "E2":
                        pluckString(0, 1);
                        break;
                    case "A2":
                        pluckString(1, 1);
                        break;
                    case "D3":
                        pluckString(2, 1);
                        break;
                    case "G3":
                        pluckString(3, 1);
                        break;
                    case "B3":
                        pluckString(4, 1);
                        break;
                    case "E4":
                        pluckString(5, 1);
                        break;
                    default:
                        break;
                }
            }
        } else {
            selectedString = "";
        }
    }else {
        selectedString = "";
    }
};

const onMouseUp = (event) => {
    event.preventDefault();
    mouseDown = false;
};

const onMouseDown = (event) => {
    event.preventDefault();
    mouseDown = true;
};

const pluckString = (stringID, strength) =>{
    if(allAudioContexts[stringID] == null) {
        let frequency;
        switch(stringID){
            case 0:
                frequency = 82.41;
                break;
            case 1:
                frequency = 110.00;
                break;
            case 2:
                frequency = 146.83;
                break;
            case 3:
                frequency = 196.00;
                break;
            case 4:
                frequency = 246.94;
                break;
            default:
                frequency = 329.63;
                break;
        }
        allAudioContexts[stringID] = createAudioContext(frequency);
    }
    allStringUniforms[stringID].lastTouchTime.value = count;
    allStringUniforms[stringID].amplitude.value = strength*baseAmplitude;
    allAudioContexts[stringID].gain.gain.cancelScheduledValues(allAudioContexts[stringID].context.currentTime);
    allAudioContexts[stringID].gain.gain.exponentialRampToValueAtTime(1,allAudioContexts[stringID].context.currentTime+0.01);
    allAudioContexts[stringID].gain.gain.linearRampToValueAtTime(0.0001, allAudioContexts[stringID].context.currentTime+1.0);
    backgroundUniforms["frequency"+currentStringWave.toString()].value = allAudioContexts[stringID].oscillator.frequency.value;
    backgroundUniforms["lastTouchTime"+currentStringWave.toString()].value = count;
    backgroundUniforms["lineWidth"+currentStringWave.toString()].value = 0.01+Math.random()*0.2;
    currentStringWave = (currentStringWave+1)%10;
};

const onWindowResize = () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};


window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('touchmove', onMouseMove, {passive:false});
window.addEventListener('touchstart', onMouseDown, {passive:false});
window.addEventListener('touchend', onMouseUp, {passive:false});

animate();

const cleanup = () => {
    //window.document.removeChild()
    window.removeEventListener('resize', onWindowResize, false);
    window.removeEventListener('mousemove', onMouseMove, false);
    window.removeEventListener('mousedown', onMouseDown, false);
    window.removeEventListener('mouseup', onMouseUp, false);
    window.removeEventListener('touchmove', onMouseMove, {passive:false});
    window.removeEventListener('touchstart', onMouseDown, {passive:false});
    window.removeEventListener('touchend', onMouseUp, {passive:false});
    renderer.domElement.parentNode.removeChild(renderer.domElement);
  renderer.dispose();
  renderer = null;
  scene.traverse(object => {
      if(object.isMesh){
          object.geometry.dispose();
          if(object.material.isMaterial){
              object.material.dispose();
          }else {
              for(const mat of object.material) mat.dispose();
          }
      }
  });
  camera = null;
  raycaster = null;
  sceneLight = null;
  mouse = null;
  lowEMat = null;
  aMat = null;
  dMat = null;
  gMat = null;
  bMat = null;
  eMat = null;
  allStringUniforms = null;
  allAudioContexts = null;
  lowEMatUniforms = null;
  aMatUniforms = null;
  dMatUniforms = null;
  gMatUniforms = null;
  bMatUniforms = null;
  eMatUniforms = null;
  scene = null;
};

//cleanup();

