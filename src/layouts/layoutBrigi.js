export default class LayoutBrigi {
  constructor (shapeSize, nodeNum, i, nodeList, div) {
    this.shapeSize = shapeSize
    this.nodeNum = nodeNum
    this.index = i
    this.nodeList = nodeList
    this.div = div || 8.72

    this.radius = null
  }

  getConfig () {
    let distance = this.shapeSize / (Math.random() * 15 + 5)
    this.radiusMin = (this.shapeSize / 2) + distance
    this.radiusMax = 100 - this.shapeSize

    this.radius = Math.random() *
                  (this.radiusMax * (this.radiusMax / 2) * Math.random()) +
                  (this.radiusMin * this.radiusMin)

    let coord = this.getCoord()
    let size = this.getNodeSize()

    return {
      coord: coord,
      size: size,
    }
  }

  getCoord () {
    let angle = Math.random() * 2 * Math.PI
    let x = (Math.sqrt(this.radius) * Math.cos(angle)) + 50
    let y = (Math.sqrt(this.radius) * Math.sin(angle)) + 50

    x = x * this.div
    y = y * this.div

    for(let i in this.nodeList) {
      if(Math.abs(this.nodeList[i].x-x) < this.nodeList[i].size &&
         Math.abs(this.nodeList[i].y-y) < this.nodeList[i].size) {
          x = null
          y = null
      }
    }
    return {
      x: x,
      y: y
    }
  }

  getNodeSize () {
    let size = (this.radiusMax * this.radiusMax) / this.radius
    return (size / (Math.random() + 1)) * this.div
  }
}
