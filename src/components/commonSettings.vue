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
        <input type="checkbox" id="loop" v-model="loop">
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

export default {
  name: 'commonSettings',
  components: {
    logoSettings,
    imageSettings,
    gridSettings,
    templateSettings,
    numberInput
  },
  methods: {
    valueChanged (e) {
      this[e.name] = e.value
    },
    update() {
      this.$store.dispatch('generateGrid')
    },
    resetToPreset() {
      this.$store.dispatch('setPreset')
    }
  },
  computed: {
    generatorType() {
      return this.$store.getters.getGeneratorType
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
