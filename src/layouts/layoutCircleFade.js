import { Layout } from './index.js'

export default class LayoutCircleFade extends Layout {
  constructor (shapeSize, nodeNum) {
    super(shapeSize, nodeNum)
    this.step = null
    this.nodesInLine = 50
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
    const radius = (this.shapeSize / 2) + this.step + 2
    const angle = (this.index / ((this.nodesInLine) / 2)) * Math.PI
    const x = (radius * Math.sin(angle)) + 50
    const y = (radius * Math.cos(angle)) + 50

    return {x, y}
  }

  getNodeSize () {
    const lines = Math.floor(this.nodeNum / this.nodesInLine)
    const currentLine = Math.floor(this.index / this.nodesInLine)
    const linePos = this.index % this.nodesInLine
    const randomSmall = Math.random() * 2 / 5
    let randomBig = (Math.random() * 8 + 6) / 10
    randomBig = randomBig < 0.3 ? 0.3 : randomBig
    let q1 = currentLine < lines / 4 || currentLine > lines * 2 / 3 ? randomBig : randomSmall
    let segment = Math.random() * 7 / 13 * this.nodesInLine
    let segmentPos = linePos / segment
    let q2 = Math.sin(segmentPos * Math.PI) * 1.3
    let q3 = linePos < segment ? randomBig : randomSmall

    let size = q2 * q3 * 1.1
    return size > 0.3 ? size : randomSmall
  }
}
