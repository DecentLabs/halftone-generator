<template lang="html">
  <div class="color-palette">

    <div class="color-elem"
         v-for="color in palette"
        @click="selectColor(color)"
        :style="{backgroundColor: color}"></div>

  </div>
</template>

<script>
import { Compact } from 'vue-color'
import Swatches from 'vue-swatches'

export default {
  name: 'colorPicker',
  components: { Swatches },
  data: function () {
    return {
      palette: [
        '#f9f8ff',
        '#e8a87c',
        '#e27d60',
        '#c38d9e',
        '#8bcbc8',
        '#40b3a3',
        '#010208'
      ]
    }
  },
  computed: {
    color: {
      get() {
        return this.$store.state.color
      },
      set(val) {
        this.$store.commit('updateColor', val)
      }
    }
  },
  methods: {
    selectColor(val) {
      this.color = val
      this.$emit('closePalette')
    }
  }
}
</script>

<style scoped>
  .color-palette {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 3px;
    background-color: rgba(255, 255, 255, 1);
    width: 102px;
    border-radius: 4px;
  }
  .color-elem {
    width: 20px;
    height: 20px;
    margin: 2px;
    border: 1px solid gray;
    border-radius: 2px;
  }
</style>
