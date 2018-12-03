import {
  LayoutBrigi,
  LayoutCircle,
  LayoutSpiral,
  LayoutWavy,
  LayoutWavy2,
  LayoutBrigi2,
  LayoutDiagonal,
  LayoutCircleFade,
  LayoutSvg,
  Grid
} from './index.js'

export default class Layout {
  constructor (shapeSize, nodeNum) {
    this.index = 0
    this.shapeSize = shapeSize
    this.nodeNum = nodeNum
  }

  static generateLayout (type, shapeSize, nodeNum) {
    if (type === 'circle') {
      return new LayoutCircle(shapeSize, nodeNum)
    }
    if (type === 'spiral') {
      return new LayoutSpiral(shapeSize)
    }
    if (type === 'wavycircle') {
      return new LayoutWavy(shapeSize)
    }
    if (type === 'wavycircle2') {
      return new LayoutWavy2(shapeSize, nodeNum)
    }
    if (type === 'brigi') {
      return new LayoutBrigi(shapeSize, nodeNum)
    }
    if (type === 'brigi2') {
      return new LayoutBrigi2(shapeSize, nodeNum)
    }
    if (type === 'layoutSvg') {
      return new LayoutSvg(shapeSize, nodeNum)
    }
    if (type === 'grid') {
      return new Grid(shapeSize, nodeNum)
    }
    if (type === 'diagonal') {
      return new LayoutDiagonal(shapeSize, nodeNum)
    }
    if (type === 'circlefade') {
      return new LayoutCircleFade(shapeSize, nodeNum)
    }
  }
}
