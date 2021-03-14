<template>
    <div v-on:click="onClickButton" class="chessboard">
        <Tile 
            v-on:click="onClickTile(tile.index)"
            :data="tile" 
            :activeTile="activeTile" 
            v-bind:key="index" 
            v-for="(tile, index) in boardCleaned">
        </Tile>
    </div>
</template>

<script>
import Tile from './Tile.vue'

export default {
  name: 'Chessboard',
  components: {
      Tile
  },
  props: ['board', 'activeTile'],
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
  },
    methods: {
        onClickTile(id) {

            this.$emit('clicked', id)
        }
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
    }


</style>
