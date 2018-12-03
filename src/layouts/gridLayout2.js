import { Layout } from './index.js'

export default class Grid extends Layout {
  constructor (shapeSize, nodeNum) {
    super(shapeSize, nodeNum)
  }

  getConfig () {
    this.radius = parseInt(this.shapeSize) / 2
    this.segment = Math.floor(Math.sqrt(this.nodeNum))

    let coord = this.getCoord()
    let size = this.getNodeSize()

this.step = 100 / this.segment
    return {
      coord: coord,
      size: size,
    }
  }

  getCoord () {
    this.n = Math.floor(this.index / this.segment)
    let half = this.step / 2
    let y = this.n * this.step + half
    let x = (this.index * this.step) - this.n *(this.segment * this.step) + half

    return {
      x: x,
      y: y
    }
  }

  getNodeSize () {
    let random_1 = Math.random() * 5 + 1
    let random_2 = Math.random() * 10 + 1
    let radius = (this.shapeSize / random_1) + this.step
    const angle = (this.index / this.segment / random_2) * Math.PI
    const x = (radius * Math.sin(angle))
    const y = (radius * Math.cos(angle))
    let a = Math.cos(x) + Math.sin(y)
    return (a * a) / 5
  }
}
