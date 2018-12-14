<template lang="html">
  <div class="preview">
      <vue-p5
          class="canvas"
          @setup="setup"
          @draw="draw">
      </vue-p5>
  </div>
</template>

<script>
import VueP5 from 'vue-p5'

export default {
  components: {
    'vue-p5': VueP5
  },
  props: ['project'],
  data: function() {
    return {
      resizeCanvas: null,
      saveCanvas: null,
      canvas: null
    }
  },
  computed: {
    color() {
      return this.$store.state.color
    },
    transformedData() {
      return this.$store.getters.getTransformedData
    },
    distance() {
      return this.$store.state.distance
    },
    radius() {
      return this.$store.state.radius
    },
    frameRate() {
      return this.$store.state.frameRate
    },
    grid() {
      return this.$store.state.grid
    },
    canvasHeight() {
      if (this.grid.length) {
        return (this.grid.length - 1) * this.distance + this.margin
      } else {
        return 400
      }
    },
    canvasWidth() {
      if (this.grid.length) {
        return (this.grid[0].length - 1) * this.distance + this.margin
      } else {
        return 400
      }
    },
    margin() {
      return this.distance * 8
    },
    generatorType() {
      return this.$store.state.generatorType
    }
  },
  watch: {
    grid (val) {
      if (this.resizeCanvas && val) {
        this.resizeCanvas(this.canvasWidth, this.canvasHeight)
      }
    },
    distance(val) {
      this.resizeCanvas(this.canvasWidth, this.canvasHeight)
    }
  },
  methods: {
    setup(sketch) {
      this.resizeCanvas = function(width, height) {
        sketch.resizeCanvas(width, height)
      }
      this.saveCanvas = function(name, type) {
        sketch.saveCanvas(this.canvas, name, type)
      }
      sketch.createCanvas(this.canvasWidth, this.canvasHeight)
      sketch.frameRate(this.frameRate)
    },
    draw(sketch) {
      sketch.background('white')

      if (this.$store.state.loop && (this.generatorType !== 'logo')) {
        this.$store.dispatch('transformData')
      }

      this.drawDot(sketch)
      this.drawFix(sketch)

      this.drawLogo(sketch)
      this.drawPaint(sketch)
    },
    drawDot(sketch) {
      // sketch.fill(this.color)
      sketch.fill('black')
      sketch.strokeWeight(0)

      this.transformedData['1'].forEach((dot) => {
        let px = this.getPixels(dot)
        sketch.ellipse( px.x, px.y, dot.size, dot.size)
      })
    },
    drawFix(sketch) {
      sketch.fill('black')
      sketch.strokeWeight(0)

      this.transformedData['2'].forEach((dot) => {
        let px = this.getPixels(dot)
        sketch.ellipse( px.x, px.y, this.radius * 2, this.radius * 2)
      })
    },
    drawPaint(sketch) {
      sketch.stroke('black')
      let stroke = this.project !== undefined ? this.radius * (this.project/4 + 0.7) : this.radius * 2
      sketch.strokeWeight(stroke)

      this.transformedData['3'].forEach((dot) => {
        let px = this.getPixels(dot)
        sketch.line(px.x, px.y, px.x2, px.y2)
      })
    },
    drawLogo(sketch) {
      // sketch.fill('black')
      sketch.strokeWeight(0)
      sketch.fill(this.color)

      this.transformedData['logo'].forEach((dot, i) => {
        let px = this.getPixels(dot)

        if (i <= this.project) {
          sketch.fill(this.color)
          // sketch.strokeWeight(4)
          // sketch.stroke(sketch.color(sketch.random(255), sketch.random(255), sketch.random(255)))
          // sketch.ellipse( px.x, px.y, dot.size, dot.size)
          sketch.ellipse( px.x, px.y, this.radius * (this.project/4 + 1), this.radius * (this.project/4 + 1))
        } else {
          sketch.stroke('black')
          sketch.strokeWeight(this.radius * (this.project/4+0.7))
          sketch.line(px.x, px.y, px.x2, px.y2)
        }
      })
    },
    getPixels (dot) {
      let pixels = {
        x: dot.x * this.distance + this.margin / 2,
        y: dot.y * this.distance + this.margin / 2
      }

      if (dot.pair) {
        pixels.x2 = dot.pair.x * this.distance + this.margin / 2
        pixels.y2 = dot.pair.y * this.distance + this.margin / 2
      }

      return pixels
    }
  }
}
</script>

<style>
  canvas {
    border: 1px solid rgba(220, 220, 220, 0.8)
  }
</style>
