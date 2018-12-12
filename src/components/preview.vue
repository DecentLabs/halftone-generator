<template lang="html">
  <div class="preview">
    <vue-p5
        class="p5"
        @setup="setup"
        @draw="draw">
    </vue-p5>
  </div>
</template>

<script>
import VueP5 from 'vue-p5'
import generators from './../generators'

export default {
  components: { 'vue-p5': VueP5 },
  data: function () {
    return {
      resizeCanvas: null
    }
  },
  computed: {
    transformedData () {
      return this.$store.getters.getTransformedData
    },
    distance () {
      return this.$store.state.distance
    },
    radius () {
      return this.$store.state.radius
    },
    update () {
      return this.$store.state.update
    },
    frameRate () {
      return this.$store.state.frameRate
    },
    grid () {
      return this.$store.state.grid
    },
    canvasHeight () {
      return (this.grid.length-1) * this.distance + this.margin
    },
    canvasWidth () {
      return (this.grid[0].length-1) * this.distance + this.margin
    },
    margin () {
      return this.distance * 4
    }
  },
  watch: {
    update(val) {
      if (val) {
        this.redraw()
        this.resizeCanvas(this.canvasWidth, this.canvasHeight)
      }
    },
    distance(val) {
      this.resizeCanvas(this.canvasWidth, this.canvasHeight)
    }
  },
  methods: {
    redraw() {
      this.$store.dispatch('transformData')
    },
    setup (sketch) {
      this.resizeCanvas = function (width, height) {
        sketch.resizeCanvas(width, height)
      }

      sketch.createCanvas(this.canvasWidth, this.canvasHeight)
      sketch.frameRate(this.frameRate)

      let canvas = document.querySelector('canvas.p5Canvas')
      canvas.style.border = '1px solid rgb(220, 220, 220)'

    },
    draw (sketch) {
      sketch.background('white')

      if(this.$store.state.loop) {
        this.redraw()
      }

      this.drawGrid(sketch)

    },
    drawGrid (sketch) {
      sketch.strokeWeight(0)
      sketch.fill('black')
      sketch.stroke('black')

      this.transformedData['1'].forEach((dot) => {
        sketch.ellipse(
          dot.x * this.distance + this.margin/2,
          dot.y * this.distance + this.margin/2,
          dot.size,
          dot.size
        )
      })

      this.transformedData['2'].forEach((dot) => {
        sketch.ellipse(
          dot.x * this.distance + this.margin/2,
          dot.y * this.distance + this.margin/2,
          this.radius * 2,
          this.radius * 2
        )
      })

      this.transformedData['3'].forEach((dot) => {
        sketch.strokeWeight(0)

        let x = dot.x * this.distance + this.margin/2
        let y = dot.y * this.distance + this.margin/2
        let x2 = dot.pair.x * this.distance + this.margin/2
        let y2 = dot.pair.y * this.distance + this.margin/2
        let size = this.radius

        sketch.ellipse( x, y, size, size)
        sketch.ellipse( x2, y2, size, size)

        sketch.strokeWeight(size * 2.3)
        sketch.line(x, y, x2, y2)
      })
    }
  }
}
</script>

<style scoped>
  .preview {
    flex: 1;
    overflow: auto;
    background-color: rgb(235, 235, 240);
  }
  .p5 {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 80px;
    overflow: auto;
  }
</style>
