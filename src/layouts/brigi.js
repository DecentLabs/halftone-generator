export default function (shapeSize, nodeList) {
  let distance = shapeSize / (Math.random() * 15 + 5)
  let radiusMin = (shapeSize / 2) + distance

  const radiusMax = 100 - shapeSize
  const radius = Math.random() *
                (radiusMax * (radiusMax / 2) * Math.random()) +
                (radiusMin * radiusMin)

  return {
    position: getNodePosition(radius, nodeList),
    size: getNodeSize(radius, radiusMax),
  }
}

function getNodePosition (radius, nodeList) {
  let angle = Math.random() * 2 * Math.PI

  let x = (Math.sqrt(radius) * Math.cos(angle)) + 50
  let y = (Math.sqrt(radius) * Math.sin(angle)) + 50

  for(let i in nodeList) {
    if (Math.abs(nodeList[i].position.x-x) < nodeList[i].size.w &&
        Math.abs(nodeList[i].position.y-y) < nodeList[i].size.h) {
          x = null
          y = null
    }
  }
  return {
    x: x,
    y: y
  }
}

function getNodeSize (radius, radiusMax) {
  let sizeTemp = (radiusMax * radiusMax) / radius
  let size = (sizeTemp / (Math.random() + 1))
  return {
    w: size,
    h: size
  }
}
