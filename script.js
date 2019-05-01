var canvas;
var ctx;

const row = 8;
const col = 8;

var width;
var height;

window.onload = function(){
    canvas = document.getElementById("chess");
    ctx = canvas.getContext("2d");

    width = canvas.width / col;
    height = canvas.height / row;
    
    setup();
}

function setup(){
    let isBlack = false;
    for(let i = 0; i < row; i++){
        isBlack = !isBlack;
        for(let j = 0; j < col; j++){
            ctx.beginPath(); 
            ctx.fillStyle = isBlack ? "black" : "white";
            ctx.fillRect(j*width, i*height, width, height);
            ctx.closePath();
            isBlack = !isBlack;
        }
    }
}