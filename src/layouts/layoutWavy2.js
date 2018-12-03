import { Layout } from './index.js'

export default class LayoutWavy2 extends Layout {
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
    const size = this.getWaves()
    return size > 0 ? size : 0.1
  }

  getWaves() {
    this.radiusMax = (100 - this.shapeSize) / 2
    let lines = Math.ceil(this.nodeNum / (this.radiusMax * 4))
    this.nodesInLine = Math.floor(this.nodeNum / lines)
    const ratio = [3,8,13,5,11]
    const linePos = this.index % this.nodesInLine
    const total = ratio.reduce((a, b) => a + b, 0)
    const diffs = ratio.map(i => Math.round(i * this.nodesInLine / total))
    const sections = ratio.reduce((a,b,v) => {
      let addValue = Math.round(b * this.nodesInLine / total)
      let prevValue = a[v-1] ? a[v-1][1] : 0
      a.push([prevValue, prevValue + addValue])
      return a
    },[])

    const currentSection = sections.filter(array => linePos >= array[0] && linePos < array[1]).pop()
    const isSectionODD = sections.indexOf(currentSection) % 2 === 1
    const divider = diffs[sections.indexOf(currentSection)]
    const angle = isSectionODD ? (linePos % divider) / divider : 1 - (linePos % divider) / divider
    return Math.sin(Math.PI * angle) * 1.2
  }
}
