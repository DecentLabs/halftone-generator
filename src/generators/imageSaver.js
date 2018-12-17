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

  let canvasList = document.querySelectorAll('canvas')

  canvasList.forEach((canvas, index) => {
    promises1.push(new Promise(function(resolve, reject) {
      canvas.toBlob(function(blob) {
        let url = URL.createObjectURL(blob);
        resolve(url)
      })
    }))
  })

  Promise.all(promises1).then(function(urls) {
    urls.forEach((url, index) => {
      Object.keys(imageSizes).forEach((size) => {
        promises2.push(new Promise(function(resolve, reject) {
          let img = new Image()
          img.src = url

          let copy = document.createElement('canvas')
          copy.width = imageSizes[size].x
          copy.height = imageSizes[size].y
          let ctx = copy.getContext('2d')

          img.onload = function() {
            ctx.drawImage(this, 0, 0, imageSizes[size].x, imageSizes[size].y)
            copy.toBlob((blob) => {
              resolve({
                name: `${size}_${index}.png`,
                data: blob
              })
            })
          }
        }))
      })
    })

    Promise.all(promises2).then(function (values) {
      console.log(values, 'vals');
      let imageFolder = zip.folder('logos');
      values.forEach((val) => {
        imageFolder.file(val.name, val.data);
      })
      zip.generateAsync({type: 'blob'}).then(function(content) {
        console.log(content, 'content');
        saveAs(content, `${name}.zip`);
      })
    })
  })
}

export default imageSaver
