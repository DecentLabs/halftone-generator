<template>
  <div id="generator">
    <generator-type-selector v-if="generatorType"></generator-type-selector>
    <form>
      <div class="settings" >
        <div class="display-btn" @click="displaySwitch('common')">x</div>
        <h2 v-bind:class="showCommonSettings ? 'active': 'closed'" class="setting-name" @click="displaySwitch('common')">Settings</h2>
        <common-settings v-if="showCommonSettings"></common-settings>
      </div>

      <div class="settings">
        <div class="display-btn" @click="displaySwitch('label')">x</div>
        <h2 v-bind:class="showLabelSettings ? 'active': 'closed'" class="setting-name" @click="displaySwitch('label')">Label settings</h2>
        <label-settings v-if="showLabelSettings"></label-settings>
      </div>
    </form>

    <div class="editor">
      <button type="button" name="button" class="export-btn" @click="showExportSettings">Export settings</button>
      <button type="button" name="button" class="save-btn" @click="showProjectSetting">Save project</button>
      <zoom></zoom>
    </div>

    <decent-canvas></decent-canvas>

    <export-settings v-if="exportSettingsPopup"
                     @closeExportSettings="hideExportSettings"
                     @save="exportLogo"></export-settings>

    <save-project-popup v-if="projectPopup"
                        @closePopup="closePopup"
                        @save="saveProject"></save-project-popup>
  </div>
</template>

<script>
import decentCanvas from './decentCanvas.vue'
import commonSettings from './commonSettings.vue'
import generatorTypeSelector from './gridTypeSelector.vue'
import exportSettings from './exportSettings.vue'
import imageSaver from './../generators/imageSaver.js'
import labelSettings from './labelSettings.vue'
import zoom from './zoom.vue'
import saveProjectPopup from './saveProjectPopup'


export default {
  name: 'generator',
  components: {
    commonSettings,
    decentCanvas,
    generatorTypeSelector,
    exportSettings,
    labelSettings,
    zoom,
    saveProjectPopup
  },
  mounted () {
    this.$store.dispatch('user/getProjectList')
    this.$store.dispatch('generator/generateGrid')
  },
  data: function () {
    return {
      showCommonSettings: false,
      showAnimSettings: false,
      showLabelSettings: false,
      exportSettingsPopup: false,
      projectPopup: false
    }
  },
  computed: {
    generatorType() {
      return this.$store.getters['generator/getGeneratorType']
    }
  },
  methods: {
    showProjectSetting () {
      this.projectPopup = true
    },
    closePopup () {
      this.projectPopup = false
    },
    saveProject(e) {
      this.$store.dispatch('user/saveProject', e.projectName)
    },
    exportLogo(options) {
      imageSaver(options)
      this.hideExportSettings()
    },
    hideExportSettings() {
      this.exportSettingsPopup = false
    },
    showExportSettings () {
      this.exportSettingsPopup = true
    },
    displaySwitch(val) {
      if (val === 'animation') {
        this.showAnimSettings = !this.showAnimSettings
      } else if (val === 'common') {
        this.showCommonSettings = !this.showCommonSettings
      } else if (val === 'label') {
        this.showLabelSettings = !this.showLabelSettings
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
.setting-name.active {
  background-color: black;
  color: white;
}
form {
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: flex-start;
  flex-shrink: 0;
  max-height: calc(100% - 41px);
  overflow: hidden;
}
.editor {
  width: 100%;
  height: 80px;
  background-color: transparent;
  overflow-y: visible;
  display: flex;
  justify-content: space-between;
  z-index: 100;
}
select, input {
  font-size: 16px;
  margin: 5px auto 10px auto;
  width: 100%;
  height: 35px;
  padding: 10px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  border: 2px solid black;
}
button {
  margin: 25px 30px 20px 30px;
  border-radius: 5px;
  width: 180px;
  height: 35px;
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
  max-height: calc(100% - 57px);
  overflow-y: auto;
  min-height: 57px;
}

.setting {
  max-height: 100%;
  overflow-y: scroll;
}

.section {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
.input {
  width: 200px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 10px;
}
.input label {
  text-align: center;
}

@media (max-width: 414px) {
  .section {
    justify-content: center;
  }
  .input, button {
  }
}
</style>
