<template>
  <div class='container'>
    <Chessboard 
      :board='board'
      @clicked='onClickTile'
      :activeTile='activeTile'
      :availableMoves='availableMoves'
      :pieces='pieces'
    />
    <RightPanel></RightPanel>
  </div>

</template>

<script>

import io from 'socket.io-client'
import Chessboard from './Chessboard.vue'
import RightPanel from './RightPanel.vue'

export default {
  name: 'ChessGame',
  components: {
    Chessboard,
    RightPanel
  },
  data() {
    return {
      socket: {},
      board: new Array(120).fill(0),
      clickedTiles: [],
      activeTile: false,
      availableMoves: [], 
      pieces: []
    }
  },
  methods: {
    onClickTile(value) {
      if(this.board[value] == '' && this.clickedTiles.length == 0)
        return;

      this.clickedTiles.push(value);


      if(this.clickedTiles.length == 1)
      {
        this.socket.emit("getMovesForSquare", value)
      }

      this.activeTile = value;

      if(this.clickedTiles.length == 2) {
        console.log(this.clickedTiles)
        if(this.clickedTiles[0] == '' && this.clickedTiles[1] == '' || this.board[value][0] == this.board[this.clickedTiles[0]][0]) {
          this.clickedTiles = [value]
        } else {
          this.sendMove(this.clickedTiles)


          this.clickedTiles = []
          this.availableMoves = []
        }
      }
      
    },
    sendMove(tiles) {
      this.socket.emit('move', {from: tiles[0], to: tiles[1]})
    },
    movePiece(move) {
      for(let p of this.pieces) {
        if(move.from == p.index) {
          p.index = move.to;
        }
      }
    },
    deletePiece(to) {
      this.pieces = this.pieces.filter(p => p.index != to)
    }
  },
  computed: {
    piecesInGame() {
      return this.board.filter(tile => tile != '')
    }
  },
  created() {
    this.socket = io("http://localhost:3000")
  },
  mounted() {
    this.socket.on('chessboardState', data => {

      this.board = data.chessboard;
      for(let t in this.board) {
        if(this.board[t] != '') {
          this.pieces.push({
            name: this.board[t],
            index: t,
            id: Math.random()
          }) 
        }
      }

    })

    this.socket.on('movesForSquare', moves => {
      this.availableMoves = moves;
    })

    this.socket.on('chessboardMove', move => {

        this.deletePiece(move.to);
        this.movePiece(move)

        let audio;
        if(this.board[move.to] != '')
           audio = new Audio('sounds/capture.mp3')
        else 
           audio = new Audio('sounds/move.mp3')

        this.board[move.to] = this.board[move.from]
        this.board[move.from] = ''


        audio.volume = 0.4;
        audio.play()

    })
  }
}
</script>

<style scoped>
  .container {
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
    background-color: #333;

    grid-template-columns: 3fr 1fr;
  }
</style>
