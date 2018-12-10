<template lang="html">
  <div class="common-settings">

      <div class="input">
        <label for="distance">Distance</label>
        <input name="distance" v-model.number="distance">
      </div>

      <div class="input">
        <label for="radius">Average point radius</label>
        <input name="radius" v-model.number="radius">
      </div>

      <div class="input">
        <label for="paintnum">Number of paints</label>
        <input name="paintnum" v-model.number="paintNum">
      </div>

      <div class="input">
        <label for="direction">Direction</label>
        <select name="direction" v-model="direction">
          <option :value="'diagonal'">diagonal</option>
          <option :value="'horizontal'">horizontal</option>
          <option :value="'vertical'">vertical</option>
        </select>
      </div>
  </div>
</template>

<script>
export default {
  name: 'commonSettings',
  computed: {
    distance: {
      set(val) {
        this.$store.commit('updateDistance', val)
      },
      get() {
        return this.$store.state.distance
      }
    },
    radius: {
      set(val) {
        this.$store.commit('updateRadius', val)
      },
      get() {
        return this.$store.state.radius
      }
    },
    paintNum: {
      set(val) {
        this.$store.commit('updatePaintNum', val)
      },
      get() {
        return this.$store.state.paintNum
      }
    },
    direction: {
      set(val) {
        this.$store.commit('updateDirection', val)
      },
      get() {
        return this.$store.state.direction
      }
    }
  }
}
</script>
