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
        <input type="checkbox" v-model="showSubLabel">
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
    </div>

  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
export default {
  name: 'label-settings',
  components: { vueSlider },
  computed: {
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

<style scoped>

</style>
