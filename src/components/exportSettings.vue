<template lang="html">
  <div class="export-settings">

    <div class="popup">
      <div class="close" @click="close">x</div>

      <h2>Export: {{generatorType}}</h2>
      <form>

        <div class="row">
          <h4>Project name</h4>
          <input type="text" name="file-name" v-model="projectName">
        </div>

        <div class="row">
          <h4>Export as</h4>
          <select v-model="fileFormat">
            <option value="png">png</option>
            <option value="jpg">jpg</option>
            <option value="gif">gif</option>
          </select>
        </div>

        <div class="row">
          <h4>Export alpha</h4>
          <div class="input">
            <checkbox :value="alphaExport" :name="'alphaExport'" @change="valueChanged"></checkbox>
          </div>
        </div>

        <div class="row">
          <h4>Export sizes</h4>
        </div>

        <div class="row">
          <div class="input">
            <label>Thumbnail</label>
            <checkbox :value="thumbnail" :name="'thumbnail'" @change="valueChanged"></checkbox>
          </div>
          <div class="input">
            <label>Medium</label>
            <checkbox :value="medium" :name="'medium'" @change="valueChanged"></checkbox>
          </div>
          <div class="input">
            <label>Large</label>
            <checkbox :value="large" :name="'large'" @change="valueChanged"></checkbox>
          </div>
        </div>

        <div class="row" v-if="useCustom">
          <h4>Custom size</h4>
          <span>Width</span><input type="number" name="custom-w" v-model="custom.w">
          <span>Height</span><input type="number" name="custom-h" v-model="custom.h">
        </div>

      </form>
      <button type="button" name="button" @click="save">Export</button>
      <button type="button" name="button" @click="close">Cancel</button>
    </div>

  </div>
</template>

<script>
import checkbox from './checkbox.vue'
export default {
  name: 'export-settings',
  components: { checkbox },
  data: function () {
    return {
      thumbnail: true,
      medium: true,
      large: true,
      useCustom: false,
      custom: {
        w: 1280,
        h: 720
      }
    }
  },
  computed: {
    fileFormat: {
      get () {
        return this.$store.state.generator.fileFormat
      },
      set (val) {
        this.$store.commit('generator/updateFileFormat', val)
      }
    },
    alphaExport: {
      get () {
        return this.$store.state.generator.alphaExport
      },
      set (val) {
        this.$store.commit('generator/updateAlphaExport', val)
      }
    },
    projectName: {
      get () {
        return this.$store.state.generator.projectName
      },
      set (val) {
        this.$store.commit('generator/updateProjectName', val)
      }
    },
    generatorType () {
      return this.$store.state.generator.generatorType
    }
  },
  methods: {
    valueChanged (e) {
      this[e.name] = e.value
    },
    save () {
      this.$emit('save', {exportSizes: {
        thumbnail: this.thumbnail,
        medium: this.medium,
        large: this.large
      }})
    },
    close() {
      this.$emit('closeExportSettings')
    }
  }
}
</script>

<style scoped>
.export-settings {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
}
.popup {
  width: 500px;
  height: auto;
  padding: 25px;
  background-color: white;
  color: black;
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
  border-radius: 5px;
  position: relative;
}
.close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
h2 {
  padding: 0;
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
}
h4 {
  margin-right: 20px;
  margin-bottom: 10px;
  padding-top: 5px;
}
input, select {
  margin: 0;
}
.row {
  width: 100%;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
}
.input {
  padding: 0;
}
.row .input {
  width: auto;
  text-align: center;
  margin-bottom: 0;
}
.input input {
  margin-left: auto;
  margin-right: auto;
}
select, input[type="text"] {
  width: 200px;
}
label {
  margin-right: 20px;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
}
button {
  margin: 20px 20px 10px 20px;
}

@media (max-width: 414px) {
  .popup {
    margin: 0;
    width: 100%;
    height: 100%;
    /* todo */
    overflow-y: auto;
  }
}
</style>
