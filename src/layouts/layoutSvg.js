import { Layout } from './index.js'

export default class LayoutSvg extends Layout {
  constructor (shapeSize, nodeNum, svg) {
    super(shapeSize, nodeNum, svg)
    console.log(this, 'this');
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
    return {x: null, y: null}
  }

  getNodeSize () {
    return 0
  }
}
