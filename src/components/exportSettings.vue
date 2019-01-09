<template lang="html">
  <div class="export-settings">

    <div class="popup">
      <div class="close" @click="close">x</div>

      <h2>Export: {{generatorType}}</h2>
      <form class="" action="index.html" method="post">

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
            <input type="checkbox" name="alpha" v-model="alphaExport">
          </div>
        </div>

        <div class="row">
          <h4>Export sizes</h4>
        </div>

        <div class="row">
          <div class="input" v-for="(value, key) in constSizes">
            <label>{{key}}</label>
            <input type="checkbox" :name="key" v-model="sizes[key]">
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
import { IMAGE_SIZES } from './../cfg/constants.js'
export default {
  name: 'export-settings',
  created () {
    Object.keys(this.constSizes).forEach((size) => {
      this.sizes[size] = true
    })
  },
  data: function () {
    return {
      constSizes: IMAGE_SIZES,
      sizes: {},
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
        return this.$store.state.fileFormat
      },
      set (val) {
        this.$store.commit('updateFileFormat', val)
      }
    },
    alphaExport: {
      get () {
        return this.$store.state.alphaExport
      },
      set (val) {
        this.$store.commit('updateAlphaExport', val)
      }
    },
    projectName: {
      get () {
        return this.$store.state.projectName
      },
      set (val) {
        this.$store.commit('updateProjectName', val)
      }
    },
    generatorType () {
      return this.$store.state.generatorType
    }
  },
  methods: {
    save () {
      this.$emit('save', { exportSizes: this.sizes })
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
  /* margin-top: -10px;
  margin-left: -10px; */
  width: 100%;
  text-align: left;
}
h4 {
  margin-right: 20px;
  margin-bottom: 10px;
  padding-top: 5px;
}
form {
  flex-direction: row;
}
input, input[type="checkbox"], select {
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
</style>
