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
      textData: { label: {}, subLabel: {}, height: 0 },
      showGuides: false
    }
  },
  computed: {
    maxLabelWidth () {
      let arr = [0]
      if (this.label && this.textData.label.width) {
        arr.push(this.textData.label.width)
      }
      if (this.subLabel && this.textData.subLabel.width) {
        arr.push(this.textData.subLabel.width)
      }
      return Math.max(...arr)
    },
    labelPosition () {
      return this.$store.state.generator.labelPosition
    },
    label () {
      let label = this.$store.state.generator.labelName
      return label.length && this.showLabel ? label : null
      // return this.$store.state.generator.labelName
    },
    subLabel () {
      let label = this.$store.state.generator.subLabel
      return label.length && this.showSubLabel ? label : null
      // return this.$store.state.generator.subLabel
    },
    fontSize () {
      return this.$store.state.generator.fontSize * this.zoom
    },
    subFontsize () {
      return this.$store.state.generator.subLabelSize === 'small' ? this.fontSize / 2.2 : this.fontSize
    },
    textHeight () {
      return this.textData.height
    },
    background () {
      return this.transparent ? 'rgba(0, 0, 0, 0)' : this.$store.state.generator.bgColor
    },
    zoom () {
      return this.exportZoom ? this.exportZoom : this.$store.getters['generator/getZoomValue']
    },
    mainColor () {
      return this.$store.state.generator.mainColor
    },
    labelColor () {
      return this.$store.state.generator.labelColor
    },
    color() {
      return this.$store.state.generator.color
    },
    transformedData() {
      return this.$store.getters['generator/getTransformedData']
    },
    distance() {
      return this.$store.state.generator.distance * this.zoom
    },
    radius() {
      return this.$store.state.generator.radius
    },
    frameRate() {
      return this.$store.state.generator.frameRate
    },
    grid() {
      return this.$store.state.generator.grid
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
      if ((this.label || this.subLabel) && (this.labelPosition === 'top' || this.labelPosition === 'bottom')) {
        height += this.textData.height + this.distance
      }
      return height
    },
    canvasWidth() {
      let width = this.gridWidth
      if (this.labelPosition === 'right' && (this.label || this.subLabel)) {
        width += this.maxLabelWidth + this.distance*2
      }
      return width
    },
    margin() {
      return this.distance * 4
    },
    generatorType() {
      return this.$store.state.generator.generatorType
    },
    wrapLabel () {
      return this.$store.state.generator.wrapLabel
    },
    showSubLabel () {
      return this.$store.state.generator.showSubLabel
    },
    showLabel () {
      return this.$store.state.generator.showLabel
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
      // sketch.noLoop()

    },
    draw(sketch) {
      sketch.clear()
      sketch.background(this.background)

      if (this.$store.state.generator.loop && (this.generatorType !== 'logo')) {
        this.$store.dispatch('generator/transformData')
      }

      this.drawLabels(sketch)
      this.drawDot(sketch)
      this.drawFix(sketch)
      this.drawLogo(sketch)
      this.drawPaint(sketch)
      this.guide(sketch)

      this.drawResovle(this.canvas)
    },
    calculateTextSizes (sketch) {
      this.textData.height = 0

      // label sizes
      if (this.label) {
        sketch.textSize(this.fontSize)
        let bBox = this.fontBold.textBounds(this.label, 0, 0, this.fontsize)
        this.textData.label = bBox
        this.textData.label.descent = sketch.textDescent()
        this.textData.label.width = sketch.textWidth(this.label)

        this.textData.height = bBox.h + this.textData.label.descent
      }

      // sublabel sizes
      if (this.subLabel) {
        sketch.textSize(this.subFontsize)
        let subBBox = this.fontBold.textBounds(this.subLabel, 0, 0, this.subFontsize)
        this.textData.subLabel = subBBox
        this.textData.subLabel.width = sketch.textWidth(this.subLabel)

        this.textData.height += subBBox.h
      }
    },
    drawLabels (sketch) {
      sketch.strokeWeight(0)
      sketch.fill(this.labelColor)
      sketch.textAlign(sketch.LEFT)

      this.calculateTextSizes(sketch)

      let positionY
      let positionX
      let height

      if (this.label) {
        height = this.textData.label.h
      } else if (this.subLabel) {
        height = this.textData.subLabel.h
      }

      // TODO REFACTOR THIS !!!!!!!!
      if (this.labelPosition === 'top') {
        positionY = height + this.distance
        positionX = this.distance
      } else if (this.labelPosition === 'bottom') {
        positionY =  this.gridHeight + height
        positionX = this.distance
      } else if (this.labelPosition === 'right') {
        let top = (this.canvasHeight - this.textData.height) / 2
        positionY =  height + top
        positionX = this.gridWidth
      }

      if (this.label) {
        sketch.textSize(this.fontSize)
        sketch.text(this.label,
                    positionX + this.$store.state.generator.translateXLabel * this.zoom,
                    positionY + this.$store.state.generator.translateYLabel * this.zoom)

        if (this.subLabel) {
          sketch.textSize(this.subFontsize)
          sketch.text(this.subLabel,
                      positionX + this.textData.label.x - this.textData.subLabel.advance + this.$store.state.generator.translateXSubLabel * this.zoom,
                      positionY + this.textData.subLabel.h + this.textData.label.descent + this.$store.state.generator.translateYSubLabel * this.zoom)
        }
      } else if (this.subLabel) {
        sketch.textSize(this.subFontsize)
        sketch.text(this.subLabel,
                    positionX + this.$store.state.generator.translateXSubLabel * this.zoom,
                    positionY + this.$store.state.generator.translateYSubLabel * this.zoom)
      }
    },
    drawDot(sketch) {
      sketch.fill(this.mainColor)
      sketch.strokeWeight(0)

      this.transformedData['1'].forEach((dot) => {
        let px = this.getPixels(dot)
        sketch.ellipse( px.x, px.y, dot.size * this.zoom, dot.size * this.zoom)
      })
    },
    drawFix(sketch) {
      sketch.fill(this.mainColor)
      sketch.strokeWeight(0)

      this.transformedData['2'].forEach((dot) => {
        let px = this.getPixels(dot)
        sketch.ellipse( px.x, px.y, dot.size * this.zoom, dot.size * this.zoom)
      })
    },
    drawPaint(sketch) {
      sketch.stroke(this.mainColor)
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
          sketch.fill(this.mainColor)
          sketch.ellipse(px.x, px.y, dot.size * this.zoom, dot.size * this.zoom)
        } else {
          sketch.stroke(this.mainColor)
          sketch.strokeWeight(this.radius * 2 * this.zoom)
          sketch.line(px.x, px.y, px.x2, px.y2)
        }
      })
    },
    getPixels (dot) {
      let translateY = 0
      if (this.labelPosition === 'top') {
        if (this.subLabel || this.label) {
          translateY = this.textData.height + this.distance
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
    },
    guide(sketch) {
      if (this.showGuides) {
        sketch.stroke('orangered')
        sketch.strokeWeight(1)
        sketch.line(this.canvasWidth/2, 0, this.canvasWidth/2, this.canvasHeight)
        sketch.line(0, this.canvasHeight/2, this.canvasWidth, this.canvasHeight/2)
      }
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
