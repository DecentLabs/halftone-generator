import JSZip from 'jszip'
import saveAs from 'file-saver';

const imageSizes = {
  thumbnail: {
    x: 50,
    y: 50
  },
  medium: {
    x: 500,
    y: 500
  },
  large: {
    x: 1000,
    y: 1000
  }
}

// TODO refactor
function imageSaver(name = 'decent') {
  let promises1 = []
  let promises2 = []

  const zip = new JSZip();
  let folder = zip.folder('decent_generator')

  let canvasList = document.querySelectorAll('canvas')

  canvasList.forEach((canvas, index) => {
    let canvasName = canvas.getAttribute('name')
    promises1.push(new Promise(function(resolve, reject) {
      canvas.toBlob(function(blob) {
        let url = URL.createObjectURL(blob);
        resolve({url: url, canvas: canvasName})
      })
    }))
  })

  Promise.all(promises1).then(function(canvasData) {
    canvasData.forEach((canvasData, index) => {
      Object.keys(imageSizes).forEach((size) => {
        promises2.push(new Promise(function(resolve, reject) {
          let img = new Image()
          img.src = canvasData.url

          let copy = document.createElement('canvas')
          copy.width = imageSizes[size].x
          copy.height = imageSizes[size].y
          let ctx = copy.getContext('2d')

          img.onload = function() {
            ctx.drawImage(this, 0, 0, imageSizes[size].x, imageSizes[size].y)
            copy.toBlob((blob) => {
              resolve({
                name: `${canvasData.canvas}/${canvasData.canvas}_${size}_${index}.png`,
                data: blob
              })
            })
          }
        }))
      })
    })

    Promise.all(promises2).then(function (values) {
      values.forEach((val) => {
        folder.file(val.name, val.data);
      })
      zip.generateAsync({type: 'blob'}).then(function(content) {
        saveAs(content, `${name}.zip`);
      })
    })
  })
}

export default imageSaver
