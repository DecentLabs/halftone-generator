<template>
  <div id="app">
    <generator></generator>
  </div>
</template>

<script>
import generator from './components/generator.vue'

export default {
  name: 'app',
  components: { generator },
}
</script>

<style>
html, body, * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
html, body, #app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: century-gothic, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h2 {
  width: 100%;
  font-size: 21px;
  display: block;
  padding: 15px;
  font-weight: normal;
  text-transform: capitalize;
}
button {
  cursor: pointer;
  font-size: 0.9em;
  font-family: Helvetica;
  border-style: none;
  border: 2px solid black;
  background-color: white;
}
button:hover {
  background-color: black;
  color: white;
}

element.style {
    transition-duration: 0s;
    width: 41px;
    left: 0px;
}
.vue-slider-component .vue-slider-process {
  background-color: black;
}
</style>
