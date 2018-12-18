<template>
  <div id="generator">
    <generator-type-selector v-if="generatorType"></generator-type-selector>
    <form>
      <div class="settings type-settings" v-if="generatorType">
        <div class="display-btn" @click="displaySwitch('type')">x</div>
        <h2 class="setting-name" @click="displaySwitch('type')">{{generatorType}} settings</h2>

        <logo-settings v-if="generatorType === 'logo' && showTypeSettings"></logo-settings>
        <image-settings v-if="generatorType === 'image' && showTypeSettings"></image-settings>
        <grid-settings v-if="generatorType === 'grid' && showTypeSettings"></grid-settings>
        <template-settings v-if="generatorType === 'template' && showTypeSettings"></template-settings>
        <button id="generate-btn" v-if="showTypeSettings" type="button" name="button" @click="update">Generate</button>
      </div>

      <div class="settings">
        <div class="display-btn" @click="displaySwitch('common')">x</div>
        <h2 class="setting-name" @click="displaySwitch('common')">Common settings</h2>
        <common-settings v-if="showCommonSettings"></common-settings>
      </div>

      <!-- <div class="settings">
        <div class="display-btn" @click="displaySwitch('animation')">x</div>
        <h2 @click="displaySwitch('animation')">Animation settings</h2>
        <animation-settings v-if="showAnimSettings"></animation-settings>
      </div> -->

    </form>
    <decent-canvas @showExportSettings="showExportSettings"></decent-canvas>

    <export-settings v-if="exportSettingsPopup"
                     @closeExportSettings="hideExportSettings"
                     @save="save"></export-settings>
  </div>
</template>

<script>
import generators from './../generators'
import decentCanvas from './decentCanvas.vue'
import commonSettings from './commonSettings.vue'
import generatorTypeSelector from './gridTypeSelector.vue'
import imageSettings from './imageSettings.vue'
import gridSettings from './gridSettings.vue'
import templateSettings from './templateSettings.vue'
import animationSettings from './animationSettings.vue'
import logoSettings from './logoSettings.vue'
import exportSettings from './exportSettings.vue'
import imageSaver from './../generators/imageSaver.js'

export default {
  name: 'generator',
  components: {
    commonSettings,
    decentCanvas,
    generatorTypeSelector,
    gridSettings,
    imageSettings,
    templateSettings,
    animationSettings,
    logoSettings,
    exportSettings
  },
  mounted () {
    this.$store.dispatch('generateGrid')
  },
  data: function () {
    return {
      showCommonSettings: false,
      showAnimSettings: false,
      showTypeSettings: false,
      exportSettingsPopup: false
    }
  },
  computed: {
    generatorType() {
      return this.$store.getters.getGeneratorType
    }
  },
  methods: {
    save() {
      imageSaver()
      this.hideExportSettings()
    },
    hideExportSettings() {
      this.exportSettingsPopup = false
    },
    showExportSettings () {
      this.exportSettingsPopup = true
    },
    update() {
      this.$store.dispatch('generateGrid')
    },
    displaySwitch(val) {
      if (val === 'type') {
        this.showTypeSettings = !this.showTypeSettings
      } else if (val === 'animation') {
        this.showAnimSettings = !this.showAnimSettings
      } else if (val === 'common') {
        this.showCommonSettings = !this.showCommonSettings
      }
    }
  }
}
</script>

<style>
#generator {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}
.setting-name {
  cursor: pointer;
  font-weight: bold;
  padding-left: 30px;
}
form {
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-shrink: 0;
}

input, select {
  font-size: 16px;
  margin: 10px;
  width: 150px;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
}
input[type="number"] {
  width: 80px;
  padding: 10px;
}
select, input {
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  border: 2px solid black;
}
button {
  margin: 25px 20px 20px 20px;
  border-radius: 5px;
  width: 120px;
  height: 40px;
}
.generate-btn {
  position: absolute;
  right: 0px;
  bottom: 0px;
}

label, span {
  font-size: 16px;
  display: inline-block;
}
span {
  margin-left: 15px;
}

.display-btn {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: white;
  right: 0;
  top: 0;
  cursor: pointer;
  color: black;
  text-align: center;
}

.settings {
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid rgb(220, 220, 220);
  text-align: left;
  width: 100%;
  position: relative;
}

.type-settings {
  padding-right: 150px;
  position: relative;
}

.setting {
  padding: 10px;
}

.section {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  min-height: 150px;
}
.input {
  width: 220px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 30px;
}
.input label {
  text-align: center;
}
</style>
