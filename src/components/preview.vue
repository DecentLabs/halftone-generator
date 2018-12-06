<template lang="html">
  <div class="preview">
    <vue-p5
        @sketch="sketch"
        @setup="setup"
        @draw="draw">
    </vue-p5>
  </div>
</template>

<script>
import VueP5 from 'vue-p5'
import * as layouts from './../layouts/index.js'
import Layout from './../layouts/layout.js'

export default {
  components: { 'vue-p5': VueP5 },
  props: [
    'layout',
    'shapeSize',
    'nodeNum',
    'color'
  ],
  mounted () {
    this.canvasSize = window.innerHeight * 0.8
  },
  methods: {
    sketch(sketch) {
      sketch.draw = () => {
        sketch.background('white')
      };
    },
    setup(sketch) {
      sketch.createCanvas(this.canvasSize, this.canvasSize)
      sketch.noLoop()
      sketch.frameRate(4)
    },
    draw(sketch) {
      sketch.fill(this.color)
      sketch.stroke(this.color)

      let layout = new Layout(
        this.shapeSize,
        this.nodeNum,
        this.canvasSize,
        'brigi',
        'circle'
      )

      layout.getNodes()
      layout.draw(sketch)
    }
  }
}
</script>

<style scoped>
  .preview {
    width: 100%;
    height: 80%;
  }
</style>
