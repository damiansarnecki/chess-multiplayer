<template>
    <div class="player-info">
      <img class="avatar" src="avatar.png">
      <div>
        <span class="player-name">Anonymous</span>
      </div>
    </div>
</template>

<script>


export default {
  name: 'PlayerInfo',
  props: [],
  components: {

  },
  data() {
      return {
          
      }
  },
}
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

    .player-info {

        height: 60px;
        padding: 20px;
        display: grid;
        grid-template-columns: 60px auto;
        background-color: #2b2b2b;
        gap: 30px;
        font-family: 'Roboto', sans-serif;
    }

    .player-info .avatar{
        width: 60px;
    }

    .player-name {
        color: white;
        font-size: 15px;
        color: rgb(180,180,180);
    }
</style>
