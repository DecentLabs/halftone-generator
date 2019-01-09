<template lang="html">
  <div class="logo-settings">

    <div class="section">

      <div class="input color-input">
        <label>Select color</label>
        <div class="color-picker">
          <div :style="{backgroundColor: selectedColor}" class="selected-color" @click="selectColor"></div>
          <color-palette v-if="select" @closePalette="close"></color-palette>
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
    close() {
      this.select = false
    }
  },
  computed: {
    selectedColor() {
      return this.$store.state.color
    }
  }
}
</script>

<style scoped>
.color-input {

}
.selected-color {
  position: relative;
  width: 40px;
  height: 40px;
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
