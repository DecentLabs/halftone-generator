<template lang="html">
  <div class="generator-type-selector">

    <label for="template" v-bind:class="generatorType === 'logo' ? 'selected': ''" @click="select('logo')">LOGO</label>

    <label for="grid" v-bind:class="generatorType === 'grid' ? 'selected': ''" @click="select('grid')">GRID</label>

    <label for="image" v-bind:class="generatorType === 'image' ? 'selected': ''" @click="select('image')">IMAGE</label>

    <label for="template" v-bind:class="generatorType === 'template' ? 'selected': ''" @click="select('template')">TEMPLATE</label>

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
        this.$store.dispatch('setPreset')
      }
    }
  },
  methods: {
    select(val) {
      this.generatorType = val
    }
  }
}
</script>

<style lang="css">
  .generator-type-selector {
    display: flex;
    justify-content: flex-start;
    background-color: rgb(220, 220, 220);
    border-bottom: 1px solid rgba(230, 230, 230);
    flex-shrink: 0;
  }
  .generator-type-selector label {
    width: calc(100% / 3);
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    background-color: white;
    border-left: 1px solid rgba(230, 230, 230);
    font-weight: bold;
  }
  label.selected {
    background-color: black;
    color: white;
  }
</style>
