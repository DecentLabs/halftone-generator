<template lang="html">
  <div class="setting label-settings">

    <div class="section">
      <div class="input">
        <label>Label</label>
        <input type="text" v-model="label">
      </div>

      <div class="input">
        <label>Sublabel</label>
        <input type="text" v-model="subLabel">
      </div>

      <div class="input">
        <label>Show label</label>
        <checkbox :value="showLabel" :name="'showLabel'" @change="valueChanged"></checkbox>
      </div>

      <div class="input">
        <label>Show sublabel</label>
        <checkbox :value="showSubLabel" :name="'showSubLabel'" @change="valueChanged"></checkbox>
      </div>

      <div class="input">
        <label>Sublabel size</label>
        <select v-model="subLabelSize">
          <option :value="'big'">Same as label</option>
          <option :value="'small'">Sublabel</option>
        </select>
      </div>

      <div class="input">
        <label>Label position preview</label>
        <select v-model="labelPosition">
          <option :value="'top'">Top</option>
          <option :value="'bottom'">Bottom</option>
          <option :value="'right'">Right</option>
        </select>
      </div>

      <div class="input">
        <label>Font size</label>
        <vue-slider class="slider"
                    :tooltip-dir="'bottom'"
                    :tooltip="'hover'"
                    :min="0"
                    :max="300"
                    ref="slider"
                    v-model="fontSize"></vue-slider>
      </div>

      <div class="input">
        <label>Label Translate X</label>
        <number-input @change="valueChanged"
                      :value="translateXLabel"
                      :name="'translateXLabel'"></number-input>
      </div>
      <div class="input">
        <label>Label Translate Y</label>
        <number-input @change="valueChanged"
                      :value="translateYLabel"
                      :name="'translateYLabel'"></number-input>
      </div>

      <div class="input">
        <label>Sublabel Translate X</label>
        <number-input @change="valueChanged"
                      :value="translateXSubLabel"
                      :name="'translateXSubLabel'"></number-input>
      </div>
      <div class="input">
        <label>Sublabel Translate Y</label>
        <number-input @change="valueChanged"
                      :value="translateYSubLabel"
                      :name="'translateYSubLabel'"></number-input>
      </div>

      <div class="input color-input">
        <label>Label color</label>
        <div class="color-picker">
          <div :style="{backgroundColor: labelColor}" class="selected-color" @click="selectColor()"></div>
          <color-palette :name="'label'" v-if="select" @closePalette="close"></color-palette>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import numberInput from './numberInput.vue'
import checkbox from './checkbox.vue'
import colorPalette from './colorPicker.vue'

export default {
  name: 'label-settings',
  components: { vueSlider, numberInput, checkbox, colorPalette },
  data: function () {
    return {
      select: false
    }
  },
  methods: {
    selectColor() {
      this.select = !this.select
    },
    close(e) {
      this.select = false
      this.$store.commit('generator/updateLabelColor', e.color)
    },
    valueChanged (e) {
      this[e.name] = e.value
    }
  },
  computed: {
    labelColor () {
      return this.$store.state.generator.labelColor
    },
    translateXLabel: {
      get () {
        return this.$store.state.generator.translateXLabel
      },
      set (val) {
        this.$store.commit('generator/updateTranslateXLabel', val)
      }
    },
    translateYLabel: {
      get () {
        return this.$store.state.generator.translateYLabel
      },
      set (val) {
        this.$store.commit('generator/updateTranslateYLabel', val)
      }
    },
    translateXSubLabel: {
      get () {
        return this.$store.state.generator.translateXSubLabel
      },
      set (val) {
        this.$store.commit('generator/updateTranslateXSubLabel', val)
      }
    },
    translateYSubLabel: {
      get () {
        return this.$store.state.generator.translateYSubLabel
      },
      set (val) {
        this.$store.commit('generator/updateTranslateYSubLabel', val)
      }
    },
    showSubLabel: {
      get () {
        return this.$store.state.generator.showSubLabel
      },
      set (val) {
        this.$store.commit('generator/updateShowSubLabel', val)
      }
    },
    showLabel: {
      get () {
        return this.$store.state.generator.showLabel
      },
      set (val) {
        this.$store.commit('generator/updateShowLabel', val)
      }
    },
    subLabelSize: {
      get () {
        return this.$store.state.generator.subLabelSize
      },
      set (val) {
        this.$store.commit('generator/updateSubLabelSize', val)
      }
    },
    fontSize: {
      get () {
        return this.$store.state.generator.fontSize
      },
      set (val) {
        this.$store.commit('generator/updateFontSize', val)
      }
    },
    labelPosition: {
      get () {
        return this.$store.state.generator.labelPosition
      },
      set (val) {
        this.$store.commit('generator/updateLabelPosition', val)
      }
    },
    label: {
      get () {
        return this.$store.state.generator.labelName
      },
      set (val) {
        this.$store.commit('generator/updateLabelName', val)
      }
    },
    subLabel: {
      get () {
        return this.$store.state.generator.subLabel
      },
      set (val) {
        this.$store.commit('generator/updateSubLabel', val)
      }
    }
  }
}
</script>

<style media="screen">
</style>
