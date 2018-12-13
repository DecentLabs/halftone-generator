<template lang="html">
  <div class="setting common-settings">

    <!-- <h2>Common settings</h2> -->

    <div class="section">
      <div class="input">
        <label for="distance">Distance</label>
        <input type="number" name="distance" v-model.number="distance">
      </div>

      <div class="input">
        <label for="radius">Average point radius</label>
        <input type="number" name="radius" v-model.number="radius">
      </div>

      <div class="input">
        <label for="paintnum">Number of paints</label>
        <input type="number" name="paintnum" v-model.number="paintNum">
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

  </div>
</template>

<script>
export default {
  name: 'commonSettings',
  computed: {
    distance: {
      set(val) {
        if (val >= 1) {
          this.$store.commit('updateDistance', val)
        }
      },
      get() {
        return this.$store.state.distance
      }
    },
    radius: {
      set(val) {
        if (val > 0) {
          this.$store.commit('updateRadius', val)
          this.$store.dispatch('transformData')
        }
      },
      get() {
        return this.$store.state.radius
      }
    },
    paintNum: {
      set(val) {
        if (val >= 0) {
          this.$store.commit('updatePaintNum', val)
          this.$store.dispatch('transformData')
        }
      },
      get() {
        return this.$store.state.paintNum
      }
    },
    direction: {
      set(val) {
        this.$store.commit('updateDirection', val)
        this.$store.dispatch('transformData')
      },
      get() {
        return this.$store.state.direction
      }
    }
  }
}
</script>

<style scoped>

</style>
