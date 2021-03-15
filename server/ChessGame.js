const MoveFinder = require('./MoveFinder.js')

module.exports = class ChessGame {
    constructor() {
        this.chessboard = new Array(120).fill('');
        this.currentTurn = 'white'

        this.castlingInfo = {
            whiteLongCastleAvailable: true,
            whiteShortCastleAvailable: true,
            blackLongCastleAvailable: true,
            blackShortCastleAvailable: true,
        }

        this.checkInfo = {
            white: false,
            black: false
        }

        this.setupChessBoard();
        this.availableMoves = this.findAvailableMoves()
    }

    setupChessBoard() {

        for (let i = 0; i < 8; i++) {
            this.chessboard[FR2SQ(i, 1)] = 'bP'
            this.chessboard[FR2SQ(i, 6)] = 'wP'
        }

        for (let i = 0; i < 8; i += 7) {
            this.chessboard[FR2SQ(i, 0)] = 'bR'
            this.chessboard[FR2SQ(i, 7)] = 'wR'
        }

        for (let i = 1; i < 8; i += 5) {
            this.chessboard[FR2SQ(i, 0)] = 'bN'
            this.chessboard[FR2SQ(i, 7)] = 'wN'
        }

        for (let i = 2; i < 8; i += 3) {
            this.chessboard[FR2SQ(i, 0)] = 'bB'
            this.chessboard[FR2SQ(i, 7)] = 'wB'
        }

        this.chessboard[FR2SQ(3, 0)] = 'bQ'
        this.chessboard[FR2SQ(3, 7)] = 'wQ'

        this.chessboard[FR2SQ(4, 0)] = 'bK'
        this.chessboard[FR2SQ(4, 7)] = 'wK'
    }

    findAvailableMoves() {
        let availableMoves = MoveFinder.getAllAvailableMoves(this.chessboard, this.castlingInfo, this.checkInfo, this.currentTurn)

        let movesToDelete = MoveFinder.findMovesThatCheckYourKing(this.chessboard, availableMoves, this.currentTurn, this.castlingInfo, this.checkInfo);

        availableMoves = availableMoves.filter(function (m) {
            return movesToDelete.indexOf(m) < 0;
        });

        let moreMovesToDelete = MoveFinder.handleCastlingValidation(availableMoves, this.chessboard, this.currentTurn)

        for (let m of moreMovesToDelete) {
            availableMoves = availableMoves.filter(move => move.from != m.from || move.to != m.to)
        }

        return availableMoves
    }

    makeMove(move) {
        const piece = this.chessboard[move.from]

        if (MoveFinder.getPieceColor(piece) != this.currentTurn)
            return false;

        if (this.availableMoves.filter(availableMove => availableMove.from == move.from && availableMove.to == move.to).length > 0) {

            if (move.from == 95 && move.to == 97 && this.castlingInfo.whiteShortCastleAvailable) {

                this.chessboard[96] = this.chessboard[98];
                this.chessboard[98] = ""
            } else if (move.from == 95 && move.to == 93 && this.castlingInfo.whiteLongCastleAvailable) {

                this.chessboard[94] = this.chessboard[91];
                this.chessboard[91] = ""
            } else if (move.from == 25 && move.to == 27 && this.castlingInfo.blackShortCastleAvailable) {

                this.chessboard[26] = this.chessboard[28];
                this.chessboard[28] = ""

            } else if (move.from == 25 && move.to == 23 && this.castlingInfo.blackLongCastleAvailable) {

                this.chessboard[24] = this.chessboard[21];
                this.chessboard[21] = ""
            }

            this.chessboard[move.to] = this.chessboard[move.from];
            this.chessboard[move.from] = ""

            // cant castle if rook is dead or moved already
            if (move.from == 98 || move.to == 98)
                this.castlingInfo.whiteShortCastleAvailable = false;
            if (move.from == 91 || move.to == 91)
                this.castlingInfo.whiteLongCastleAvailable = false;
            if (move.from == 21 || move.to == 21)
                this.castlingInfo.blackShortCastleAvailable = false;
            if (move.from == 28 || move.to == 28)
                this.castlingInfo.blackLongCastleAvailable = false;

            // cant castle if king moved
            if (move.from == 95) {
                this.castlingInfo.whiteLongCastleAvailable = false;
                this.castlingInfo.whiteShortCastleAvailable = false;
            } else if (move.from == 25) {
                this.castlingInfo.blackLongCastleAvailable = false;
                this.castlingInfo.blackShortCastleAvailable = false;
            }

        } else {
            return false;
        }

        this.swapTurn();

        this.availableMoves = this.findAvailableMoves()
        return true;
    }

    getChessboard() {
        return this.chessboard;
    }

    swapTurn() {
        if (this.currentTurn == 'white')
            this.currentTurn = 'black'
        else
            this.currentTurn = 'white'
    }
}

//chessboard is array of length equal to 120 to simplify some calculations, this function let us get file and rank in (0-7, 0-7) format
function FR2SQ(file, rank) {
    return ((21 + file) + (rank * 10));
}