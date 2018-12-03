import { Layout } from './index.js'

export default class LayoutBrigiAnimation extends Layout {
  constructor (shapeSize) {
    super(shapeSize)
    this.index = null
    this.nodeList = null
    this.radius = null

    let distance = this.shapeSize / (Math.random() * 15 + 5)
    this.radiusMin = (this.shapeSize / 2) + distance
    this.radiusMax = 100 - this.shapeSize
  }

  getConfig () {
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
    return size / (Math.random() + 1)
  }
}
