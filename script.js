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

        let posx = "ABCDEFGH";
        let posy = "87654321";
        this.char = posx.charAt(this.x/width) + posy.charAt(this.y/height);
    }
    updatePiece(piece){
        this.currentPiece = piece;
    }
}

class ChessPiece {
    constructor(pos, isBlack){
        this.img = new Image();
        this.x = pos.x;
        this.y = pos.y;    
        this.indexX = this.x / width;
        this.indexY = this.y / height;
        this.isBlack = isBlack;                                                                                                                                                                                                     
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
    constructor(pos, isBlack){
        super(pos, isBlack);
        this.img.src = this.isBlack ? "img/blackPawn.png" : "img/whitePawn.png";     
        this.firstTurn = true;
        this.char = "p";                                                                                                                                                                                          
    }
    getMoves(){
        let moveDistance = this.firstTurn ? 2 : 1;
        if(this.isBlack){
            for(let i = 1; i < moveDistance+1; i++){
                let pos = board.pos[this.indexY+i][this.indexX];
                if(!pos.state){
                    ctx.beginPath();
                    ctx.fillStyle = "green";
                    ctx.arc(pos.x + width/2, pos.y + height/2, width/2, 0, 2*Math.PI);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }
}

class Rook extends ChessPiece {
    constructor(pos, isBlack){
        super(pos, isBlack);
        this.img.src = isBlack ? "img/blackRook.png" : "img/whiteRook.png";
        this.char = "r";
    }
}

class Bishop extends ChessPiece {
    constructor(pos, isBlack){
        super(pos, isBlack);
        this.img.src = isBlack ? "img/blackBishop.png" : "img/whiteBishop.png";
        this.char = "b";
    }
}

class Knight extends ChessPiece {
    constructor(pos, isBlack){
        super(pos, isBlack);
        this.img.src = isBlack ? "img/blackKnight.png" : "img/whiteKnight.png";
        this.char = "kn";
    }
}

class Queen extends ChessPiece {
    constructor(pos, isBlack){
        super(pos, isBlack);
        this.img.src = isBlack ? "img/blackQueen.png" : "img/whiteQueen.png";
        this.char = "q";
    }
}

class King extends ChessPiece {
    constructor(pos, isBlack){
        super(pos, isBlack);
        this.img.src = isBlack ? "img/blackKing.png" : "img/whiteKing.png";
        this.char = "k";
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
    
    for(let i = 0; i < 2; i++){
        let isBlack = i === 0 ? true : false;
        let line = i === 0 ? 0 : 7;
        
        // Pawn creation
        let pawn = [];
        for(let j = 0; j < col; j++){
            let pawnLine = i === 0 ? 1 : 6;
            pawn.push(new Pawn(board.pos[pawnLine][j], isBlack));
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
            rook.push(new Rook(board.pos[line][j*7], isBlack));
            board.pos[line][j*7].state = true;
            board.pos[line][j*7].currentPiece = rook[j];
            rook[j].img.onload = function(){
                rook[j].draw();
            }
            bishop.push(new Bishop(board.pos[line][j*3+2], isBlack));
            board.pos[line][j*3+2].state = true;
            board.pos[line][j*3+2].currentPiece = bishop[j];
            bishop[j].img.onload = function(){
                bishop[j].draw();
            }
            knight.push(new Knight(board.pos[line][j*5+1], isBlack));
            board.pos[line][j*5+1].state = true;
            board.pos[line][j*5+1].currentPiece = knight[j];
            knight[j].img.onload = function(){
                knight[j].draw();
            }
        }

        // Queen creation
        let queen = new Queen(board.pos[line][4], isBlack)
        board.pos[line][4].state = true;
        board.pos[line][4].updatePiece(queen);
        queen.img.onload = function(){
            queen.draw();
        }

        // King creation
        let king = new King(board.pos[line][3], isBlack);
        board.pos[line][3].state = true;
        board.pos[line][3].updatePiece(king);
        king.img.onload = function(){
            king.draw();
        }
    }
}

function getMousePos(event){
    let pos = {
        x: event.pageX - this.offsetLeft,
        y: event.pageY - this.offsetTop
    }
    getBoardPos(pos);
}

function getBoardPos(pos){
    for(let i = 0; i < board.pos.length; i++){
        for(let j = 0; j < board.pos.length; j++){
            if(pos.x >= board.pos[i][j].x && pos.x <= board.pos[i][j].x + width){
                if(pos.y >= board.pos[i][j].y && pos.y <= board.pos[i][j].y + height){
                    if(board.pos[i][j].state){
                        startMove(board.pos[i][j]);
                    }
                }
            }
        }
    }
}

function startMove(pos){
    console.log(`Pos: ${pos.char}   Piece: ${pos.currentPiece.char}`);
    pos.currentPiece.getMoves();
}