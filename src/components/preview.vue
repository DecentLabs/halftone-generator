<template lang="html">
  <div class="preview">
    <vue-p5
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
      width: null,
      height: null
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
    }
  },
  watch: {
    update(val) {
      if (val) {
        this.redraw()
      }
    }
  },
  methods: {
    redraw() {
      this.$store.dispatch('transformData')
    },
    setup (sketch) {
      this.height = window.innerHeight * 0.8
      this.width = window.innerWidth
      sketch.createCanvas(this.width, this.height)

      sketch.frameRate(5)
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
          dot.x * this.distance,
          dot.y * this.distance,
          dot.size,
          dot.size
        )
      })

      this.transformedData['2'].forEach((dot) => {
        sketch.ellipse(
          dot.x * this.distance,
          dot.y * this.distance,
          this.radius * 2,
          this.radius * 2
        )
      })

      this.transformedData['3'].forEach((dot) => {
        sketch.strokeWeight(0)

        let x = dot.x * this.distance
        let y = dot.y * this.distance
        let x2 = dot.pair.x * this.distance
        let y2 = dot.pair.y * this.distance
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
    width: 100%;
    height: 80%;
  }

  img {
    width: 100px;
    height: 100px;
  }
</style>
