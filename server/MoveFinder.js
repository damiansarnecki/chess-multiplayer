// class that manages available moves based on chessboard state and some other data

module.exports = class MoveFinder {
    static getPieceColor(piece) {
        if (piece[0] == 'b')
            return 'black'
        else if (piece[0] == 'w')
            return 'white'
    }

    static getOpponent(color) {
        if (color == 'white')
            return 'black'
        else
            return 'white'
    }

    static getPieceType(piece) {
        return piece[1].toUpperCase();
    }

    static colorToNumber(color) {
        if (color == 'white')
            return 1;
        else
            return -1;
    }

    static tileIsInBoard(tile) {
        return tile < 99 && tile > 20 && tile % 10 != 0 && tile % 10 != 9
    }

    static getAllAvailableMoves(chessboard, castlingInfo) {
        let availableMoves = []
        for (let t in chessboard) {
            let content = chessboard[t]
            if (content != '') {
                availableMoves = availableMoves.concat(this.getAvailableMovesForPiece(content, t, chessboard))
            }
        }


        if (castlingInfo.whiteShortCastleAvailable && this.isTileEmpty(97, chessboard) && this.isTileEmpty(96, chessboard))
            availableMoves.push({ from: 95, to: 97 })
        if (castlingInfo.whiteLongCastleAvailable && this.isTileEmpty(94, chessboard) && this.isTileEmpty(93, chessboard) && this.isTileEmpty(92, chessboard))
            availableMoves.push({ from: 95, to: 93 })
        if (castlingInfo.blackShortCastleAvailable && this.isTileEmpty(27, chessboard) && this.isTileEmpty(26, chessboard))
            availableMoves.push({ from: 25, to: 27 })
        if (castlingInfo.blackLongCastleAvailable && this.isTileEmpty(97, chessboard) && this.isTileEmpty(23, chessboard) && this.isTileEmpty(22, chessboard))
            availableMoves.push({ from: 25, to: 23 })

        //delete moves that put or keep current player king in check


        return availableMoves
    }

    static findMovesThatCheckYourKing(chessboard, availableMoves, currentTurn, castlingInfo, checkInfo) {
        let movesToDelete = []

        for (let move of availableMoves.filter(m => this.getPieceColor(chessboard[m.from]) == currentTurn)) {
            let testChessboard = [...chessboard]
            testChessboard[move.to] = testChessboard[move.from]
            testChessboard[move.from] = ''


            let kingPosition = this.getKingsPositions(testChessboard);
            if (currentTurn == 'white')
                kingPosition = kingPosition.white
            else
                kingPosition = kingPosition.black

            let opponentAvailableMoves = this.getAllAvailableMoves(testChessboard, castlingInfo, checkInfo, this.getOpponent(currentTurn))

            for (let opponentMove of opponentAvailableMoves) {
                if (opponentMove.to == kingPosition) {
                    movesToDelete.push(move)
                    break;
                }

            }


        }


        return movesToDelete;

    }

    static handleCastlingValidation(availableMoves, chessboard, currentTurn) {
        let movesToDelete = []

        let whiteKingInCheck = this.isSquareAttacked(chessboard.indexOf('wK'), availableMoves, chessboard, currentTurn)
        let blackKingInCheck = this.isSquareAttacked(chessboard.indexOf('bK'), availableMoves, chessboard, currentTurn)

        console.log(whiteKingInCheck)


        if (currentTurn == 'white') {
            if (whiteKingInCheck) {
                movesToDelete.push({ from: 95, to: 97 })
                movesToDelete.push({ from: 95, to: 93 })
            }

            if (this.isSquareAttacked(96, availableMoves, currentTurn) || this.isSquareAttacked(97, availableMoves, chessboard, currentTurn))
                movesToDelete.push({ from: 95, to: 97 })

            if (this.isSquareAttacked(94, availableMoves, chessboard, currentTurn) || this.isSquareAttacked(93, availableMoves, chessboard, currentTurn) || this.isSquareAttacked(92, availableMoves, chessboard, currentTurn))
                movesToDelete.push({ from: 95, to: 93 })

        } else {
            if (blackKingInCheck) {
                movesToDelete.push({ from: 25, to: 27 })
                movesToDelete.push({ from: 25, to: 23 })
            }

            if (this.isSquareAttacked(26, availableMoves, currentTurn) || this.isSquareAttacked(27, availableMoves, chessboard, currentTurn))
                movesToDelete.push({ from: 25, to: 27 })

            if (this.isSquareAttacked(24, availableMoves, chessboard, currentTurn) || this.isSquareAttacked(23, availableMoves, chessboard, currentTurn) || this.isSquareAttacked(22, availableMoves, chessboard, currentTurn))
                movesToDelete.push({ from: 25, to: 23 })
        }

        return movesToDelete;
    }

    static getKingsPositions(chessboard) {
        let whiteKingPosition = false;
        let blackKingPosition = false;

        for (let tile in chessboard) {
            if (chessboard[tile] == 'bK')
                blackKingPosition = tile
            else if (chessboard[tile] == 'wK')
                whiteKingPosition = tile
        }

        return {
            white: whiteKingPosition,
            black: blackKingPosition
        }
    }

    static isTileEmpty(tile, chessboard) {

        return chessboard[tile] == ''
    }

    static isSquareAttacked(tile, availableMoves, chessboard = null, currentTurn = false) {
        let isAttacked = false
        for (let m of availableMoves) {
            if (m.to == tile) {

                if (currentTurn) {

                    if (this.getPieceColor(chessboard[m.from]) != currentTurn) {
                        isAttacked = true
                        break;
                    }
                }
            }
        }
        return isAttacked;
    }


    static getAvailableMovesForPiece(piece, currentTile, chessboard) {
        let availableMoves = []
        const pieceColor = this.getPieceColor(piece)
        currentTile = Number(currentTile)

        if (this.getPieceType(piece) == 'P') {

            //moving forward
            if (this.isTileEmpty(currentTile - this.colorToNumber(pieceColor) * 10, chessboard))
                availableMoves.push({ from: currentTile, to: currentTile - this.colorToNumber(pieceColor) * 10 })

            //first move by two squares
            if (pieceColor == 'black' && currentTile < 40 || pieceColor == 'white' && currentTile > 80) //check if pawn is at second rank from start
            {
                if (this.isTileEmpty(currentTile - this.colorToNumber(pieceColor) * 10, chessboard) && this.isTileEmpty(currentTile - this.colorToNumber(pieceColor) * 20, chessboard)) {
                    availableMoves.push({ from: currentTile, to: currentTile - this.colorToNumber(pieceColor) * 20 })
                }
            }

            //attacking other piece
            const squareToDiagRight = currentTile - this.colorToNumber(pieceColor) * 10 + 1
            const squareToDiagLeft = currentTile - this.colorToNumber(pieceColor) * 10 - 1

            if (chessboard[squareToDiagRight][0] != piece[0] && chessboard[squareToDiagRight] != '')
                availableMoves.push({ from: currentTile, to: currentTile - this.colorToNumber(pieceColor) * 10 + 1 })
            if (chessboard[squareToDiagLeft][0] != piece[0] && chessboard[squareToDiagLeft] != '')
                availableMoves.push({ from: currentTile, to: currentTile - this.colorToNumber(pieceColor) * 10 - 1 })

        } else if (this.getPieceType(piece) == 'N') {
            if (this.tileIsInBoard(currentTile - 20 - 1) && this.getPieceColor(chessboard[currentTile - 20 - 1]) != this.getPieceColor(piece))
                availableMoves.push({ from: currentTile, to: currentTile - 20 - 1 })
            if (this.tileIsInBoard(currentTile - 20 + 1) && this.getPieceColor(chessboard[currentTile - 20 + 1]) != this.getPieceColor(piece))
                availableMoves.push({ from: currentTile, to: currentTile - 20 + 1 })
            if (this.tileIsInBoard(currentTile + 20 - 1) && this.getPieceColor(chessboard[currentTile + 20 - 1]) != this.getPieceColor(piece))
                availableMoves.push({ from: currentTile, to: currentTile + 20 - 1 })
            if (this.tileIsInBoard(currentTile + 20 + 1) && this.getPieceColor(chessboard[currentTile + 20 + 1]) != this.getPieceColor(piece))
                availableMoves.push({ from: currentTile, to: currentTile + 20 + 1 })
            if (this.tileIsInBoard(currentTile - 10 - 2) && this.getPieceColor(chessboard[currentTile - 10 - 2]) != this.getPieceColor(piece))
                availableMoves.push({ from: currentTile, to: currentTile - 10 - 2 })
            if (this.tileIsInBoard(currentTile - 10 + 2) && this.getPieceColor(chessboard[currentTile - 10 + 2]) != this.getPieceColor(piece))
                availableMoves.push({ from: currentTile, to: currentTile - 10 + 2 })
            if (this.tileIsInBoard(currentTile + 10 - 2) && this.getPieceColor(chessboard[currentTile + 10 - 2]) != this.getPieceColor(piece))
                availableMoves.push({ from: currentTile, to: currentTile + 10 - 2 })
            if (this.tileIsInBoard(currentTile + 10 + 2) && this.getPieceColor(chessboard[currentTile + 10 + 2]) != this.getPieceColor(piece))
                availableMoves.push({ from: currentTile, to: currentTile + 10 + 2 })

        } else if (this.getPieceType(piece) == 'B') {

            let directions = [-11, -9, 11, 9]

            for (let d of directions) {
                for (let i = currentTile + d; i > 0 && i < 99; i += d) {
                    let tileIsInBoard = this.tileIsInBoard(i)
                    if (tileIsInBoard && this.isTileEmpty(i, chessboard)) {
                        availableMoves.push({ from: currentTile, to: i })

                    } else if (tileIsInBoard && !this.isTileEmpty(i, chessboard)) {
                        if (this.getPieceColor(chessboard[i]) != pieceColor) {
                            availableMoves.push({ from: currentTile, to: i })
                            break;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }

        } else if (this.getPieceType(piece) == 'R') {
            let directions = [-10, -1, 10, 1]
            for (let d of directions) {
                for (let i = currentTile + d; i > 0 && i < 99; i += d) {
                    let tileIsInBoard = this.tileIsInBoard(i)
                    if (tileIsInBoard && this.isTileEmpty(i, chessboard)) {
                        availableMoves.push({ from: currentTile, to: i })

                    } else if (tileIsInBoard && !this.isTileEmpty(i, chessboard)) {
                        if (this.getPieceColor(chessboard[i]) != pieceColor) {
                            availableMoves.push({ from: currentTile, to: i })
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

        } else if (this.getPieceType(piece) == 'Q') {
            let directionsStraight = [-10, -1, 10, 1]
            for (let d of directionsStraight) {
                for (let i = currentTile + d; i > 0 && i < 99; i += d) {
                    let tileIsInBoard = this.tileIsInBoard(i)
                    if (tileIsInBoard && this.isTileEmpty(i, chessboard)) {
                        availableMoves.push({ from: currentTile, to: i })

                    } else if (tileIsInBoard && !this.isTileEmpty(i, chessboard)) {
                        if (this.getPieceColor(chessboard[i]) != pieceColor) {
                            availableMoves.push({ from: currentTile, to: i })
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
            for (let d of directionsDiag) {
                for (let i = currentTile + d; i > 0 && i < 99; i += d) {
                    let tileIsInBoard = this.tileIsInBoard(i)
                    if (tileIsInBoard && this.isTileEmpty(i, chessboard)) {
                        availableMoves.push({ from: currentTile, to: i })

                    } else if (tileIsInBoard && !this.isTileEmpty(i, chessboard)) {
                        if (this.getPieceColor(chessboard[i]) != pieceColor) {
                            availableMoves.push({ from: currentTile, to: i })
                            break;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }

        } else if (this.getPieceType(piece) == 'K') {
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {

                    let destinationTile = currentTile + 10 * x + y
                    let tileIsInBoard = this.tileIsInBoard(destinationTile)

                    if (!(y == 0 && x == 0)) {
                        if (tileIsInBoard && this.isTileEmpty(destinationTile, chessboard)) {
                            availableMoves.push({ from: currentTile, to: destinationTile })

                        } else if (tileIsInBoard && this.getPieceColor(chessboard[destinationTile]) != pieceColor) {
                            availableMoves.push({ from: currentTile, to: destinationTile })
                        }
                    }
                }
            }

        }

        return availableMoves;
    }
}