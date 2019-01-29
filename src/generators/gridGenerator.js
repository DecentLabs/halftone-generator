import TEMPLATES from './../templates'

function templateGrid (name) {
  console.log(name, 2);
  return TEMPLATES[name]
}

function logoGrid () {
  return simpleGrid(4, 4)
}

function simpleGrid (sizeX, sizeY) {
  let grid = []
  sizeX = sizeX*2-1
  sizeY = sizeY*2-1
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

function imageGrid (url, resolution, opacityLimit, lignessLimit) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url

    image.onload = function() {
      let canvas = document.createElement('canvas')
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight

      const ctx = canvas.getContext('2d')
      ctx.drawImage(this, 0, 0)

      let grid = []
      let counter = 0

      for (let i = 0; i < this.height; i += resolution) {
        let line = []
        counter += 1
        for (let j = 0; j < this.width; j += resolution) {
          let resolutionX = resolution
          let resolutionY = resolution

          if (j + resolution > this.width) {
            resolutionX = resolution - ((j+resolution) - this.width)
          }
          if (i + resolutionY > this.height) {
            resolutionY = resolution - ((i+resolution) - this.height)
          }

          let imageData = ctx.getImageData(j, i, resolutionX, resolutionY)
          let colorResult = extractColorFromImage(imageData)

          if (colorResult.opacity < opacityLimit) {
            line.push(0)
          } else {
            if (colorResult.color < lignessLimit) {
              line.push(1)
            } else {
              line.push(0)
            }
          }
        }

        let even = counter % 2 === 0
        let tLine = edgeDetection(line, even)

        grid.push(tLine)
      }
      return resolve(grid)
    }
  })
}

function edgeDetection (line, yEven) {
  let newLine = []

  for (let i = 0; i<line.length; i++) {

    if (line[i] === 1) {
      let first = line[i] > line[i-1]
      let last = line[i] > line[i+1]
      let xEven = i % 2 === 0

      if ((xEven && yEven) || (!xEven && !yEven)) {
        if (first || last) {
          newLine.push(2)
        } else {
          newLine.push(1)
        }
      } else {
        newLine.push(0)
      }
    } else {
      newLine.push(line[i])
    }
  }
  return newLine
}

function extractColorFromImage (imageData) {
  if (imageData.data && imageData.data.length) {
    const d = imageData.data
    const q = d.length/4
    let color = 0
    let opacity = 0

    for (let i=0; i<d.length; i+=4) {
      color += d[i] + d[i+1] + d[i+2]
      opacity += d[i+3]
    }

    return {
      color: color / (q*3),
      opacity: opacity / q
    }
  }
  else {
    return { color: 255, opacity: 0 }
  }
}

export default {
  imageGrid,
  templateGrid,
  simpleGrid,
  logoGrid
}
