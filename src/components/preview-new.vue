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
import * as layouts from './../layouts/index.js'
import Layout from './../layouts/layout.js'

export default {
  components: { 'vue-p5': VueP5 },
  props: ['attributes', 'gridProp', 'paint'],
  data: function () {
    return {
      grid: [],
      gridSize: [5, 5],
      step: 30,
      size: 10,
      number: 10,
      marginLeft: null,
      marginTop: 100,
      direction: 45,
      gridType: 'beer',
      transformedData: {},
      loop: true,
      redraw: null
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    attributes: {
      handler (e) {
        this.direction = e.degree
        this.step = e.distance
        this.size = e.size
        if (!this.loop && this.redraw) {
          this.init()
          this.redraw()
        }
      },
      deep: true
    },
    gridProp: {
      handler (e) {
        this.gridSize = e
        this.init()
        if (!this.loop && this.redraw) {
          this.redraw()
        }
      },
      deep: true
    },
    paint: {
      handler (e) {
        this.number = e
        this.init()
        if (!this.loop && this.redraw) {
          this.redraw()
        }
      },
      deep: true
    }
  },
  methods: {
    init () {
      this.canvasSize = window.innerHeight * 0.8
      let width = this.gridSize[0] * this.step
      this.marginLeft = (this.canvasSize - width) / 2

      this.generateGrid()
      this.transformGrid()
      this.select(this.number)
    },
    setup (sketch) {
      this.redraw = function () {
        sketch.redraw()
      }
      sketch.createCanvas(this.canvasSize, this.canvasSize)
      if (this.loop) {
        sketch.frameRate(3)
      } else {
        sketch.noLoop()
      }
    },
    draw (sketch) {
      sketch.background('white')
      this.drawGrid(sketch)
      this.findPairs(sketch)
    },
    generateGrid() {
      this.grid = []
      if (this.gridType === 'simple') {
        this.simpleGrid()
      } else if (this.gridType === 'beer') {
        this.beerGrid()
      }
    },
    beerGrid () {
      this.grid = [
        [0, 0, 3, 0, 3, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 3, 0, 3, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 3, 0, 3, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 3, 0, 3, 0, 0],
        [0, 3, 0, 1, 0, 3, 0],
        [3, 0, 1, 0, 1, 0, 3],
        [0, 1, 0, 1, 0, 1, 0],
        [3, 0, 1, 0, 1, 0, 3],
        [0, 1, 0, 1, 0, 1, 0],
        [3, 0, 1, 0, 1, 0, 3],
        [0, 1, 0, 1, 0, 1, 0],
        [3, 0, 1, 0, 1, 0, 3],
        [0, 1, 0, 1, 0, 1, 0],
        [3, 0, 1, 0, 1, 0, 3],
        [0, 1, 0, 1, 0, 1, 0],
        [3, 0, 3, 0, 3, 0, 3],
      ]
    },
    simpleGrid () {
      for (let y = 0; y < this.gridSize[1]; y++) {
        let newLine = []
        let evenY = y % 2 === 0
        for (let x = 0; x < this.gridSize[0]; x++) {
          let point
          if (evenY) {
            point = x % 2 === 0 ? 1 : 0
          } else {
            point = x % 2 === 0 ? 0 : 1
          }
          newLine.push(point)
        }
        this.grid.push(newLine)
      }
    },
    transformGrid () {
      this.transformedData = {
        0: [],
        1: [],
        2: [],
        3: []
      }

      this.grid.forEach((line, yi) => {
        line.forEach((item, xi) => {
          this.transformedData[item].push({
            x: xi,
            y: yi
          })
        })
      })
    },
    findPairs (sketch) {
      for (let i = 0; i < this.transformedData['2'].length; i++) {
        let x = this.transformedData['2'][i].x
        let y = this.transformedData['2'][i].y

        let x2, y2

        if (this.direction === 45) {
          let directions = [-1, 1]
          let cx = Math.round(Math.random())
          let cy = Math.round(Math.random())
          x2 = x + directions[cx]
          y2 = y + directions[cy]
        }
        else if (this.direction < 45) {
          let directions = [-1, 1]
          let cy = Math.round(Math.random())
          x2 = x
          y2 = y + directions[cy]
        }
        if (this.direction > 45) {
          let directions = [-1, 1]
          let cx = Math.round(Math.random())
          x2 = x + directions[cx]
          y2 = y
        }


        sketch.strokeWeight(0)
        sketch.ellipse(
          x * this.step + this.marginLeft,
          y * this.step + this.marginTop,
          this.size * 2,
          this.size * 2
        )
        sketch.ellipse(
          x2 * this.step + this.marginLeft,
          y2 * this.step + this.marginTop,
          this.size * 2,
          this.size * 2
        )

        let px = (x * this.step + this.marginLeft)
        let px2 = (x2 * this.step + this.marginLeft)
        let py = (y * this.step + this.marginTop)
        let py2 = (y2 * this.step + this.marginTop)

        sketch.strokeWeight(this.size * 2.3)
        sketch.line(px, py, px2, py2)
      }
    },
    drawGrid (sketch) {
      sketch.strokeWeight(0)

      this.transformedData['1'].forEach((dot) => {
        let size = Math.random() * (this.size * 2-5) + 5
        sketch.fill('black')
        sketch.ellipse(
          dot.x * this.step + this.marginLeft,
          dot.y * this.step + this.marginTop,
          size,
          size
        )
      })

      this.transformedData['3'].forEach((dot) => {
        sketch.fill('black')
        sketch.ellipse(
          dot.x * this.step + this.marginLeft,
          dot.y * this.step + this.marginTop,
          this.size * 2,
          this.size * 2
        )
      })
    },
    select (number) {
      let selected = []
      for (let n = 0; n < number; n++) {
        let length = this.transformedData['1'].length-1
        let index = Math.round(Math.random() * length)
        let item = this.transformedData['1'][index]

        let included = selected.find((saved) => {
          return saved.x === item.x && saved.y === item.y
        })
        if (!included) {
          selected.push(item)
          this.transformedData['2'].push(item)
          this.transformedData['1'].splice(index, 1)
          this.grid[item.y][item.x] = 2
        }
      }
      return selected
    }
    // select (number, cb) {
    //   if (!cb) {
    //     this.selected = { x: [], y: [] } }
    //   for (let i = 0; i< number; i++) {
    //     let y = Math.round(Math.random() * (this.grid.length - 1))
    //     let x = Math.round(Math.random() * (this.grid[0].length - 1))
    //
    //     let valid = this.grid[y][x] === 1
    //     if (!valid) {
    //       this.select(1, true)
    //     } else {
    //       this.selected.x.push(x)
    //       this.selected.y.push(y)
    //
    //       this.grid[y][x] = 2
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
  .preview {
    width: 100%;
    height: 80%;
  }
</style>
