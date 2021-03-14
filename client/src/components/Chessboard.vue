<template>

    <div v-on:click="onClickButton" class="chessboard">
        <Tile 
            v-on:click="onClickTile(tile.index)"
            :data="tile" 
            :activeTile="activeTile" 
            v-bind:key="index" 
            :availableMove="availableMoves.filter(t => t.to == tile.index).length > 0"
            v-for="(tile, index) in boardCleaned">
        </Tile>
        <div class="pieces">
            <Piece :index="piece.index" v-bind:key="piece.id" :name="piece.name" v-for="(piece) in pieces"></Piece>
        </div>
    </div>
</template>

<script>
import Tile from './Tile.vue'
import Piece from './Piece.vue'

export default {
  name: 'Chessboard',
  components: {
      Tile, 
      Piece
  },
  props: ['board', 'activeTile', 'availableMoves', 'pieces'],
  data() {
      return {
         
      }
  },
  computed: {
      boardIndexed () {
        return this.board.map((tile, index) => {
            return {content: tile, index: index, active: false}
        });
      },
      boardCleaned () {
          return  this.boardIndexed.filter((tile, index) => {
              return index > 20 && index < 99 && index % 10 != 0 && index % 10 != 9;
          });
      },
      availableMove() {

          return this.availableMoves;
      }
      
  },
    methods: {
        onClickTile(id) {
          console.log(this.availableMoves)
            this.$emit('clicked', id)
        }
    },
    mounted() {
        
        

    }
}
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
    }

    .pieces {
        width: 800px;
        height: 800px;
        pointer-events: none;
        position: absolute;
    }

</style>
