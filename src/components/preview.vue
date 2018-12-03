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

console.log(layouts);

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
      // sketch.noLoop()
      sketch.frameRate(4)
    },
    draw(sketch) {
      sketch.fill(this.color)
      sketch.stroke(this.color)
      let nodeList = []
      let div = this.canvasSize / 100
      for(let i=1; i< this.nodeNum; i++) {
        let drawing = new layouts[this.layout](this.shapeSize, this.nodeNum, i, nodeList, div)
        let result = drawing.getConfig()
        if (result.coord.x && result.coord.y && result.size) {
          sketch.ellipse(result.coord.x, result.coord.y, result.size, result.size)
          nodeList.push({
            x: result.coord.x,
            y: result.coord.y,
            size: result.size
          })
        }
      }

      // console.log(nodeList);
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
