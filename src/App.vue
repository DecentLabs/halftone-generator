<template>
  <div id="app">
    <attributes></attributes>
    <preview :layout="'Brigi'"
             :nodeNum="1000"
             :color="'black'"
             :shapeSize="50"></preview>
  </div>
</template>

<script>

import attributes from './components/attributes.vue'
import preview from './components/preview.vue'

export default {
  name: 'app',
  components: { attributes, preview }
}
</script>

<style>
html, body, * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body, #app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
