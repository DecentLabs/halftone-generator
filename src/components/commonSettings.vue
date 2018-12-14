<template lang="html">
  <div class="setting common-settings">

    <!-- <h2>Common settings</h2> -->

    <div class="section">
      <div class="input color-input">
        <label>Select color</label>
        <div class="color-picker">
          <div :style="{backgroundColor: selectedColor}" class="selected-color" @click="selectColor"></div>
          <color-palette v-if="select" @closePalette="close"></color-palette>
        </div>
      </div>

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

      <div class="input">
        <label>Animation</label>
        <input type="checkbox" id="loop" v-model="loop">
      </div>

    </div>

  </div>
</template>

<script>
import colorPalette from './colorPicker.vue'

export default {
  name: 'commonSettings',
  components: {colorPalette},
  data: function () {
    return {
      select: false
    }
  },methods: {
    selectColor() {
      this.select = !this.select
    },
    close() {
      this.select = false
    }
  },
  computed: {
    selectedColor() {
      return this.$store.state.color
    },
    loop: {
      set(val) {
        this.$store.commit('updateLoop', val)
      },
      get() {
        return this.$store.state.loop
      }
    },
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

<style>
input[type="checkbox"] {
  padding: 5px;
  width: 25px;
  height: 25px;
  margin: 13px auto 0 auto;
}
.selected-color {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid white;
  display: inline-block;
}
.color-palette {
  position: absolute;
  left: 140%;
  top: -40%;
}
.color-picker {
  position: relative;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  width: 32px;
  height: 32px;
}
</style>
