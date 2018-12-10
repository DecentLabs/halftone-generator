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
      sketch.frameRate(1)
      // sketch.noLoop()
    },
    draw (sketch) {
      sketch.background('white')

      if (this.transformedData) {
        this.drawGrid(sketch)
      } else {

      }
      // this.findPairs(sketch)
    },
    drawGrid (sketch) {
      sketch.strokeWeight(0)
      sketch.fill('black')

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
          this.cfg.radius,
          this.cfg.radius
        )
      })

      this.transformedData['3'].forEach((dot) => {
        sketch.fill('pink')
        sketch.ellipse(
          dot.x * this.cfg.distance,
          dot.y * this.cfg.distance,
          this.cfg.radius,
          this.cfg.radius
        )
      })
    },

    // findPairs (sketch) {
    //   for (let i = 0; i < this.transformedData['2'].length; i++) {
    //     let x = this.transformedData['2'][i].x
    //     let y = this.transformedData['2'][i].y
    //
    //     let x2, y2
    //
    //     if (this.direction === 45) {
    //       let directions = [-1, 1]
    //       let cx = Math.round(Math.random())
    //       let cy = Math.round(Math.random())
    //       x2 = x + directions[cx]
    //       y2 = y + directions[cy]
    //     }
    //     else if (this.direction < 45) {
    //       let directions = [-1, 1]
    //       let cy = Math.round(Math.random())
    //       x2 = x
    //       y2 = y + directions[cy]
    //     }
    //     if (this.direction > 45) {
    //       let directions = [-1, 1]
    //       let cx = Math.round(Math.random())
    //       x2 = x + directions[cx]
    //       y2 = y
    //     }
    //
    //
    //     sketch.strokeWeight(0)
    //     sketch.ellipse(
    //       x * this.step + this.marginLeft,
    //       y * this.step + this.marginTop,
    //       this.size * 2,
    //       this.size * 2
    //     )
    //     sketch.ellipse(
    //       x2 * this.step + this.marginLeft,
    //       y2 * this.step + this.marginTop,
    //       this.size * 2,
    //       this.size * 2
    //     )
    //
    //     let px = (x * this.step + this.marginLeft)
    //     let px2 = (x2 * this.step + this.marginLeft)
    //     let py = (y * this.step + this.marginTop)
    //     let py2 = (y2 * this.step + this.marginTop)
    //
    //     sketch.strokeWeight(this.size * 2.3)
    //     sketch.line(px, py, px2, py2)
    //   }
    // },

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
