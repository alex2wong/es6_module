import Drone from './drone';
// import f3Adapter from './f3Adapter';
let Vue = require('./vue.js');

let app = new Vue({
    el: '#app',
    data: {
        message: 'Input your name: ',
        username: 'what name'
    }
});

// var helpPanel = new Vue({
//     el: '#helpPanel',
//     data: {
//         visible: true
//     }
// })

let drones = [];
let droneObj = new Drone({});

// droneObj.name = droneObj.randomName();
// droneObj.speed = droneObj.speed;
// droneObj.direction = droneObj.direction;
// droneObj.life = droneObj.life
// droneObj.firing = droneObj.firing
// droneObj.point = {
//     type: 'Point',
//     coordinates: [121, 33]
// }
drones.push(droneObj);

console.warn("myDrone name: " + droneObj.name);

let drone = new Vue({
    el: '#dashboard',
    data: droneObj,
    methods: {
        turnLeft: droneObj.turnLeft,
        turnRight: droneObj.turnRight,
        accelerate: droneObj.accelerate,
        brake: droneObj.brake,
        fire: droneObj.fire
    }
});

// // from Game on! start interval to updateDrone.
// function updateDrone() {
//     drone.point.coordinates[0] += Math.sin(drone.direction) * drone.speed * 0.01;
//     drone.point.coordinates[1] += Math.cos(drone.direction) * drone.speed * 0.01;
//     updateDroneView()
// }

let socket, statusBar = document.querySelector("#statusBar")
// config socket connection.

/*
    Directly Manipulate DOM in JS is not Recommended, 
    use "v-on: evet='handler'" instead  !!
*/

// add control interaction or event listener.
document.body.addEventListener('keydown', function(e) {
    if (e.which === 37||e.which === 65) {
        droneObj.turnLeft();
    }
    if (e.which === 39||e.which === 68) {
        droneObj.turnRight();
    }
    if (e.which === 38 ||e.which === 87) { // faster
        droneObj.accelerate();
    }
    if (e.which === 40||e.which === 83) { // slower
        droneObj.brake();
    }
    if (e.which === 32) {
        droneObj.fire();
    }
    if (e.which === 66) {
        // drone.bomb(e);
    }
    // console.log(e.which);
})

let helpBtn = document.querySelector("#helpBtn");
helpBtn.addEventListener("click", function(evt){
    helpPanel.visible = !helpPanel.visible;
})

let MainInterval = setInterval(() => {
    // fps25 bullet calculation.
    if (droneObj && droneObj.firing) {
        // droneObj.bulletUpdate = !droneObj.bulletUpdate;
        for (var i = 0; i < droneObj.bullets.length; i++) {
            // require bulletsCalculation utility.
            // drone.bullets[i].coordinates[0] += 0.01;
            // drone.bullets[i].coordinates[1] += 0.01;
        }
    }
    droneObj.updateDrone();
    // function below should update view of all the drones in F3earth.
    updateDroneView();
    animation();
}, 140);


// f3earth view part.
let earth = new FE.Earth("earth");
let features = [];
// init features for layer.source.
updateDroneView();
console.warn("features: " + features[0]);

earth.addLayer({
    id: 'osm',
    type: 'rasterTile',
    source: {
        id: 'osm',
        type: "rasterTile",
        url: 'http://mt3.google.cn/vt/lyrs=s@138&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galil'
    // url: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
    
});

earth.addLayer({
    id: 'point',
    source: {
        id: 'point',
        type: 'vector',
        format: 'geojson',
        features: features,
    },
    style: {
        altitude: {
            type: 'relative',
            height: 100
        },
        rotate: 0,
        offset: [0, 0],
        size: [68, 48],
        image: '../iamges/drone.png',
    },
    // layout: {
    //     altitude: {
    //         type: 'relative',
    //         height: 100
    //     },
    //     width: 2
    // },
    // paint: {
    //     color: '#FF0000'
    // },
    type: 'point'
});

// create F3 feature for each drones.
// GeoJSON format geometry..
function updateDroneView() {
    drones.forEach((curDrone) => {
        features.push(new FE.Feature(new FE.Geometry.Point(curDrone.point.coordinates)));
    });
}

let source = earth.getSource('point');

function animation() {        
    features = [];
    updateDroneView();    
    source.resetFeatures(features);
    
    // // hack for previous bug in f3earth
    // if (earth._sourceLayers.length > 1) {
    //     earth._sourceLayers.splice(1,1);
    // }
    
}


// function loadJSON2(data) {
//     var gformat = new FE.Format.GeoJSON();
//     var lconfig = gformat.readFeatures(data).createLayerConfig();
//     earth.addLayer(lconfig);
// }

// show china
earth.setCenter(123, 30);

var doubleClickZoomInteraction=new FE.Interaction.DoubleClickZoom();
earth.addInteraction(doubleClickZoomInteraction);

var dragInteraction=new FE.Interaction.Drag();
earth.addInteraction(dragInteraction);

var mouseWheelZoomInteraction=new FE.Interaction.MouseWheelZoom();
earth.addInteraction(mouseWheelZoomInteraction);
