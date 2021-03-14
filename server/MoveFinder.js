// class that manages available moves based on chessboard state and some other data

module.exports = class MoveFinder {
    static getPieceColor(piece) {
        if(piece[0] == 'b')
            return 'black'
        else if(piece[0] == 'w')
            return 'white'
    }

    static getPieceType(piece) {
        let p = piece[1]
        if(p == 'P')
            return 'P'
        if(p == 'N')
            return 'N'
        if(p == 'B')
            return 'B'
        if(p == 'R')
            return 'R'
        if(p == 'Q')
            return 'Q'
        if(p == 'K')
            return 'K'
    }

    static colorToNumber(color) {
        if(color == 'white')
            return 1;
        else 
            return -1;
    }

    static tileIsInBoard(tile) {
        return tile < 99 && tile > 20 && tile % 10 != 0 && tile % 10 != 9
    }
    

    static getAllAvailableMoves(chessboard, castlingInfo) {
        let availableMoves = []
        for(let t in chessboard) {
            let content = chessboard[t]
            if(content != '') {
                availableMoves = availableMoves.concat(this.getAvailableMovesForPiece(content, t, chessboard))
            }
        }


        console.log(castlingInfo)
        if(castlingInfo.whiteShortCastleAvailable && this.isTileEmpty(97, chessboard) && this.isTileEmpty(96, chessboard))
            availableMoves.push({from: 95, to: 97})
        if(castlingInfo.whiteLongCastleAvailable && this.isTileEmpty(94, chessboard) && this.isTileEmpty(93, chessboard) && this.isTileEmpty(92, chessboard))
            availableMoves.push({from: 95, to: 93})
        if(castlingInfo.blackShortCastleAvailable && this.isTileEmpty(27, chessboard) && this.isTileEmpty(26, chessboard))
            availableMoves.push({from: 25, to: 27})
        if(castlingInfo.blackLongCastleAvailable && this.isTileEmpty(97, chessboard) && this.isTileEmpty(23, chessboard) && this.isTileEmpty(22, chessboard))
            availableMoves.push({from: 25, to: 23})
        
        return availableMoves
    }

    static isTileEmpty(tile, chessboard) {

        return chessboard[tile] == ''
    }
    

    static getAvailableMovesForPiece(piece, currentTile, chessboard) {
        let availableMoves = []
        const pieceColor = this.getPieceColor(piece)
        currentTile = Number(currentTile)

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

        } else if(this.getPieceType(piece) == 'N') {
            if(this.tileIsInBoard(currentTile - 20 - 1) && this.getPieceColor(chessboard[currentTile - 20 - 1]) != this.getPieceColor(piece))
                availableMoves.push({from: currentTile, to: currentTile - 20 - 1})
            if(this.tileIsInBoard(currentTile - 20 + 1) && this.getPieceColor(chessboard[currentTile - 20 + 1]) != this.getPieceColor(piece))
                availableMoves.push({from: currentTile, to: currentTile - 20 + 1})
            if(this.tileIsInBoard(currentTile + 20 - 1) && this.getPieceColor(chessboard[currentTile + 20 - 1]) != this.getPieceColor(piece))
                availableMoves.push({from: currentTile, to: currentTile + 20 - 1})
            if(this.tileIsInBoard(currentTile + 20 + 1) && this.getPieceColor(chessboard[currentTile + 20 + 1]) != this.getPieceColor(piece))
                availableMoves.push({from: currentTile, to: currentTile + 20 + 1})
            if(this.tileIsInBoard(currentTile - 10 - 2) && this.getPieceColor(chessboard[currentTile - 10 - 2]) != this.getPieceColor(piece))
                availableMoves.push({from: currentTile, to: currentTile - 10 - 2})
            if(this.tileIsInBoard(currentTile - 10 + 2) && this.getPieceColor(chessboard[currentTile - 10 + 2]) != this.getPieceColor(piece))
                availableMoves.push({from: currentTile, to: currentTile - 10 + 2})
            if(this.tileIsInBoard(currentTile + 10 - 2) && this.getPieceColor(chessboard[currentTile + 10 - 2]) != this.getPieceColor(piece))
                availableMoves.push({from: currentTile, to: currentTile + 10 - 2})
            if(this.tileIsInBoard(currentTile + 10 + 2) && this.getPieceColor(chessboard[currentTile + 10 + 2]) != this.getPieceColor(piece))
                availableMoves.push({from: currentTile, to: currentTile + 10 + 2})

        } else if(this.getPieceType(piece) == 'B') {

            let directions = [-11, -9, 11, 9]

            for(let d of directions) {
                for(let i = currentTile + d; i > 0 && i < 99; i += d) {
                    let tileIsInBoard = this.tileIsInBoard(i)
                    if(tileIsInBoard && this.isTileEmpty(i, chessboard))
                    {
                        availableMoves.push({from: currentTile, to: i})
    
                    } else if(tileIsInBoard && !this.isTileEmpty(i, chessboard)){
                        if(this.getPieceColor(chessboard[i]) != pieceColor) {
                            availableMoves.push({from: currentTile, to: i})
                            break;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
            
        } else if(this.getPieceType(piece) == 'R') {
            let directions = [-10, -1, 10, 1]
            for(let d of directions) {
                for(let i = currentTile + d; i > 0 && i < 99; i += d) {
                    let tileIsInBoard = this.tileIsInBoard(i)
                    if(tileIsInBoard && this.isTileEmpty(i, chessboard))
                    {
                        availableMoves.push({from: currentTile, to: i})
    
                    } else if(tileIsInBoard && !this.isTileEmpty(i, chessboard)){
                        if(this.getPieceColor(chessboard[i]) != pieceColor) {
                            availableMoves.push({from: currentTile, to: i})
                            break;
                        } else {
                            break;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
            
        } else if(this.getPieceType(piece) == 'Q') {
            let directionsStraight = [-10, -1, 10, 1]
            for(let d of directionsStraight) {
                for(let i = currentTile + d; i > 0 && i < 99; i += d) {
                    let tileIsInBoard = this.tileIsInBoard(i)
                    if(tileIsInBoard && this.isTileEmpty(i, chessboard))
                    {
                        availableMoves.push({from: currentTile, to: i})
    
                    } else if(tileIsInBoard && !this.isTileEmpty(i, chessboard)){
                        if(this.getPieceColor(chessboard[i]) != pieceColor) {
                            availableMoves.push({from: currentTile, to: i})
                            break;
                        } else {
                            break;
                        }
                    }
                    else {
                        break;
                    }
                }
            }

            let directionsDiag = [-11, -9, 11, 9]
            for(let d of directionsDiag) {
                for(let i = currentTile + d; i > 0 && i < 99; i += d) {
                    let tileIsInBoard = this.tileIsInBoard(i)
                    if(tileIsInBoard && this.isTileEmpty(i, chessboard))
                    {
                        availableMoves.push({from: currentTile, to: i})
    
                    } else if(tileIsInBoard && !this.isTileEmpty(i, chessboard)){
                        if(this.getPieceColor(chessboard[i]) != pieceColor) {
                            availableMoves.push({from: currentTile, to: i})
                            break;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
            
        } else if(this.getPieceType(piece) == 'K') {
            for(let x = -1; x < 2; x++){
                for(let y = -1; y < 2; y++){
                    
                    let destinationTile = currentTile + 10*x + y
                    let tileIsInBoard = this.tileIsInBoard(destinationTile)

                    if(!(y == 0 && x == 0)) {
                        if(tileIsInBoard && this.isTileEmpty(destinationTile, chessboard))
                        {
                            availableMoves.push({from: currentTile, to: destinationTile})
        
                        } else if(tileIsInBoard && this.getPieceColor(chessboard[destinationTile]) != pieceColor) {
                            availableMoves.push({from: currentTile, to: destinationTile})
                        }
                    }
                }
            }

        }

        return availableMoves;
    }
}