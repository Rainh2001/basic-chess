var canvas;
var ctx;
var board;

const row = 8;
const col = 8;

var width;
var height;

class Board {
    constructor(){
        this.pos = [];
        let isBlack = false;
        for(let i = 0; i < col; i++){
            this.pos.push([]);
            isBlack = !isBlack;
            for(let j = 0; j < row; j++){
                this.pos[i].push({x: j*width, y: i*height});
                ctx.beginPath(); 
                ctx.fillStyle = isBlack ? "black" : "white";
                ctx.fillRect(j*width, i*height, width, height);
                ctx.closePath();
                isBlack = !isBlack;
            }
        }
    }
}

class Pawn {
    constructor(){
        this.img = new Image();
        this.img.src = "img/pawn.png";
        this.x;
        this.y;                                                                                                                                                                                                                 
    }
    draw(pos){
        this.x = pos.x;
        this.y = pos.y;
        ctx.beginPath();
        ctx.drawImage(this.img, pos.x, pos.y, width, height);
        ctx.closePath();
    }
}

window.onload = function(){
    canvas = document.getElementById("chess");
    ctx = canvas.getContext("2d");

    width = canvas.width / col;
    height = canvas.height / row;
    
    setup();
}

function setup(){
    board = new Board();
    let pawn = [];
    let line = 1;
    for(let i = 0; i < 2; i++){
        pawn.push([]);
        for(let j = 0; j < col; j++){
            pawn[i].push(new Pawn());
            pawn[i][j].img.onload = function(){
                pawn[i][j].draw(board.pos[line][j]);
            }
        }
        line = 6;
    }
    console.log(pawn);
}