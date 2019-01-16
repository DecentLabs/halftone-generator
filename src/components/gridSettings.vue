<template lang="html">
  <div class="grid-settings">

    <div class="section">
      <div class="input">
        <label>Number of X segments</label>
        <number-input @change="valueChanged"
                      :value="xSize"
                      :name="'xSize'"></number-input>
      </div>

      <div class="input">
        <label>Number of Y segments</label>
        <number-input @change="valueChanged"
                      :value="ySize"
                      :name="'ySize'"></number-input>
      </div>
    </div>

  </div>
</template>

<script>
import numberInput from './numberInput.vue'
export default {
  name: 'gridSettings',
  components: { numberInput },
  methods: {
    valueChanged (e) {
      this[e.name] = e.value
    }
  },
  computed: {
    xSize: {
      set(val) {
        this.$store.commit('generator/updateGridSize', {x: val})
      },
      get() {
        return this.$store.state.generator.gridSize.x
      }
    },
    ySize: {
      set(val) {
        this.$store.commit('generator/updateGridSize', {y: val})
      },
      get() {
        return this.$store.state.generator.gridSize.y
      }
    }
  }
}
</script>
