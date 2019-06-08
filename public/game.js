const http = new XMLHttpRequest();

import {Field} from './Field.js';
const requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame ||
function (callback) {
    setTimeout (callback, 1000 / 30);
};

let canvas = document.getElementById("canvas-id");
canvas.width = 1000;
canvas.height = 800;
const context = canvas.getContext("2d");


function create2d(n, m, v) {
    var array = [];
    for (var i = 0; i < n; ++i) {
        array[i] = [];
        for (var j = 0; j < m; ++j) {
            array[i][j] = v;
        }
    }
    return array;
}

const mapSizeX = 20,
      mapSizeY = 12,
      cubeSize = 50;

let garden = create2d(mapSizeX, mapSizeY, new Field("empty", 0, 1));

let mouseX,
    mouseY;

window.addEventListener("mousemove", function (args) {

    mouseX = args.clientX-canvas.offsetLeft;
    mouseY = args.clientY-canvas.offsetTop;

}, false);

window.addEventListener("mousedown", function (args) {

    let x = Math.floor(mouseX/cubeSize),
        y = Math.floor(mouseY/cubeSize);

    garden[x][y] = new Field("kartof", Date.now(), 2);

    http.open('POST', '/updateField', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send("name=garden&data=" + JSON.stringify(garden[x][y]) + "&x=" + x + "&y=" + y);

}, false);

function update() {
    setTimeout(update, 10);
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;

    context.fillStyle = "rgb(0, 100, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0;i < mapSizeX;i ++){
        for(let j = 0;j < mapSizeY;j ++){
            if(garden[i][j].getName() === "empty"){
                context.fillStyle = "rgb(255, 0, 0)";
                context.fillRect(i * cubeSize, j * cubeSize, cubeSize - 1, cubeSize - 1);
            }
            if(garden[i][j].getName() === "kartof"){
                context.fillStyle = "rgb(0, 255, 0)";
                context.fillRect(i * cubeSize, j * cubeSize, cubeSize - 1, cubeSize - 1);
            }
        }
    }
    
    requestAnimationFrame(draw);
}
update();
draw();