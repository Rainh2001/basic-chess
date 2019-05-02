var canvas;
var ctx;
var board;

const row = 8;
const col = 8;

var width;
var height;

var black;
var white;

class Board {
    constructor(){
        this.pos = [];
        let isBlack = false;
        for(let i = 0; i < col; i++){
            this.pos.push([]);
            isBlack = !isBlack;
            for(let j = 0; j < row; j++){
                this.pos[i].push({x: j*width, y: i*height});
                this.pos[i][j].color = isBlack ? "black" : "white";
                ctx.beginPath(); 
                ctx.fillStyle = this.pos[i][j].color;
                ctx.fillRect(j*width, i*height, width, height);
                ctx.closePath();
                isBlack = !isBlack;
            }
        }
    }
}

class Player {
    constructor(color){
        this.color = color;
        this.pawn = [];
        this.bishop = [];
        this.rook = [];
        this.knight = [];
        this.king;
        this.queen;
    }
}

class Pawn {
    constructor(isBlack, pos){
        this.img = new Image();
        this.img.src = isBlack ? "img/blackPawn.png" : "img/whitePawn.png";
        this.x = pos.x;
        this.y = pos.y;                                                                                                                                                                                                         
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, width, height);
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

    black = new Player("black");
    white = new Player("white");
    
    for(let i = 0; i < 2; i++){
        let pawn = [];
        let isBlack = i === 0 ? true : false;
        for(let j = 0; j < col; j++){
            let line = i === 0 ? 1 : 6;
            pawn.push(new Pawn(isBlack, board.pos[line][j]));
            pawn[j].img.onload = function(){
                pawn[j].draw();
            }
        }
        if(isBlack){
            black.pawn = pawn;
        } else {
            white.pawn = pawn;
        }
    }
}