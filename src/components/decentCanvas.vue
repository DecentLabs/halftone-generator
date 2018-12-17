<template lang="html">
  <div class="decent-canvas">
    <button type="button" name="button" @click="save">Download</button>
    <zoom></zoom>

    <div v-if="generatorType === 'logo'" v-for="(key, value) in projectStates" class="canvas-container">
      <h2>{{value}}</h2>
      <preview :project="key"></preview>
    </div>

    <preview class="canvas-simple"
             v-if="generatorType !== 'logo'"></preview>

  </div>
</template>

<script>
import preview from './preview.vue'
import canvasToImage from 'canvas-to-image';
import zoom from './zoom.vue'
import imageSaver from './../generators/imageSaver.js'

export default {
  name: 'decentCanvas',
  components: { preview, zoom },
  computed: {
    generatorType () {
      return this.$store.state.generatorType
    },
    projectStates () {
      return this.$store.getters.getProjectStates
    }
  },
  methods: {
    save() {
      imageSaver()
      // let canvasList = document.querySelectorAll('canvas')
      // canvasList.forEach((canvas, index) => {
      //
      //     canvas.toBlob(function(blob) {
      //       let img = new Image()
      //       let url = URL.createObjectURL(blob);
      //       img.src = url;
      //
      //       let copy = document.createElement('canvas')
      //       copy.width = '1000'
      //       copy.height = '1000'
      //       let ctx = copy.getContext('2d')
      //
      //       img.onload = function () {
      //         ctx.drawImage(this, 0, 0, 1000, 1000)
      //         let download = copy.toDataURL('image/jpg')
      //         let a = document.createElement('a')
      //         a.style.display = 'none'
      //         document.body.appendChild(a)
      //         a.href = download
      //         a.download = 'canvas_' + index
      //         a.click()
      //         document.body.removeChild(a)
      //       }
      //     })
      // })
    }
  },
  watch: {
    generatorType(val) {
      this.$store.dispatch('generateGrid')
    }
  }
}
</script>

<style scoped>
.decent-canvas {
  flex: 1;
  overflow: auto;
  background-color: rgb(235, 235, 240);
  padding: 30px;
  position: relative;
}

.canvas-container {
  width: auto;
  height: auto;
  margin: 50px;
  overflow: auto;
  display: inline-block;
}
.canvas-simple {
  padding: 80px;
}
h2 {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 20px;
}
button {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 40px;
}
</style>
