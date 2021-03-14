<template>
    <img class="piece" v-bind:style="{transform: `translate(${file*100 + 5}px, ${rank*100 + 5}px )`}" v-bind:src="`pieces/${pieceImages[name]}`"/>
</template>

<script>
export default {
  name: 'Tile',
  props: ['name', 'index'],
  data() {
      return {
          pieceImages: {
            'bP': 'black-pawn.png',
            'wP': 'white-pawn.png',
            'wR': 'white-rook.png',
            'bR': 'black-rook.png',
            'bN': 'black-knight.png',
            'wN': 'white-knight.png',
            'wB': 'white-bishop.png',
            'bB': 'black-bishop.png',
            'wK': 'white-king.png',
            'bK': 'black-king.png',
            'wQ': 'white-queen.png',
            'bQ': 'black-queen.png',
        }
      }
  },
  computed: {
    file() {
      return (this.index % 10 - 1)
    }, 
    rank() {
      return Math.floor(this.index / 10 - 2)
    }
  }
}
</script>

<style scoped>
  .piece {
    width: 90px;
    position: absolute;
    transition: 0.1s;
  }
</style>
