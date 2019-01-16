<template lang="html">
  <div class="setting common-settings">
    <button id="generate-btn" type="button" name="button" @click="update">Update</button>
    <button id="reset-btn" type="button" name="button" @click="resetToPreset">Reset to preset</button>

    <logo-settings v-if="generatorType === 'logo'"></logo-settings>
    <image-settings v-if="generatorType === 'image'"></image-settings>
    <grid-settings v-if="generatorType === 'grid'"></grid-settings>
    <template-settings v-if="generatorType === 'template'"></template-settings>

    <div class="section">

      <div class="input">
        <label for="distance">Distance</label>
        <number-input @change="valueChanged"
                      :value="distance"
                      :name="'distance'"></number-input>
      </div>

      <div class="input">
        <label for="radius">Average point radius</label>
        <number-input @change="valueChanged"
                      :value="radius"
                      :name="'radius'"></number-input>
      </div>

      <div class="input">
        <label for="paintnum">Number of paints</label>
        <number-input @change="valueChanged"
                      :value="paintNum"
                      :name="'paintNum'"></number-input>
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
        <checkbox :value="loop" :name="'loop'" @change="valueChanged"></checkbox>
      </div>

      <div class="input color-input">
        <label>Main color</label>
        <div class="color-picker">
          <div :style="{backgroundColor: mainColor}" class="selected-color" @click="selectColor('main')"></div>
          <color-palette :name="'main'" v-if="selectMainColor" @closePalette="close"></color-palette>
        </div>
      </div>

      <div class="input color-input">
        <label>Background color</label>
        <div class="color-picker">
          <div :style="{backgroundColor: bgColor}" class="selected-color" @click="selectColor('bg')"></div>
          <color-palette :name="'bg'" v-if="selectBgColor" @closePalette="close"></color-palette>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logoSettings from './logoSettings.vue'
import imageSettings from './imageSettings.vue'
import gridSettings from './gridSettings.vue'
import templateSettings from './templateSettings.vue'
import numberInput from './numberInput.vue'
import checkbox from './checkbox.vue'
import colorPalette from './colorPicker.vue'

export default {
  name: 'commonSettings',
  components: {
    logoSettings,
    imageSettings,
    gridSettings,
    templateSettings,
    numberInput,
    checkbox,
    colorPalette
  },
  data: function () {
    return {
      selectMainColor: false,
      selectBgColor: false
    }
  },
  methods: {
    selectColor(type) {
      if (type === 'bg') {
        this.selectBgColor = !this.selectBgColor
      } else if (type === 'main') {
        this.selectMainColor = !this.selectMainColor
      }
    },
    close(e) {
      if (e.name === 'bg') {
        this.selectBgColor = false
        this.$store.commit('generator/updateBgColor', e.color)
      } else if (e.name === 'main') {
        this.selectMainColor = false
        this.$store.commit('generator/updateMainColor', e.color)
      }
    },
    valueChanged (e) {
      this[e.name] = e.value
    },
    update() {
      this.$store.dispatch('generator/generateGrid')
    },
    resetToPreset() {
      this.$store.dispatch('generator/setPreset')
    }
  },
  computed: {
    generatorType() {
      return this.$store.getters['generator/getGeneratorType']
    },
    mainColor () {
      return this.$store.state.generator.mainColor
    },
    bgColor () {
      return this.$store.state.generator.bgColor
    },
    loop: {
      set(val) {
        this.$store.commit('generator/updateLoop', val)
      },
      get() {
        return this.$store.state.generator.loop
      }
    },
    distance: {
      set(val) {
        if (val >= 1) {
          this.$store.commit('generator/updateDistance', val)
        }
      },
      get() {
        return this.$store.state.generator.distance
      }
    },
    radius: {
      set(val) {
        if (val > 0) {
          this.$store.commit('generator/updateRadius', val)
          this.$store.dispatch('generator/transformData')
        }
      },
      get() {
        return this.$store.state.generator.radius
      }
    },
    paintNum: {
      set(val) {
        if (val >= 0) {
          this.$store.commit('generator/updatePaintNum', val)
          this.$store.dispatch('generator/transformData')
        }
      },
      get() {
        return this.$store.state.generator.paintNum
      }
    },
    direction: {
      set(val) {
        this.$store.commit('generator/updateDirection', val)
        this.$store.dispatch('generator/transformData')
      },
      get() {
        return this.$store.state.generator.direction
      }
    }
  }
}
</script>

<style>
.selected-color {
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  border: 2px solid black;
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
