<template>
  <ChessGame/>
</template>

<script>
import ChessGame from './components/ChessGame.vue'


export default {
  name: 'App',
  components: {
    ChessGame
  }
}
</script>

<style>

body {
  padding: 0;
  margin: 0;
}

#app {
  height: 100vh;


}
</style>
