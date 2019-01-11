<template lang="html">
  <div class="label-settings">

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
        <label>Optimise label size</label>
        <vue-slider class="slider"
                    :tooltip-dir="'bottom'"
                    :tooltip="'hover'"
                    :min="-50"
                    :max="150"
                    ref="slider"
                    v-model="labelSize"></vue-slider>
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
    </div>

  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import numberInput from './numberInput.vue'
import checkbox from './checkbox.vue'

export default {
  name: 'label-settings',
  components: { vueSlider, numberInput, checkbox },
  methods: {
    valueChanged (e) {
      this[e.name] = e.value
    }
  },
  computed: {
    translateXLabel: {
      get () {
        return this.$store.state.translateXLabel
      },
      set (val) {
        this.$store.commit('updateTranslateXLabel', val)
      }
    },
    translateYLabel: {
      get () {
        return this.$store.state.translateYLabel
      },
      set (val) {
        this.$store.commit('updateTranslateYLabel', val)
      }
    },
    translateXSubLabel: {
      get () {
        return this.$store.state.translateXSubLabel
      },
      set (val) {
        this.$store.commit('updateTranslateXSubLabel', val)
      }
    },
    translateYSubLabel: {
      get () {
        return this.$store.state.translateYSubLabel
      },
      set (val) {
        this.$store.commit('updateTranslateYSubLabel', val)
      }
    },
    showSubLabel: {
      get () {
        return this.$store.state.showSubLabel
      },
      set (val) {
        this.$store.commit('updateShowSubLabel', val)
      }
    },
    subLabelSize: {
      get () {
        return this.$store.state.subLabelSize
      },
      set (val) {
        this.$store.commit('updateSubLabelSize', val)
      }
    },
    labelSize: {
      get () {
        return this.$store.labelSize
      },
      set (val) {
        this.$store.commit('updateLabelSize', val)
      }
    },
    labelPosition: {
      get () {
        return this.$store.state.labelPosition
      },
      set (val) {
        this.$store.commit('updateLabelPosition', val)
      }
    },
    label: {
      get () {
        return this.$store.state.labelName
      },
      set (val) {
        this.$store.commit('updateLabelName', val)
      }
    },
    subLabel: {
      get () {
        return this.$store.state.subLabel
      },
      set (val) {
        this.$store.commit('updateSubLabel', val)
      }
    }
  }
}
</script>

<style media="screen">
</style>
