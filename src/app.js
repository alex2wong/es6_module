import LowPoly from './lowpoly';
// import * as Dashboard from 'dashboard';
import Drone from './drone';


let lpImg = document.querySelector("#lpImg");
let refImg = document.querySelector("img");
lpImg.style.width = getComputedStyle(refImg).width;
lpImg.style.height = getComputedStyle(refImg).height;

let srcUrl = "../RealShadow_flight.png";

new LowPoly(srcUrl, {}).init().then((data) => {
    // console.warn("base64 lowpoly content: " + data);
    lpImg.src = data;
});

let drone = new Drone({});
document.write("<br><h1>Player Name generated by Drone Module</h1><br><h2>You are: " + drone.name);