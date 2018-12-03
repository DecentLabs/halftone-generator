export default class Grid {
  constructor (shapeSize, nodeNum, i, nodeList, div) {
    this.shapeSize = shapeSize
    this.nodeNum = nodeNum
    this.index = i
    this.nodeList = nodeList
    this.div = div

    this.radius = null
    this.segemnt = null
    this.step = null
    this.n = null
  }

  getConfig () {
    this.radius = parseInt(this.shapeSize) / 2
    this.segment = Math.floor(Math.sqrt(this.nodeNum))
    this.step = 100 / this.segment

    let coord = this.getCoord()
    let size = this.getNodeSize()

    return {
      coord: coord,
      size: size,
    }
  }

  getCoord () {
    this.step = 100
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
    return (Math.random() * 0.7) * this.div
  }
}
