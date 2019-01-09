<template lang="html">
  <div class="decent-canvas">

    <div v-if="generatorType === 'logo'" v-for="(value, key) in projectStates" class="canvas-container">
      <h2>{{key}}</h2>
      <preview :project="value"
               :name="`${generatorType}_${key}`"></preview>
    </div>

    <preview class="canvas-simple"
             v-if="generatorType !== 'logo'"
             :name="generatorType"></preview>

  </div>
</template>

<script>
import preview from './preview.vue'
import canvasToImage from 'canvas-to-image';

export default {
  name: 'decentCanvas',
  components: { preview },
  computed: {
    generatorType () {
      return this.$store.state.generatorType
    },
    projectStates () {
      return this.$store.getters.getProjectStates
    }
  },
  watch: {
    generatorType(val) {
      this.$store.dispatch('generateGrid')
    }
  }
}
</script>

<style scoped>
.decent-canvas {
  flex: 1;
  overflow: auto;
  background-color: rgb(235, 235, 240);
  padding: 30px;
  position: relative;
  margin-top: -80px;
}

.canvas-container {
  width: auto;
  height: auto;
  margin: 50px;
  margin-top: 80px;
  overflow: auto;
  display: inline-block;
}
.canvas-simple {
  padding: 100px;
}
h2 {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 20px;
}

</style>
