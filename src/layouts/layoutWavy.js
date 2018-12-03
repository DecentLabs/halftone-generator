import { Layout } from './index.js'

export default class LayoutWavy extends Layout {
  constructor (shapeSize) {
    super(shapeSize)
    this.step = null
    this.elemsPC = 80
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
    const size = this.getWaves()
    return size > 0 ? size : 0.1
  }

  getWaves() {
    const ratio = [3,8,13,5,7]
    const linePos = this.index % this.elemsPC
    const total = ratio.reduce((a, b) => a + b, 0)
    const diffs = ratio.map(i => Math.round(i * this.elemsPC / total))
    const sections = ratio.reduce((a,b,v) => {
      let addValue = Math.round(b * this.elemsPC / total)
      let prevValue = a[v-1] ? a[v-1][1] : 0
      a.push([prevValue, prevValue + addValue])
      return a
    },[])

    const currentSection = sections.filter(array => linePos >= array[0] && linePos < array[1]).pop()
    const isSectionODD = sections.indexOf(currentSection) % 2 === 1
    const divider = diffs[sections.indexOf(currentSection)]
    const angle = isSectionODD ? (linePos % divider) / divider : 1 - (linePos % divider) / divider
    return Math.sin(Math.PI * angle) * 1.4
  }
}
