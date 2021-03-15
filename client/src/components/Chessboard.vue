<template>
  <div
    v-on:mousemove="mousePosition"
    v-on:click="onClickButton"
    draggable="false"
    ref="chessboard"
    class="chessboard"
  >
    <Tile
      v-on:mousedown="holdPiece(tile)"
      v-on:mouseup="putPiece(tile)"
      :data="tile"
      :activeTile="activeTile"
      v-bind:key="index"
      :availableMove="
        availableMoves.filter((t) => t.to == tile.index).length > 0
      "
      v-for="(tile, index) in boardCleaned"
    >
    </Tile>
    <div class="pieces">
      <Piece
        :index="piece.index"
        v-bind:key="piece.id"
        :name="piece.name"
        :beingHeld="piece.beingHeld"
        :mouseCoordinates="mouseCoordinates"
        v-for="piece in pieces"
      ></Piece>
    </div>
  </div>
</template>

<script>
import Tile from "./Tile.vue";
import Piece from "./Piece.vue";

export default {
  name: "Chessboard",
  components: {
    Tile,
    Piece,
  },
  props: ["board", "activeTile", "availableMoves", "pieces"],
  data() {
    return {
      mouseCoordinates: { x: 0, y: 0 },
      moveCoordinatesForHolding: {
        from: 0,
        to: 0,
      },
    };
  },
  computed: {
    boardIndexed() {
      return this.board.map((tile, index) => {
        return { content: tile, index: index, active: false };
      });
    },
    boardCleaned() {
      return this.boardIndexed.filter((tile, index) => {
        return index > 20 && index < 99 && index % 10 != 0 && index % 10 != 9;
      });
    },
    availableMove() {
      return this.availableMoves;
    },
  },
  methods: {
    holdPiece(tile) {
      for (let p of this.pieces) {
        if (p.index == tile.index) {
          p.beingHeld = true;
          this.moveCoordinatesForHolding.from = tile.index;
        }
      }
      this.$emit("clicked", tile.index);
    },
    putPiece(tile) {
      for (let p of this.pieces) {
        p.beingHeld = false;
      }
      this.moveCoordinatesForHolding.to = tile.index;

      if (
        this.moveCoordinatesForHolding.to != this.moveCoordinatesForHolding.from
      )
        this.$emit("clicked", tile.index);
    },
    mousePosition(event) {
      let bounds = this.$refs.chessboard.getBoundingClientRect();
      let x = event.clientX - bounds.left;
      let y = event.clientY - bounds.top;
      this.mouseCoordinates = {
        x: x,
        y: y,
      };

      event.stopPropagation();
    },
  },
};
</script>

<style scoped>
.chessboard {
  width: 800px;
  height: 800px;
  background-color: red;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
}

.pieces {
  width: 800px;
  height: 800px;
  pointer-events: none;
  position: absolute;
}
</style>
