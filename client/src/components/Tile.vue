<template>
    <div class='tile' v-bind:class="
        [

        isBlack ? 'black' : 'white',
        isActive ? 'active' : ''
        ]">

        <Piece :name="data.content" v-if="data.content != ''"></Piece>
    </div>
</template>

<script>
import Piece from './Piece.vue'

export default {
  name: 'Tile',
  props: ['data', 'activeTile'],
  components: {
      Piece
  },
  data() {
      return {
         isBlack: false
      }
  },
  computed: {
      isActive() {
          return this.activeTile == this.data.index
      }
  },
  mounted() {
      if((this.data.index%10 + Math.floor(this.data.index/10)) % 2 == 0)
        this.isBlack = true;
  }
}
</script>

<style scoped>
    .tile {
        display: grid;
        justify-content: center;
        align-items: center;
    }

    .tile img {
        margin-left: 5%;
        width: 90%;
    }

    .black {
        background-color: #769656;
    }

    .white {
        background-color: #eeeed2;
    }

    .active {
        background-color: 	#baca44;
    }
</style>
