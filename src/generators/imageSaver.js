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
  let canvasList = []

  let result = createCanvasList()
  let compList = result.compList
  let canvasPromises = result.promises

  Promise.all(canvasPromises).then((canvases) => {
    let exportSizes = Object.keys(IMAGE_SIZES).filter(defSize =>
      options.exportSizes[defSize]).map(selected =>
      IMAGE_SIZES[selected])

    canvases.forEach((c, index) => {
      let canvas = c.canvas
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

    compList.forEach((comp) => {
      comp.$destroy()
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
              ctx.fillStyle = 'rgba(0, 0, 0, 0)'
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
  })
}

function createCanvasList () {
  let generatorType = Store.state.generatorType
  let compList = []
  let data = generatorType === 'logo' ? Object.keys(PROJECT_STATES) : [ generatorType] // TODO refact

  let promises = []

  const createComp = (name, transparent, data) => {
    let comp = getComponent(name, data, transparent)
    compList.push(comp)
    promises.push(comp.drawed)
  }

  data.forEach((c) => {
    let name = generatorType === 'logo' ? `${generatorType}_${c}` : c
    createComp(name, false, data[c])
    if (Store.state.alphaExport) {
      createComp(`${name}_alpha`, true, data[c])
    }
  })

  return {
    compList: compList,
    promises: promises
  }

  function getComponent(name, project, transparent) {
    return new Vue({
      ...preview,
      propsData: {
        exportZoom: 10,
        name: name,
        project: project,
        transparent: transparent
      },
      store: Store
    }).$mount()
  }
}

export default imageSaver
