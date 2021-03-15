<template>
  <div
    class="piece"
    v-bind:style="[
      beingHeld
        ? {
            transform: `translate(${mouseCoordinates.x - 50}px, ${
              mouseCoordinates.y - 50
            }px )`,
            transition: 'none',
            zIndex: 999,
          }
        : {
            transform: `translate(${file * 100 + 5}px, ${rank * 100 + 5}px )`,
            transition: '0.1s',
          },
      { backgroundImage: `url(pieces/${pieceImages[name]})` },
    ]"
    draggable="false"
  ></div>
</template>

<script>
export default {
  name: "Tile",
  props: ["name", "index", "mouseCoordinates", "beingHeld"],
  data() {
    return {
      pieceImages: {
        bP: "black-pawn.png",
        wP: "white-pawn.png",
        wR: "white-rook.png",
        bR: "black-rook.png",
        bN: "black-knight.png",
        wN: "white-knight.png",
        wB: "white-bishop.png",
        bB: "black-bishop.png",
        wK: "white-king.png",
        bK: "black-king.png",
        wQ: "white-queen.png",
        bQ: "black-queen.png",
      },
    };
  },
  computed: {
    file() {
      return (this.index % 10) - 1;
    },
    rank() {
      return Math.floor(this.index / 10 - 2);
    },
  },
};
</script>

<style scoped>
.piece {
  width: 90px;
  position: absolute;
  transition: 0.1s;
  height: 90px;
  background-repeat: no-repeat;
  border: none;
  background-size: 90px 90px;
}
</style>
