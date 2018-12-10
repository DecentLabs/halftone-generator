import TEMPLATES from './../templates'

function gridGenerator (generatorType, settings) {

  this.grid = []

  if (generatorType === 'grid') {
    this.grid = simpleGrid(settings.gridSize.x, settings.gridSize.y)
  } else if (generatorType === 'template') {
    this.grid = templateGrid(settings.templateName)
  } else if (generatorType === 'image') {
    this.grid = imageGrid(settings.imageUrl, settings.imageRes)
  }

  return this.grid
}


function imageGrid (url, res) {
  return []
}

function templateGrid (name) {
  return TEMPLATES[name]
}

function simpleGrid (sizeX, sizeY) {
  let grid = []
  for (let y = 0; y < sizeY; y++) {
    let newLine = []
    let evenY = y % 2 === 0
    for (let x = 0; x < sizeX; x++) {
      let point
      if (evenY) {
        point = x % 2 === 0 ? 1 : 0
      } else {
        point = x % 2 === 0 ? 0 : 1
      }
      newLine.push(point)
    }
    grid.push(newLine)
  }
  return grid
}

export default gridGenerator
