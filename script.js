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
                this.pos[i].push(new Position(j*width, i*height));
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

class Position {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.state = false;
        this.currentPiece;
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

class ChessPiece {
    constructor(pos){
        this.img = new Image();
        this.x = pos.x;
        this.y = pos.y;                                                                                                                                                                                                         
    }
    updatePos(pos){
        this.x = pos.x;
        this.y = pos.y;
        this.draw();
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, width, height);
        ctx.closePath();
    }
}

class Pawn extends ChessPiece {
    constructor(isBlack, pos){
        super(pos);
        this.img.src = isBlack ? "img/blackPawn.png" : "img/whitePawn.png";                                                                                                                                                                                                      
    }
}

class Rook extends ChessPiece {
    constructor(isBlack, pos){
        super(pos);
        this.img.src = isBlack ? "img/blackRook.png" : "img/whiteRook.png";
    }
}

class Bishop extends ChessPiece {
    constructor(isBlack, pos){
        super(pos);
        this.img.src = isBlack ? "img/blackBishop.png" : "img/whiteBishop.png";
    }
}

class Knight extends ChessPiece {
    constructor(isBlack, pos){
        super(pos);
        this.img.src = isBlack ? "img/blackKnight.png" : "img/whiteKnight.png";
    }
}

class Queen extends ChessPiece {
    constructor(isBlack, pos){
        super(pos);
        this.img.src = isBlack ? "img/blackQueen.png" : "img/whiteQueen.png";
    }
}

class King extends ChessPiece {
    constructor(isBlack, pos){
        super(pos);
        this.img.src = isBlack ? "img/blackKing.png" : "img/whiteKing.png";
    }
}

window.onload = function(){
    canvas = document.getElementById("chess");
    ctx = canvas.getContext("2d");

    width = canvas.width / col;
    height = canvas.height / row;

    canvas.addEventListener("click", getMousePos);

    setup();
}

function setup(){
    board = new Board();

    black = new Player("black");
    white = new Player("white");
    
    for(let i = 0; i < 2; i++){
        let isBlack = i === 0 ? true : false;
        let line = i === 0 ? 0 : 7;
        
        // Pawn creation
        let pawn = [];
        for(let j = 0; j < col; j++){
            let pawnLine = i === 0 ? 1 : 6;
            pawn.push(new Pawn(isBlack, board.pos[pawnLine][j]));
            board.pos[pawnLine][j].state = true;
            board.pos[pawnLine][j].currentPiece = pawn[j];
            pawn[j].img.onload = function(){
                pawn[j].draw();
            }
        }

        // Rook, bishop, and knight creation
        let rook = [];
        let bishop = [];
        let knight = [];
        for(let j = 0; j < 2; j++){
            rook.push(new Rook(isBlack, board.pos[line][j*7]));
            board.pos[line][j*7].state = true;
            board.pos[line][j*7].currentPiece = rook[j];
            rook[j].img.onload = function(){
                rook[j].draw();
            }
            bishop.push(new Bishop(isBlack, board.pos[line][j*3+2]));
            board.pos[line][j*3+2].state = true;
            board.pos[line][j*3+2].currentPiece = bishop[j];
            bishop[j].img.onload = function(){
                bishop[j].draw();
            }
            knight.push(new Knight(isBlack, board.pos[line][j*5+1]));
            board.pos[line][j*5+1].state = true;
            board.pos[line][j*5+1].currentPiece = knight[j];
            knight[j].img.onload = function(){
                knight[j].draw();
            }
        }

        // Queen creation
        let queen = new Queen(isBlack, board.pos[line][4]);
        board.pos[line][4].state = true;
        board.pos[line][4].currentPiece = queen;
        queen.img.onload = function(){
            queen.draw();
        }

        // King creation
        let king = new King(isBlack, board.pos[line][3]);
        board.pos[line][3].state = true;
        board.pos[line][3].currentPiece = king;
        king.img.onload = function(){
            king.draw();
        }

        if(isBlack){
            black.pawn = pawn;
            black.rook = rook;
            black.bishop = bishop;
            black.knight = knight;
            black.queen = queen;
            black.king = king;
        } else {
            white.pawn = pawn;
            white.rook = rook;
            white.bishop = bishop;
            white.knight = knight;
            white.queen = queen;
            white.king = king;
        }
    }
}

function getMousePos(event){
    let pos = {
        x: event.pageX - this.offsetLeft,
        y: event.pageY - this.offsetTop
    }
    choosePiece(pos);
}

function choosePiece(pos){
    for(let i = 0; i < board.pos.length; i++){
        for(let j = 0; j < board.pos.length; j++){
            if(pos.x >= board.pos[i][j].x && pos.x <= board.pos[i][j].x + width){
                if(pos.y >= board.pos[i][j].y && pos.y <= board.pos[i][j].y + height){
                    if(board.pos[i][j].state){
                        startMove(board.pos[i][j].currentPiece);
                    }
                }
            }
        }
    }
}

function startMove(piece){
    console.log(piece);
}