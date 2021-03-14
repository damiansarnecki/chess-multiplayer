const MoveFinder = require('./MoveFinder.js')

module.exports = class ChessGame {
    constructor() {
        this.chessboard = new Array(120).fill('');
        this.currentTurn = 'white'

        this.setupChessBoard();
        this.availableMoves = this.findAvailableMoves()
    }

    setupChessBoard() {

        for(let i = 0; i < 8; i++) {
            this.chessboard[FR2SQ(i,1)] = 'bP'
            this.chessboard[FR2SQ(i,6)] = 'wP'
        }

        for(let i = 0; i < 8; i+=7) {
            this.chessboard[FR2SQ(i,0)] = 'bR'
            this.chessboard[FR2SQ(i,7)] = 'wR'
        }

        for(let i = 1; i < 8; i+=5) {
            this.chessboard[FR2SQ(i,0)] = 'bN'
            this.chessboard[FR2SQ(i,7)] = 'wN'
        }

        for(let i = 2; i < 8; i+=3) {
            this.chessboard[FR2SQ(i,0)] = 'bB'
            this.chessboard[FR2SQ(i,7)] = 'wB'
        }

        this.chessboard[FR2SQ(3,0)] = 'bQ'
        this.chessboard[FR2SQ(3,7)] = 'wQ'

        this.chessboard[FR2SQ(4,0)] = 'bK'
        this.chessboard[FR2SQ(4,7)] = 'wK'
    }

    findAvailableMoves() {

        return MoveFinder.getAllAvailableMoves(this.chessboard)
    }

    makeMove(move) {

        const piece = this.chessboard[move.from]

        console.log(this.availableMoves)

        if(MoveFinder.getPieceColor(piece) != this.currentTurn)
            return false;

       

        if(this.availableMoves.filter(availableMove => availableMove.from == move.from && availableMove.to == move.to).length > 0) {
            this.chessboard[move.to] = this.chessboard[move.from];
            this.chessboard[move.from] = ""
        } else {
            return false;
        }

        this.swapTurn();
        return true;
    }

    getChessboard() {
        return this.chessboard;
    }

    swapTurn() {
        if(this.currentTurn == 'white')
            this.currentTurn = 'black'
        else 
            this.currentTurn = 'white'

        this.availableMoves = this.findAvailableMoves()
    }
}

//chessboard is array of length equal to 120 to simplify some calculations, this function let us get file and rank in (0-7, 0-7) format
function FR2SQ(file, rank) {
    return ((21 + file) + (rank*10));
}