import { Layout } from './index.js'

export default class LayoutSpiral extends Layout {
  constructor (shapeSize) {
    super(shapeSize)
    this.step = null
    this.elemsPC = shapeSize * Math.PI
  }

  getConfig () {
    this.step = (Math.floor(this.index / this.elemsPC)) * 2

    let coord = this.getCoord()
    let size = this.getNodeSize()

    return {
      coord: coord,
      size: size,
    }
  }

  getCoord () {
    let radius = (this.shapeSize / 2) + this.step
    const angle = (this.index / this.elemsPC * 2) * Math.PI
    const x = (radius * Math.cos(angle)) + 50
    const y = (radius * Math.sin(angle)) + 50

    return {x, y}
  }

  getNodeSize () {
    const numeral = this.index + (this.step * 5)
    const size = Math.sin(Math.PI * ((numeral % this.elemsPC) / this.elemsPC)) * 1.4
    return size > 0 ? size : 0.1
  }
}
