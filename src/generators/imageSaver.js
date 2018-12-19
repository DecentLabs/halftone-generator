import JSZip from 'jszip'
import saveAs from 'file-saver';
import Store from './../store.js'
import preview from './../components/preview.vue'
import Vue from 'vue'
import { PROJECT_STATES, IMAGE_SIZES } from './../cfg/constants.js'

// TODO refact
function imageSaver(options) {
  let promises1 = []
  let promises2 = []

  const zip = new JSZip();
  let folder = zip.folder(Store.state.projectName)
  let canvasList = createCanvasList()
  let exportSizes = Object.keys(IMAGE_SIZES).filter(defSize =>
    options.exportSizes[defSize]).map(selected =>
    IMAGE_SIZES[selected])

  canvasList.forEach((canvas, index) => {
    let canvasName = canvas.getAttribute('name')
    let aspect = canvas.width / canvas.height

    promises1.push(new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        resolve({
          url: url,
          canvasName: canvasName,
          aspect: aspect
        })
      })
    }))
  })

  Promise.all(promises1).then((canvasData) => {
    canvasData.forEach((canvasData, index) => {
      exportSizes.forEach((size) => {
        promises2.push(new Promise((resolve, reject) => {
          let img = new Image()
          img.src = canvasData.url

          let width = Math.round(size * canvasData.aspect)
          let height = size
          let copy = document.createElement('canvas')

          copy.width = width
          copy.height = height
          let ctx = copy.getContext('2d')

          img.onload = function() {
            ctx.drawImage(this, 0, 0, width, height)
            copy.toBlob((blob) => {
              resolve({
                name: `${canvasData.canvasName}/${canvasData.canvasName}_${width}x${height}`,
                data: blob
              })
            })
          }
        }))
      })
    })

    Promise.all(promises2).then((values) => {
      let extension = Store.state.fileFormat
      values.forEach((val) => {
        folder.file(`${val.name}.${extension}`, val.data);
      })
      zip.generateAsync({type: 'blob'}).then((content) => {
        saveAs(content, `decent_generator.zip`);
      })
    })
  })
}

function createCanvasList () {
  let generatorType = Store.state.generatorType
  let canvasList = []

  // TODO refact
  let data = generatorType === 'logo' ? PROJECT_STATES : { generatorType }

  Object.keys(data).forEach((c) => {
    let comp = getComponent(`${generatorType}_${c}`, data[c])
    canvasList.push(comp.canvas.canvas)
    comp.$destroy()
  })

  return canvasList

  function getComponent(name, project) {
    return new Vue({
      ...preview,
      propsData: {
        exportZoom: 10,
        name: name,
        project: project
      },
      store: Store
    }).$mount()
  }
}

export default imageSaver
