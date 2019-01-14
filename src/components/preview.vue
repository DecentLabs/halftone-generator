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
      textData: { label: {}, subLabel: {}, height: 0 }
    }
  },
  computed: {
    maxLabelWidth () {
      let arr = [this.textData.label.width, this.textData.subLabel.width]
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
      return this.$store.state.fontSize * this.zoom
    },
    subFontsize () {
      return this.$store.state.subLabelSize === 'small' ? this.fontSize / 2.2 : this.fontSize
    },
    textHeight () {
      return this.textData.height
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
      if (this.labelPosition === 'top' || this.labelPosition === 'bottom') {
        height += this.textData.height + this.distance
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
    textHeight () {
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
    calculateTextSizes (sketch, label, subLabel, descent) {
      // label sizes
      sketch.textSize(this.fontSize)
      let bBox = this.fontBold.textBounds(label, 0, 0, this.fontsize)
      this.textData.label = bBox
      this.textData.label.descent = sketch.textDescent()
      this.textData.label.width = sketch.textWidth(label)

      this.textData.height = bBox.h + this.textData.label.descent

      // sublabel sizes
      if (subLabel) {
        sketch.textSize(this.subFontsize)
        let subBBox = this.fontBold.textBounds(this.subLabel, 0, 0, this.subFontsize)
        this.textData.subLabel = subBBox
        this.textData.subLabel.width = sketch.textWidth(subLabel)

        this.textData.height += subBBox.h
      }
    },
    drawLabels (sketch) {
      sketch.strokeWeight(0)
      sketch.fill('black')
      sketch.textAlign(sketch.LEFT)

      let positionY
      let positionX
      let subLabel = this.subLabel.length && this.showSubLabel ? this.subLabel : null

      this.calculateTextSizes(sketch, this.label, subLabel)

      if (this.labelPosition === 'top') {
        positionY = this.textData.label.h + this.distance
        positionX = this.distance
      } else if (this.labelPosition === 'bottom') {
        positionY =  this.gridHeight + this.textData.label.h
        positionX = this.distance
      } else if (this.labelPosition === 'right') {
        let top = (this.canvasHeight - this.textData.height) / 2
        positionY =  this.textData.label.h + top
        positionX = this.gridWidth
      }

      sketch.textSize(this.fontSize)
      sketch.text(this.label,
                  positionX + this.$store.state.translateXLabel * this.zoom,
                  positionY + this.$store.state.translateYLabel * this.zoom)

      if (subLabel) {
        sketch.textSize(this.subFontsize)
        sketch.text(subLabel,
                    positionX + this.textData.label.x - this.textData.subLabel.advance + this.$store.state.translateXSubLabel * this.zoom,
                    positionY + this.textData.subLabel.h + this.textData.label.descent + this.$store.state.translateYSubLabel * this.zoom)
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
          translateY = this.textData.height + this.distance
        } else {
          translateY = this.textData.label.h + this.distance
        }
      }
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
    /* margin: 50px; todo */
  }
</style>
