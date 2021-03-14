const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
});

const ChessGame = require('./ChessGame.js')

let game = new ChessGame();

app.use('/public', express.static(__dirname + '/public'));

io.on("connection", socket => {
    socket.emit("chessboardState", {chessboard: game.getChessboard()})

    socket.on("move", (move) => {
        let success = game.makeMove(move)
        if(success){
            io.sockets.emit("chessboardMove", move)

            //handle castling
            if(move.from == 95 && move.to == 97) 
                io.sockets.emit("chessboardMove", {from: 98, to: 96})
            if(move.from == 95 && move.to == 93) 
                io.sockets.emit("chessboardMove", {from: 91, to: 94})
            if(move.from == 25 && move.to == 27) 
                io.sockets.emit("chessboardMove", {from: 28, to: 26})
            if(move.from == 25 && move.to == 23) 
                io.sockets.emit("chessboardMove", {from: 21, to: 24})
        }
            
    })

    socket.on("getMovesForSquare", square => {
        let moves = game.availableMoves.filter(move => move.from == square)
        socket.emit("movesForSquare", moves)
    })
})


http.listen(process.env.PORT || 3000)