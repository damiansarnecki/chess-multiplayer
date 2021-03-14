<template>
    <div class='tile' v-bind:class="[
        isBlack ? 'black' : 'white',
        isActive ? 'active' : ''
    ]">

        <div class="marker" v-if="showMoveMarker"></div>
        <div class="attack-marker" v-if="showAttackMarker"></div>
    </div>
</template>

<script>


export default {
  name: 'Tile',
  props: ['data', 'activeTile', 'availableMove'],
  components: {
      
  },
  data() {
      return {
         isBlack: false,
         
      }
  },
  computed: {
      isActive() {
          return this.activeTile == this.data.index
      },
      showMoveMarker() {
          return this.availableMove && this.data.content == '';
      },
        showAttackMarker() {
          return this.availableMove && this.data.content != '';
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
        position: relative;
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

    .marker {
        width: 25%;
        height: 25%;
        border-radius: 50%;
        margin-left: 37.5%;
        position: absolute;
        background-color: rgb(0,0,0, 0.1)
    }
    

    .attack-marker
    {
        width: 70%;
        height: 70%;
        border-radius: 50%;
        border: 10px solid rgb(0,0,0, 0.2);
        margin-left: calc(15% - 10px);
        position: absolute;
    }


</style>
