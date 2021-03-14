<template>
    <img v-bind:src="`pieces/${pieceImages[name]}`"/>
</template>

<script>
export default {
  name: 'Tile',
  props: ['name'],
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
            'bB': 'black-rook.png',
            'wK': 'white-king.png',
            'bK': 'black-king.png',
            'wQ': 'white-queen.png',
            'bQ': 'black-queen.png',
        }
      }
  },
  computed: {

  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
