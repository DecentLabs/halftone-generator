import { Layout } from './index.js'

export default class LayoutDiagonal extends Layout {
  constructor(shapeSize, nodeNum) {
    super(shapeSize, nodeNum)
    this.x = 0
    this.y = 0
    this.diagonal = 0
  }

  getConfig () {
    let coord = this.getCoord()
    let size = this.getNodeSize()

    return {
      coord: coord,
      size: size,
    }
  }


  getCoord () {
    const segment = Math.floor(Math.sqrt(this.nodeNum))
    this.diagonal = Math.sqrt(2*segment*segment)
    const width = 100 / segment
    const height = 100 / segment
    this.x = this.index % segment
    this.y = Math.floor(this.index / segment)

    return {
      x: this.x * width + width / 2,
      y: this.y * height + height / 2
    }
  }

  getNodeSize () {
    const size = this.getDiagonal()
    return size > 0 ? size : 0.1
  }

  getDiagonal () {
    const onDiagonal = (this.x + this.y) % 2 === 0
    const middle = (this.x + this.y) / 2
    const q1 = Math.min(this.x, this.y) / middle

    return onDiagonal ? q1 * Math.random() * 3.4 : 0.3
  }

  // getCircle() {
  //   const segment = Math.floor(Math.sqrt(this.nodeNum))
  //   const linePos = (this.x + this.y) * Math.sin(this.x * this.y)
  //   const center = [segment / 2, segment / 2]
  //   const rad = segment / 3
  //   const isInCircle = this.y <= Math.cos()
  // }

  getWaves() {
    const segment = Math.floor(Math.sqrt(this.nodeNum))
    const ratio = [2,4,11,3,8,5]
    const linePos = (this.x + this.y) * Math.sin(this.x * this.y)
    const total = ratio.reduce((a, b) => a + b, 0)
    const diffs = ratio.map(i => Math.round(i * segment / total))
    const sections = ratio.reduce((a,b,v) => {
      let addValue = Math.round(b * segment / total)
      let prevValue = a[v-1] ? a[v-1][1] : 0
      a.push([prevValue, prevValue + addValue])
      return a
    },[])

    const currentSection = sections.filter(array => linePos >= array[0] && linePos < array[1]).pop()


    const isSectionODD = sections.indexOf(currentSection) % 2 === 1
    const divider = diffs[sections.indexOf(currentSection)]
    const angle = isSectionODD ? (linePos % divider) / divider : 1 - (linePos % divider) / divider

    return Math.sin(angle * Math.PI) * 1.2
  }



  randomArray(n) {
    let arr = []
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * 5))
    }
    return arr
  }
}
