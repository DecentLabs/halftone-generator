<template lang="html">
  <div class="preview">
    <!-- <button type="button" name="button" @click="save">save</button> -->
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
  components: { 'vue-p5': VueP5 },
  props: ['project'],
  data: function () {
    return {
      resizeCanvas: null,
      saveCanvas: null,
      canvas: null,
    }
  },
  computed: {
    color () {
      return this.$store.state.color
    },
    transformedData () {
      return this.$store.getters.getTransformedData
    },
    distance () {
      return this.$store.state.distance
    },
    radius () {
      return this.$store.state.radius
    },
    frameRate () {
      return this.$store.state.frameRate
    },
    grid () {
      return this.$store.state.grid
    },
    canvasHeight () {
      if (this.grid.length) {
        return (this.grid.length-1) * this.distance + this.margin
      } else {
        return 400
      }
    },
    canvasWidth () {
      if (this.grid.length) {
        return (this.grid[0].length-1) * this.distance + this.margin
      } else {
        return 400
      }
    },
    margin () {
      return this.distance * 4
    },
    generatorType () {
      return this.$store.state.generatorType
    }
  },
  watch: {
    generatorType(val) {
      if(this.resizeCanvas && val) {
        this.resizeCanvas(this.canvasWidth, this.canvasHeight)
      }
    },
    distance(val) {
      this.resizeCanvas(this.canvasWidth, this.canvasHeight)
    }
  },
  methods: {
    // save () {
    //   this.saveCanvas('test', 'jpg')
    // },
    setup (sketch) {
      this.resizeCanvas = function (width, height) {
        sketch.resizeCanvas(width, height)
      }
      this.saveCanvas = function (name, type) {
        sketch.saveCanvas(this.canvas, name, type)
      }
      sketch.createCanvas(this.canvasWidth, this.canvasHeight)
      sketch.frameRate(this.frameRate)

      this.canvas = document.querySelector('canvas.p5Canvas')
      this.canvas.style.border = '1px solid rgb(220, 220, 220)'

    },
    draw (sketch) {
      sketch.background('white')

      if(this.$store.state.loop && !this.generatorType === 'logo') {
        this.$store.dispatch('transformData')
      }

      this.drawGrid(sketch)
    },
    drawGrid (sketch) {
      sketch.strokeWeight(0)
      sketch.fill(this.color)
      // sketch.fill('black')
      // sketch.stroke('black')

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

      // sketch.fill(this.color)
      sketch.fill('black')
      this.transformedData['3'].forEach((dot) => {
        let x = dot.x * this.distance + this.margin/2
        let y = dot.y * this.distance + this.margin/2
        let x2 = dot.pair.x * this.distance + this.margin/2
        let y2 = dot.pair.y * this.distance + this.margin/2
        let size = this.radius

        sketch.strokeWeight(0)
        sketch.ellipse( x, y, size, size)
        sketch.ellipse( x2, y2, size, size)

        sketch.strokeWeight(size * 2.3)
        sketch.line(x, y, x2, y2)
      })

      sketch.strokeWeight(0)
      sketch.fill(this.color)
      this.transformedData['logo'].forEach((dot, i) => {

        if( i <= this.project) {
          sketch.ellipse(
            dot.x * this.distance + this.margin/2,
            dot.y * this.distance + this.margin/2,
            this.radius *2,
            this.radius*2
          )
        } else {
          // TODO
          let x = dot.x * this.distance + this.margin/2
          let y = dot.y * this.distance + this.margin/2
          let x2 = (dot.x + 1) * this.distance + this.margin/2
          let y2 = (dot.y +1) * this.distance + this.margin/2
          let size = this.radius

          sketch.strokeWeight(0)
          sketch.ellipse( x, y, size, size)
          sketch.ellipse( x2, y2, size, size)

          sketch.strokeWeight(size * 2.3)
          sketch.line(x, y, x2, y2)
        }

      })
      // for (let a = 0; a <= this.project; a++) {
      //   let dot = this.transformedData['logo'][a]
      //   if (dot) {
      //     sketch.ellipse(
      //       dot.x * this.distance + this.margin/2,
      //       dot.y * this.distance + this.margin/2,
      //       this.radius * 2,
      //       this.radius * 2
      //     )
      //   }
      // }
    }
  }
}
</script>

<style scoped>
</style>
