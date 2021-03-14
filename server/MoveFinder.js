// class that manages available moves based on chessboard state and some other data

module.exports = class MoveFinder {
    static getPieceColor(piece) {
        if(piece[0] == 'b')
            return 'black'
        else if(piece[0] == 'w')
            return 'white'
    }

    static getPieceType(piece) {
        if(piece[1] == 'P')
            return 'P'
    }

    static colorToNumber(color) {
        if(color == 'white')
            return 1;
        else 
            return -1;
    }

    static getAllAvailableMoves(chessboard) {
        let availableMoves = []
        for(let t in chessboard) {
            let content = chessboard[t]
            if(content != '') {
                availableMoves = availableMoves.concat(this.getAvailableMovesForPiece(content, t, chessboard))
            }
        }
        
        return availableMoves
    }

    static isTileEmpty(tile, chessboard) {

        return chessboard[tile] == ''
    }
    

    static getAvailableMovesForPiece(piece, currentTile, chessboard) {
        let availableMoves = []
        const pieceColor = this.getPieceColor(piece)

        if(this.getPieceType(piece) == 'P') {

            //moving forward
            if(this.isTileEmpty(currentTile - this.colorToNumber(pieceColor)*10, chessboard))
                availableMoves.push({from: currentTile, to: currentTile - this.colorToNumber(pieceColor)*10})

            //first move by two squares
            if(pieceColor == 'black' && currentTile < 40 || pieceColor == 'white' && currentTile > 80) //check if pawn is at second rank from start
            {
                if(this.isTileEmpty(currentTile - this.colorToNumber(pieceColor)*10, chessboard) && this.isTileEmpty(currentTile - this.colorToNumber(pieceColor)*20, chessboard)) {
                    availableMoves.push({from: currentTile, to: currentTile - this.colorToNumber(pieceColor)*20})
                }
            }

            //attacking other piece
            const squareToDiagRight = currentTile - this.colorToNumber(pieceColor)*10 + 1
            const squareToDiagLeft = currentTile - this.colorToNumber(pieceColor)*10 - 1

            if(chessboard[squareToDiagRight][0] != piece[0] && chessboard[squareToDiagRight] != '')
                availableMoves.push({from: currentTile, to: currentTile - this.colorToNumber(pieceColor)*10 + 1})
            if(chessboard[squareToDiagLeft][0] != piece[0] && chessboard[squareToDiagLeft] != '')
                availableMoves.push({from: currentTile, to: currentTile - this.colorToNumber(pieceColor)*10 - 1})
        } else if(this.getPieceType(piece) == 'K') {

        }
        

        return availableMoves;
    }
}