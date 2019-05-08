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
        let posx;
        switch(this.x){
            case 0: posx = "A"; break;
            case width: posx = "B"; break;
            case width*2: posx = "C"; break;
            case width*3: posx = "D"; break;
            case width*4: posx = "E"; break;
            case width*5: posx = "F"; break;
            case width*6: posx = "G"; break;
            case width*7: posx = "H"; break;
        }
        let posy;
        switch(this.y){
            case 0: posy = "8"; break;
            case height: posy = "7"; break;
            case height*2: posy = "6"; break;
            case height*3: posy = "5"; break;
            case height*4: posy = "4"; break;
            case height*5: posy = "3"; break;
            case height*6: posy = "2"; break;
            case height*7: posy = "1"; break;
        }
        this.char = posx + posy;
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
        this.img.src = isBlack ? "img/blackPawn.png" : "img/whitePawn.png";     
        this.firstTurn = true;
        this.char = "p";                                                                                                                                                                                          
    }
    getMoves(){
        let moveDistance;
        if(this.firstTurn){
            moveDistance = 2;
        }else{
            moveDistance = 1;
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
    console.log(pos.char);
}