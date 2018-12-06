<template lang="html">
  <div class="preview">
    <vue-p5
        @sketch="sketch"
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
      deg: 45,
      selected: {
        x: [],
        y: []
      }
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    attributes: {
      handler (e) {
        this.deg = e.degree
        this.step = e.distance
        this.size = e.size
      },
      deep: true
    },
    gridProp: {
      handler (e) {
        this.gridSize = e
        this.init()
      },
      deep: true
    },
    paint: {
      handler (e) {
        this.number = e
        this.select(this.number)
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
      this.select(this.number)
      console.log(this.selected, 's');
    },
    sketch (sketch) {
      sketch.draw = () => {
        sketch.background('white')
      };
    },
    setup (sketch) {
      sketch.createCanvas(this.canvasSize, this.canvasSize)
      // sketch.noLoop()
      sketch.frameRate(3)
    },
    draw (sketch) {
      this.drawGrid(sketch)
      this.findPairs(sketch)
    },
    generateGrid() {
      this.grid = []
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
    findPairs(sketch) {
      for (let i = 0; i < this.selected.x.length; i++) {
        let x = this.selected.x[i]
        let y = this.selected.y[i]

        let x2, y2

        if (this.deg === 45 || this.deg === -45) {
          let directions = [-1, 1]
          let cx = Math.round(Math.random())
          let cy = Math.round(Math.random())
          x2 = x + directions[cx]
          y2 = y + directions[cy]
        }

        sketch.strokeWeight(0)
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

      this.grid.forEach((line, i) => {
        line.forEach((p, pi) => {
          let hitY = this.selected.y.indexOf(i)
          let hitX = hitY !== -1 ? this.selected.x[hitY] === pi : false
          if (p === 1) {
            let size = Math.random() * (this.size * 2-5) + 5
            sketch.fill('black')
            sketch.ellipse(
              pi * this.step + this.marginLeft,
              i * this.step + this.marginTop,
              size,
              size
            )
          }

          if (hitX && hitY !== -1) {
            sketch.ellipse(
              pi * this.step + this.marginLeft,
              i * this.step + this.marginTop,
              this.size * 2,
              this.size * 2
            )
          }

        })
      })
    },
    select (number, cb) {
      if (!cb) {
        this.selected = { x: [], y: [] } }
      for (let i = 0; i< number; i++) {
        let y = Math.round(Math.random() * (this.grid.length - 1))
        let x = Math.round(Math.random() * (this.grid[0].length - 1))

        let valid = this.grid[y][x] === 1
        if (!valid) {
          this.select(1, true)
        } else {
          this.selected.x.push(x)
          this.selected.y.push(y)
        }
      }
      console.log(this.selected, 'selected');
    }

  }
}
</script>

<style scoped>
  .preview {
    width: 100%;
    height: 80%;
  }
</style>
