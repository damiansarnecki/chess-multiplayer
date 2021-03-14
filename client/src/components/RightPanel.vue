<template>
    <div class="right-panel">
        <PlayerInfo></PlayerInfo>
        <div class="auto" >
        </div>
        <PlayerInfo></PlayerInfo>
    </div>
</template>

<script>

import PlayerInfo from './PlayerInfo.vue'

export default {
  name: 'RightPanel',
  props: ['piecesInGame'],
  components: {
      PlayerInfo
  },
  data() {
      return {
          
      }
  },
}
</script>

<style scoped>
    .right-panel {
        background-color: #222;
        height: 100vh;
        grid-template-rows: 100px auto 100px;
        height: 100vh;
    }

    .auto {
        height: calc(100% - 200px);
    }
</style>
