import JSZip from 'jszip'
import saveAs from 'file-saver';
import Store from './../store.js'
import preview from './../components/preview.vue'
import Vue from 'vue'
import { PROJECT_STATES } from './../cfg/constants.js'
import { imageSizes } from './../cfg/constants.js'

// TODO refactor
function imageSaver(name = 'decent') {
  let promises1 = []
  let promises2 = []

  const zip = new JSZip();
  let folder = zip.folder('decent_generator')
  let canvasList = createCanvasList()

  canvasList.forEach((canvas, index) => {
    let canvasName = canvas.getAttribute('name')
    let aspect = canvas.width / canvas.height

    promises1.push(new Promise(function(resolve, reject) {
      canvas.toBlob(function(blob) {
        let url = URL.createObjectURL(blob);
        resolve({
          url: url,
          canvasName: canvasName,
          aspect: aspect
        })
      })
    }))
  })

  Promise.all(promises1).then(function(canvasData) {
    canvasData.forEach((canvasData, index) => {
      Object.keys(imageSizes).forEach((size) => {
        promises2.push(new Promise(function(resolve, reject) {
          let img = new Image()
          img.src = canvasData.url

          let width = imageSizes[size].x * canvasData.aspect
          let height = imageSizes[size].y
          let copy = document.createElement('canvas')

          copy.width = width
          copy.height = height
          let ctx = copy.getContext('2d')

          img.onload = function() {
            ctx.drawImage(this, 0, 0, width, height)
            copy.toBlob((blob) => {
              resolve({
                name: `${canvasData.canvasName}/${canvasData.canvasName}_${size}_${index}.png`,
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

function createCanvasList () {
  let generatorType = Store.state.generatorType
  let canvasList = []

  let data = generatorType === 'logo' ? PROJECT_STATES : { generatorType }

  Object.keys(data).forEach((c) => {
    console.log(data, 'data');
    let comp = getComponent(`${generatorType}_${c}`, data[c])
    canvasList.push(comp.canvas.canvas)
    comp.$destroy()
  })

  return canvasList

  function getComponent(name, project) {
    let vm = new Vue({
      ...preview,
      propsData: {
        exportZoom: 10,
        name: name,
        project: project
      },
      store: Store
    }).$mount()

    return vm
  }
}

export default imageSaver
