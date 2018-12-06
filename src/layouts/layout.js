import * as renderMethods from './index.js';

export default class Layout {
  constructor (shapeSize, nodeNum, canvasSize, methodName, nodeShape) {
    this.shapeSize = shapeSize
    this.nodeNum = nodeNum
    this.canvasSize = canvasSize
    this.renderMethod = renderMethods[methodName]
    this.nodeList = []
    this.nodeShape = nodeShape
  }

  getNodes () {
    for (let i = 0; i < this.nodeNum; i++) {
      let node = this.renderMethod(this.shapeSize, this.nodeList)

      if (node.position.x && node.position.y && node.size.w && node.size.h) {
        this.nodeList.push({
          position: node.position,
          size: node.size
        })
      }
    }
    return this.nodeList
  }

  draw (sketch) {
    let m = this.canvasSize / 100
    this.nodeList.forEach((node) => {
      if (this.nodeShape === 'circle') {
        sketch.ellipse(node.position.x * m, node.position.y * m, node.size.w * m, node.size.h * m)
      }
    })
  }

  animate () {

  }
}
