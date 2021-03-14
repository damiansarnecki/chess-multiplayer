const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
});

const ChessGame = require('./chessGame.js')

let game = new ChessGame();

app.use('/public', express.static(__dirname + '/public'));

io.on("connection", socket => {
    socket.emit("chessboardState", {chessboard: game.getChessboard()})

    socket.on("move", (move) => {
        let success = game.makeMove(move)
        if(success)
            io.sockets.emit("chessboardState", {chessboard: game.getChessboard()})
    })
})


http.listen(process.env.PORT || 3000)