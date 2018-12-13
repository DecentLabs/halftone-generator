<template lang="html">
  <div class="setting grid-settings">
    <!-- <h2>Grid settings</h2> -->

    <div class="section">
      <div class="input">
        <label>x</label>
        <input type="number" v-model.number="xSize">
      </div>

      <div class="input">
        <label>y</label>
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
