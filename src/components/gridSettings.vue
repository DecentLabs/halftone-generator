<template lang="html">
  <div class="setting grid-settings">

    <div class="section">
      <div class="input">
        <label>Number of X segments</label>
        <input type="number" v-model.number="xSize">
      </div>

      <div class="input">
        <label>Number of Y segments</label>
        <input type="number" v-model.number="ySize">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'gridSettings',
  computed: {
    xSize: {
      set(val) {
        this.$store.commit('updateGridSize', {x: val})
      },
      get() {
        return this.$store.state.gridSize.x
      }
    },
    ySize: {
      set(val) {
        this.$store.commit('updateGridSize', {y: val})
      },
      get() {
        return this.$store.state.gridSize.y
      }
    }
  }
}
</script>
