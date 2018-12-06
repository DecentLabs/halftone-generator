<template>
  <div id="app">
    <attributes @change="attributesChanged"
                @gridChange="gridChange"
                @paintChange="paintChange"></attributes>
    <!-- <preview :layout="'Brigi'"
             :nodeNum="1000"
             :color="'black'"
             :shapeSize="50"></preview> -->
     <preview-new :attributes="attributes"
                  :gridProp="grid"
                  :paint="paint"></preview-new>
  </div>
</template>

<script>

import attributes from './components/attributes.vue'
import previewNew from './components/preview-new.vue'

export default {
  name: 'app',
  components: { attributes, previewNew },
  data: function () {
    return {
      attributes: null,
      grid: null,
      paint: null
    }
  },
  methods: {
    attributesChanged (e) {
      this.attributes = e
    },
    gridChange (e) {
      this.grid = e
    },
    paintChange (e) {
      this.paint = e
    }
  }
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
}
</style>
