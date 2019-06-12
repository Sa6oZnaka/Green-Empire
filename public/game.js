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
canvas.height = 600;
const context = canvas.getContext("2d");

function create2d(n, m, v) {
    let array = [];
    for (let i = 0; i < n; ++i) {
        array[i] = [];
        for (let j = 0; j < m; ++j) {
            array[i][j] = v;
        }
    }
    return array;
}

const mapSizeX = 20,
      mapSizeY = 12,
      cubeSize = 40;

let garden = create2d(mapSizeX, mapSizeY, new Field("empty", 0, 1));

let mouseX,
    mouseY;

let inventorySizeX = canvas.width - cubeSize * mapSizeX;
let itemSizeX = 50,
    itemSizeY = mapSizeY * cubeSize / 5;

window.addEventListener("mousemove", function (args) {

    mouseX = args.clientX-canvas.offsetLeft + scrollX;
    mouseY = args.clientY-canvas.offsetTop + scrollY;

}, false);

window.addEventListener("mousedown", function (args) {

    // Clicked field of the garden
    if(mouseX > inventorySizeX && mouseX < canvas.width && mouseY > 0 && mouseY < cubeSize * mapSizeY) {

        let x = Math.floor((mouseX - inventorySizeX) / cubeSize),
            y = Math.floor(mouseY / cubeSize);

        getServerTime(function (returnValue) {
            garden[x][y] = new Field("kartof", returnValue.server_time, 500);

            http.open('POST', '/updateField', true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.send("data=" + JSON.stringify(garden[x][y]) + "&x=" + x + "&y=" + y);
        });
    }

}, false);

getGarden( function (returnValue) {
    console.log(returnValue);
});

function update() {

    setTimeout(update, 1000);
}

function getServerTime(callback){
    http.open('GET', '/serverTime', true);
    http.send();

    http.onreadystatechange = processRequest;

    let response;
    function processRequest(e) {
        if (http.readyState === 4 && http.status === 200) {
            response = JSON.parse(http.responseText);
            console.log(response.server_time);

            callback(response);
        }
    }
}

function getGarden(callback){
    http.open('GET', '/getGarden', true);
    http.send();

    http.onreadystatechange = processRequest;

    let response;
    function processRequest(e) {
        if (http.readyState === 4 && http.status === 200) {
            response = JSON.parse(http.responseText);
            console.log(response);

            for(let i = 0; i < response.length; i++){
                garden[response[i].x][response[i].y] = new Field(response[i].name, response[i].startTime, response[i].time);
            }

            callback(response);
        }
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;

    context.fillStyle = "rgb(0, 100, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw inventory
    context.fillStyle = "rgb(0, 0, 200)";
    context.fillRect(0, 0, inventorySizeX, canvas.height);
    for(let i = 0; i < 4; i ++){
        for(let j = 0; j < 5; j ++) {
            context.fillStyle = "rgb(0, 0, 20)";
            context.fillRect(i * itemSizeX, j * itemSizeY, itemSizeX - 1, itemSizeY - 1);

            context.fillStyle = "#FFF";
            context.font = "10px Arial";
            context.fillText("Item: 10", i * itemSizeX, (j + 1 )* itemSizeY);
        }
    }

    // Draw garden
    for(let i = 0;i < mapSizeX;i ++){
        for(let j = 0;j < mapSizeY;j ++){
            if(garden[i][j].getName() === "empty"){
                context.fillStyle = "rgb(255, 0, 0)";
                context.fillRect(inventorySizeX + i * cubeSize, j * cubeSize, cubeSize - 1, cubeSize - 1);
            }
            if(garden[i][j].getName() === "kartof" && ! garden[i][j].ready()){
                context.fillStyle = "rgb(0, 255, 0)";
                context.fillRect(inventorySizeX + i * cubeSize, j * cubeSize, cubeSize - 1, cubeSize - 1);
            }
        }
    }
    
    requestAnimationFrame(draw);
}
update();
draw();