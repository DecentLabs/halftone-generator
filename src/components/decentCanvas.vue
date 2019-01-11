<template lang="html">
  <div class="decent-canvas">

    <div v-if="generatorType === 'logo'">
      <div v-for="(value, key) in projectStates"
           class="canvas-container"
           :key="key">
        <h2>{{key}}</h2>
        <preview :project="value"
                 :name="`${generatorType}_${key}`"></preview>
      </div>
    </div>

    <preview class="canvas-simple"
             v-if="generatorType !== 'logo'"
             :name="generatorType"></preview>

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
    generatorType() {
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
  text-align: center;
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

@media (max-width: 1023px) {
  .decent-canvas {
    margin-top: 0;
  }
  .canvas-simple {
    padding: 0;
  }
  .canvas-container {
    margin: 10px;
  }
}

</style>
