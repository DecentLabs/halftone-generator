<template lang="html">
  <div class="decent-canvas">

    <div v-if="generatorType === 'logo'" v-for="(key, value) in projectStates" class="canvas-container">
      <h2>{{value}}</h2>
      <preview :project="key"></preview>
    </div>

    <preview class="canvas-simple"
             v-if="generatorType !== 'logo'"></preview>

  </div>
</template>

<script>
import preview from './preview.vue'

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
}

.canvas-container {
  width: auto;
  height: auto;
  margin: 50px;
  overflow: auto;
  display: inline-block;
}
.canvas-simple {
  padding: 80px;
}
h2 {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 20px;
}
</style>
