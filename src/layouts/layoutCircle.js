import { Layout } from './index.js'

export default class LayoutCircle extends Layout {
  constructor (shapeSize, nodeNum) {
    super(shapeSize, nodeNum)
    this.step = null
  }

  getConfig () {
    this.step = (Math.floor(this.index / 50)) * 2

    let coord = this.getCoord()
    let size = this.getNodeSize()

    return {
      coord: coord,
      size: size,
    }
  }

  getCoord () {
    let radius = (this.shapeSize / 2) + this.step
    const angle = (this.index / 25) * Math.PI
    const x = (radius * Math.sin(angle)) + 50
    const y = (radius * Math.cos(angle)) + 50

    return {x, y}
  }

  getNodeSize () {
    let lineNodes = 50
    let lines = Math.floor(this.nodeNum / lineNodes) * 2
    let incrSize = this.step * 0.15
    let descSize = (lines - (this.step - 2)) * 0.15
    let middle = Math.round(lines / 2)

    let size = this.step < middle ? incrSize : descSize
    return size > 0 ? size : 0.1
  }
}
