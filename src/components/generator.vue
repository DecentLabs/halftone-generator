<template>
  <div id="generator">
    <generator-type-selector v-if="generatorType"></generator-type-selector>

    <div>
      <label for="loop">loop</label>
      <input type="checkbox" id="loop" v-model="loop">
    </div>

    <form>
      <div class="settings type-settings" v-if="generatorType">
        <image-settings v-if="generatorType === 'image'"></image-settings>
        <grid-settings v-if="generatorType === 'grid'"></grid-settings>
        <template-settings v-if="generatorType === 'template'"></template-settings>
        <button type="button" name="button" @click="update">update</button>
      </div>
      <common-settings class="settings common-settings"></common-settings>
    </form>

    <preview></preview>
  </div>
</template>

<script>
import generators from './../generators'
import commonSettings from './commonSettings.vue'
import preview from './preview.vue'
import generatorTypeSelector from './gridTypeSelector.vue'
import imageSettings from './imageSettings.vue'
import gridSettings from './gridSettings.vue'
import templateSettings from './templateSettings.vue'


export default {
  name: 'generator',
  components: {
    commonSettings,
    preview,
    generatorTypeSelector,
    gridSettings,
    imageSettings,
    templateSettings
  },
  mounted () {
    this.$store.dispatch('generateGrid')
    this.$store.dispatch('transformData')
  },
  computed: {
    loop: {
      set(val) {
        this.$store.commit('updateLoop', val)
      },
      get() {
        return this.$store.state.loop
      }
    },
    generatorType() {
      return this.$store.getters.getGeneratorType
    }
  },
  methods: {
    update() {
      this.$store.dispatch('generateGrid')
    }
  }
}
</script>

<style>
#generator {

}
form {
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
}
.settings, .setting {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.input {
  text-align: left;
  min-width: 200px;
  padding: 5px;
}
input {
  padding: 7px;
  width: 60px;
  margin: 10px
}
label, span {
  font-size: 1.3em;
  display: inline-block;
  height: 100%;
}
span {
  margin-left: 15px;
}
</style>
