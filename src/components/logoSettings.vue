<template lang="html">
  <div class="logo-settings">

    <div class="section">

      <div class="input color-input">
        <label>Project color</label>
        <div class="color-picker">
          <div :style="{backgroundColor: selectedColor}" class="selected-color" @click="selectColor"></div>
          <color-palette :name="'project'" v-if="select" @closePalette="close"></color-palette>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import colorPalette from './colorPicker.vue'

export default {
  name: 'logoSettings',
  components: {colorPalette},
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
      this.$store.commit('generator/updateColor', e.color)
    }
  },
  computed: {
    selectedColor() {
      return this.$store.state.generator.color
    }
  }
}
</script>

<style scoped>
</style>
