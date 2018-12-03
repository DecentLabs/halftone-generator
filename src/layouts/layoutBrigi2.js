import { Layout } from './index.js'

export default class LayoutBrigi2 extends Layout {
  constructor (shapeSize, nodeNum) {
    super(shapeSize, nodeNum)
    this.step = null
    this.radius = null
  }

  getConfig () {
    this.radiusMax = (100 - this.shapeSize) / 2
    let lines = Math.ceil(this.nodeNum / (this.radiusMax * 4))
    this.nodesInLine = Math.floor(this.nodeNum / lines)
    this.step = (Math.floor(this.index / this.nodesInLine)) * 2

    let nl = this.nodesInLine -10
    let leftover = lines * 10
    let n = Math.round(leftover / (lines * lines))

    this.nodesInLine = (this.step * n) + nl

    let coord = this.getCoord()
    let size = this.getNodeSize()

    return {
      coord: coord,
      size: size,
    }
  }

  getCoord () {
    this.radius = (this.shapeSize / 2) + this.step + 2
    const angle = (this.index / ((this.nodesInLine) / 2)) * Math.PI
    const x = (this.radius * Math.sin(angle)) + 50
    const y = (this.radius * Math.cos(angle)) + 50

    return {x, y}
  }

  getNodeSize () {
    let s = Math.random() - 0.2
    return s > 0 ? s : null
  }
}
