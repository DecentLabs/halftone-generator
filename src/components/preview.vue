<template lang="html">
  <div class="preview">
    <vue-p5
        @setup="setup"
        @draw="draw"
        @preload="preload">
    </vue-p5>
  </div>
</template>

<script>
import VueP5 from 'vue-p5'
import generators from './../generators'

export default {
  components: { 'vue-p5': VueP5 },
  props: [],
  data: function () {
    return {
      width: null,
      height: null,
      redraw: null
    }
  },
  computed: {
    grid () {
      return this.$store.getters.getGrid
    },
    transformedData () {
      return this.$store.getters.getTransformedData
    },
    cfg () {
      return this.$store.getters.getCommonSettings
    }
  },
  methods: {
    init (sketch) {
      this.redraw = function () {
        sketch.redraw()
      }

      this.height = window.innerHeight * 0.8
      this.width = window.innerWidth
    },
    preload(sketch) {
      // this.image = sketch.loadImage('./assets/heart2.png')
    },
    setup (sketch) {
      this.init(sketch)

      sketch.createCanvas(this.width, this.height)
      sketch.frameRate(3)
    },
    draw (sketch) {
      sketch.background('white')

      if(this.$store.state.loop) {
        let transformedData = generators.dataTransform(
          this.grid,
          this.$store.state.paintNum,
          this.$store.state.radius,
          this.$store.state.direction
        )
        this.$store.commit('transformData', transformedData)
      }

      if (this.transformedData) {
        this.drawGrid(sketch)
      }
    },
    drawGrid (sketch) {
      sketch.strokeWeight(0)
      sketch.fill('pink')
      sketch.stroke('pink')

      this.transformedData['1'].forEach((dot) => {
        sketch.ellipse(
          dot.x * this.cfg.distance,
          dot.y * this.cfg.distance,
          dot.size,
          dot.size
        )
      })

      this.transformedData['2'].forEach((dot) => {
        sketch.ellipse(
          dot.x * this.cfg.distance,
          dot.y * this.cfg.distance,
          this.cfg.radius * 2,
          this.cfg.radius * 2
        )
      })

      this.transformedData['3'].forEach((dot) => {
        sketch.strokeWeight(0)

        let x = dot.x * this.cfg.distance
        let y = dot.y * this.cfg.distance
        let x2 = dot.pair.x * this.cfg.distance
        let y2 = dot.pair.y * this.cfg.distance
        let size = this.cfg.radius

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
    width: 100%;
    height: 80%;
  }

  img {
    width: 100px;
    height: 100px;
  }
</style>
