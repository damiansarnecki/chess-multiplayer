<template>
  <ChessGame />
</template>

<script>
import ChessGame from "./components/ChessGame.vue";

export default {
  name: "App",
  components: {
    ChessGame,
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

#app {
  height: 100vh;
}
*,
*::after,
*::before {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -webkit-app-region: no-drag;
  cursor: default;
}
</style>
