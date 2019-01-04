<template lang="html">
  <div class="preview">
      <vue-p5
          class="canvas"
          @setup="setup"
          @draw="draw"
          @preload="preload">
      </vue-p5>
  </div>
</template>

<script>
import VueP5 from 'vue-p5'
import Font_reg from './../../public/assets/century-gothic/GOTHIC.TTF'
import Font_bold from './../../public/assets/century-gothic/GOTHIC_BOLD.TTF'


export default {
  components: {
    'vue-p5': VueP5
  },
  props: ['project', 'name', 'exportZoom', 'transparent'],
  data: function() {
    return {
      resizeCanvas: null,
      canvas: null,
      fontReg: null,
      fontBold: null
    }
  },
  computed: {
    fontSize () {
      return 58 * this.zoom
    },
    subFontsize () {
      return this.fontSize / 2.2
    },
    background () {
      return this.transparent ? 'rgba(0, 0, 0, 0)' : 'white'
    },
    zoom () {
      return this.exportZoom ? this.exportZoom : this.$store.getters.getZoomValue
    },
    color() {
      return this.$store.state.color
    },
    transformedData() {
      return this.$store.getters.getTransformedData
    },
    distance() {
      return this.$store.state.distance * this.zoom
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
        return (this.grid.length - 1) * this.distance + this.margin + this.fontSize + this.subFontsize
      } else {
        return 400
      }
    },
    canvasWidth() {
      if (this.grid.length) {
        return (this.grid[0].length - 1) * this.distance  + this.margin
      } else {
        return 400
      }
    },
    margin() {
      return this.distance * 4
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
    },
    name(val) {
      if (this.canvas && this.canvas.canvas) {
        this.canvas.canvas.setAttribute('name', val)
      }
    }
  },
  methods: {
    preload (sketch) {
      this.fontReg = sketch.loadFont(Font_reg)
      this.fontBold = sketch.loadFont(Font_bold)
    },
    setup(sketch) {
      this.resizeCanvas = function(width, height) {
        sketch.resizeCanvas(width, height)
      }
      this.canvas = sketch.createCanvas(this.canvasWidth, this.canvasHeight)
      this.canvas.canvas.setAttribute('name', this.name)
      sketch.frameRate(this.frameRate)

      sketch.textFont(this.fontBold)
    },
    draw(sketch) {
      sketch.clear()
      sketch.background(this.background)

      sketch.strokeWeight(0)
      sketch.fill('black')
      // sketch.textAlign(sketch.CENTER)

      sketch.textSize(this.fontSize)
      sketch.text('DECENT.', this.margin/2 - 2*this.radius, this.fontSize + 30)

      sketch.textSize(this.subFontsize)
      sketch.text('labs', this.margin/2 - this.radius, this.fontSize + this.subFontsize + 30)

      if (this.$store.state.loop && (this.generatorType !== 'logo')) {
        this.$store.dispatch('transformData')
      }

      this.drawDot(sketch)
      this.drawFix(sketch)

      this.drawLogo(sketch)
      this.drawPaint(sketch)
    },
    drawDot(sketch) {
      sketch.fill('black')
      sketch.strokeWeight(0)

      this.transformedData['1'].forEach((dot) => {
        let px = this.getPixels(dot)
        sketch.ellipse( px.x, px.y, dot.size * this.zoom, dot.size * this.zoom)
      })
    },
    drawFix(sketch) {
      sketch.fill('black')
      sketch.strokeWeight(0)

      this.transformedData['2'].forEach((dot) => {
        let px = this.getPixels(dot)
        sketch.ellipse( px.x, px.y, dot.size * this.zoom, dot.size * this.zoom)
      })
    },
    drawPaint(sketch) {
      sketch.stroke('black')
      let stroke = this.radius * 2 * this.zoom
      sketch.strokeWeight(stroke)

      this.transformedData['3'].forEach((dot) => {
        let px = this.getPixels(dot)
        sketch.line(px.x, px.y, px.x2, px.y2)
      })
    },
    drawLogo(sketch) {
      sketch.strokeWeight(0)
      sketch.fill(this.color)

      this.transformedData['logo'].forEach((dot, i) => {
        let px = this.getPixels(dot)
        sketch.strokeWeight(0)

        if (i <= this.project) {
          sketch.fill(this.color)
          sketch.ellipse(px.x, px.y, this.radius * 2 * this.zoom, this.radius * 2 * this.zoom)
        } else if (i > 4) {
          sketch.fill('black')
          sketch.ellipse(px.x, px.y, dot.size * this.zoom, dot.size * this.zoom)
        } else {
          sketch.stroke('black')
          sketch.strokeWeight(this.radius * 2 * this.zoom)
          sketch.line(px.x, px.y, px.x2, px.y2)
        }
      })
    },
    getPixels (dot) {
      let pixels = {
        x: dot.x * this.distance + this.margin / 2,
        y: dot.y * this.distance + this.margin / 2 + this.fontSize + this.subFontsize
      }

      if (dot.pair) {
        pixels.x2 = dot.pair.x * this.distance + this.margin / 2
        pixels.y2 = dot.pair.y * this.distance + this.margin / 2 + this.fontSize + this.subFontsize
      }

      return pixels
    }
  }
}
</script>

<style>
  canvas {
    border: 1px solid rgba(220, 220, 220, 0.8);
  }
</style>
