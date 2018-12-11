<template lang="html">
  <div class="setting grid-settings">

    <div class="input">
      <label for="">Grid size</label>
      <span>x:</span>
      <input type="number" v-model.number="xSize">
      <span>y:</span>
      <input type="number" v-model.number="ySize">
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
        this.$store.dispatch('generateGrid')
      },
      get() {
        return this.$store.state.gridSize.x
      }
    },
    ySize: {
      set(val) {
        this.$store.commit('updateGridSize', {y: val})
        this.$store.dispatch('generateGrid')
      },
      get() {
        return this.$store.state.gridSize.y
      }
    }
  }
}
</script>

<style lang="css">
</style>
