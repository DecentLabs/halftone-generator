<template lang="html">
  <div class="generator-type-selector">
    <input type="radio" id="grid" value="grid" v-model="generatorType">
    <label for="grid">grid</label>

    <input type="radio" id="image" value="image" v-model="generatorType">
    <label for="image">image</label>

    <input type="radio" id="image" value="template" v-model="generatorType">
    <label for="template">template</label>
  </div>
</template>

<script>
export default {
  name: 'generatorTypeSelector',
  computed: {
    generatorType: {
      get() {
        return this.$store.state.generatorType
      },
      set(val) {
        this.$store.commit('updateGeneratorType', val)
        this.$store.dispatch('generateGrid')
      }
    }
  }
}
</script>

<style lang="css">
</style>
