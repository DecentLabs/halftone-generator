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

const defaultCanvasSize = 400

export default {
  components: {
    'vue-p5': VueP5
  },
  props: ['project', 'name', 'exportZoom', 'transparent'],
  data: function() {
    return {
      drawed: null,
      drawResovle: null,
      resizeCanvas: null,
      canvas: null,
      fontBold: null,
      labelWidth: 0,
      subLabelWidth: 0,
      bboxLabel: null,
      bboxSubLabel: null
    }
  },
  computed: {
    maxLabelWidth () {
      let arr = [this.labelWidth, this.subLabelWidth]
      return Math.max(...arr)
    },
    labelPosition () {
      return this.$store.state.labelPosition
    },
    label () {
      return this.$store.state.labelName
    },
    subLabel () {
      return this.$store.state.subLabel
    },
    fontSize () {
      let size = this.$store.state.fontSize + this.$store.state.labelSize
      if (this.$store.state.generatorType === 'template') {
        size = 56 + this.$store.state.labelSize
      }
      return size * this.zoom
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
    gridHeight () {
      if (this.grid.length) {
        return (this.grid.length - 1) * this.distance + this.margin
      } else {
        return defaultCanvasSize
      }
    },
    gridWidth () {
      if (this.grid.length) {
        return (this.grid[0].length - 1) * this.distance  + this.margin
      } else {
        return defaultCanvasSize
      }
    },
    canvasHeight() {
      let height = this.gridHeight
      let labelH = this.bboxLabel ? this.bboxLabel.h : 0
      let subH = this.bboxSubLabel ? this.bboxSubLabel.h : 0 // TODO ez itt nem jo!!!
      if (this.labelPosition === 'top' || this.labelPosition === 'bottom') {
        if (this.showSubLabel && this.subLabel.length) {
          height += labelH + subH + this.distance
        } else {
          height += labelH + this.distance
        }
      }
      return height
    },
    canvasWidth() {
      let width = this.gridWidth
      if (this.labelPosition === 'right') {
        width += this.maxLabelWidth + this.distance*2
      }
      return width
    },
    margin() {
      return this.distance * 4
    },
    generatorType() {
      return this.$store.state.generatorType
    },
    wrapLabel () {
      return this.$store.state.wrapLabel
    },
    showSubLabel () {
      return this.$store.state.showSubLabel
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
    },
    maxLabelWidth () {
      this.resizeCanvas(this.canvasWidth, this.canvasHeight)
    },
    fontSize () {
      this.resizeCanvas(this.canvasWidth, this.canvasHeight)
    },
    showSubLabel (val) {
      this.resizeCanvas(this.canvasWidth, this.canvasHeight)
    },
    subLabel (newVal, oldVal) {
      if ((!oldVal.length && newVal.length) || (oldVal.length && !newVal.length)) {
        this.resizeCanvas(this.canvasWidth, this.canvasHeight)
      }
    },
    labelPosition() {
      this.resizeCanvas(this.canvasWidth, this.canvasHeight)
    }
  },
  methods: {
    preload (sketch) {
      this.drawed =  new Promise(resolve => this.drawResovle = resolve)
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

      if (this.$store.state.loop && (this.generatorType !== 'logo')) {
        this.$store.dispatch('transformData')
      }

      this.drawLabels(sketch)
      this.drawDot(sketch)
      this.drawFix(sketch)
      this.drawLogo(sketch)
      this.drawPaint(sketch)

      this.drawResovle(this.canvas)
    },
    drawLabels (sketch) {
      sketch.strokeWeight(0)
      sketch.fill('black')
      sketch.textAlign()

      let positionY
      let positionX
      let label = ''

      if (this.wrapLabel) {
        this.label.split(' ').forEach((word, i) => {
          label += word + '\n' // TODO
        })
      } else {
        label = this.label
      }

      this.bboxLabel = this.fontBold.textBounds(label, 0, 0, this.fontSize)
      this.bboxSubLabel = (this.subLabel.length && this.showSubLabel) ? this.fontBold.textBounds(this.subLabel, 0, 0, this.subFontsize) : null

      sketch.textSize(this.fontSize)
      let descent = sketch.textDescent()
      let ascent = sketch.textAscent()
      sketch.textLeading(ascent)

      if (this.labelPosition === 'top') {
        positionY = this.bboxLabel.h + this.distance
        positionX = this.distance
      } else if (this.labelPosition === 'bottom') {
        positionY =  this.gridHeight + this.bboxLabel.h
        positionX = this.distance
      } else if (this.labelPosition === 'right') {
        let top = (this.canvasHeight - (this.bboxLabel.h + this.bboxSubLabel.h)) / 2
        positionY =  top + this.bboxLabel.h - descent
        positionX = this.gridWidth + this.distance
      }

      this.labelWidth = sketch.textWidth(this.label)
      sketch.text(label, positionX, positionY)

      if (this.subLabel.length && this.showSubLabel) {
        sketch.textSize(this.subFontsize)
        this.subLabelWidth = sketch.textWidth(this.subLabel)
        sketch.text(this.subLabel, positionX + this.bboxLabel.x - this.bboxSubLabel.advance , positionY + this.bboxSubLabel.h + descent)
      }
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
      let translateY = 0
      if (this.labelPosition === 'top') {
        if (this.showSubLabel && this.subLabel.length) {
          translateY = this.bboxLabel.h + this.bboxSubLabel.h + this.distance
        } else {
          translateY = this.bboxLabel.h + this.distance
        }
      }
      // let translateY = this.labelPosition === 'top' ? this.fontSize + this.subFontsize + this.distance : 0 // TODO
      let pixels = {
        x: dot.x * this.distance + this.margin / 2,
        y: dot.y * this.distance + this.margin / 2 + translateY
      }

      if (dot.pair) {
        pixels.x2 = dot.pair.x * this.distance + this.margin / 2
        pixels.y2 = dot.pair.y * this.distance + this.margin / 2 + translateY
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
