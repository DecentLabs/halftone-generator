<template lang="html">
  <div class="decent-canvas">
    <button type="button" name="button" @click="showExportSettings">Export settings</button>

    <zoom></zoom>

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
import zoom from './zoom.vue'

export default {
  name: 'decentCanvas',
  components: { preview, zoom },
  computed: {
    generatorType () {
      return this.$store.state.generatorType
    },
    projectStates () {
      return this.$store.getters.getProjectStates
    }
  },
  methods: {
    showExportSettings () {
      this.$emit('showExportSettings')
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
button {
  position: absolute;
  top: 0;
  left: 0;
}

</style>
