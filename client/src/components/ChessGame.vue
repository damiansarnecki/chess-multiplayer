<template>
  <Chessboard 
    :board='board'
    @clicked='onClickTile'
    :activeTile='activeTile'
  />

</template>

<script>

import io from 'socket.io-client'
import Chessboard from './Chessboard.vue'

export default {
  name: 'ChessGame',
  components: {
    Chessboard
  },
  data() {
    return {
      socket: {},
      board: new Array(120).fill(0),
      clickedTiles: [],
      activeTile: false
    }
  },
  methods: {
    onClickTile(value) {
      if(this.board[value] == '' && this.clickedTiles.length == 0)
        return;
      this.clickedTiles.push(value);

      this.activeTile = value;

      if(this.clickedTiles.length == 2) {
        console.log(this.clickedTiles)
        if(this.clickedTiles[0] == '' && this.clickedTiles[1] == '' || this.board[value][0] == this.board[this.clickedTiles[0]][0]) {
          this.clickedTiles = [value]
        } else {
          this.sendMove(this.clickedTiles)
          this.clickedTiles = []
        }
      }
      
    },
    sendMove(tiles) {
      this.socket.emit('move', {from: tiles[0], to: tiles[1]})
    }
  },
  created() {
    this.socket = io("http://localhost:3000")
  },
  mounted() {
    this.socket.on('chessboardState', data => {
      this.board = data.chessboard;
    })
  }
}
</script>

<style scoped>

</style>
