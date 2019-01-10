import Vue from 'vue'
import Vuex from 'vuex'
import gridGenerator from './generators/gridGenerator.js'
import dataTransform from './generators/dataTransform.js'
import { PROJECT_STATES, GENERATOR_TYPES, DIRECTIONS, TEMPLATES, ANIMATION_MODE } from './cfg/constants.js'
import { PRESETS } from './cfg/presets'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    generatorType: GENERATOR_TYPES.GRID,
    templateName: TEMPLATES.DECENT,
    gridSize: {x: 4, y: 4},
    imageUrl: null,
    imageRes: 2,
    distance: 20,
    direction: DIRECTIONS.DIAGONAL,
    radius: 8,
    grid: [],
    transformedData: null,
    loop: false,
    paintNum: 5,
    animationMode: ANIMATION_MODE.BASIC,
    animationMax: 100,
    animationMin: 0,
    animationPaint: 0,
    frameRate: 3,
    opacityLimit: 150,
    lightnessLimit: 220,
    color: '#000000',
    zoomValue: 2,
    projectName: 'Decent',
    fileFormat: 'png',
    alphaExport: true,
    fontSize: 36,
    labelName : 'DECENT.',
    subLabel: 'labs',
    labelPosition: 'top',
    labelSize: 0,
    showSubLabel: true,
    subLabelSize: 'small',
    translateXLabel: 0,
    translateYLabel: 0,
    translateXSubLabel: 0,
    translateYSubLabel: 0
  },
  getters: {
    getFontSize (state) {
      let label = (state.fontSize + state.labelSize) * state.zoomValue
      let subLabel = state.subLabelSize === 'small' ? label / 2.2 : label
      console.log(label, subLabel, 'l');
      return {
        label: label,
        sublabel: subLabel
      }
    },
    getGeneratorType(state) {
      return state.generatorType
    },
    getTransformedData(state) {
      return state.transformedData
    },
    getProjectStates () {
      return PROJECT_STATES
    },
    getZoomValue (state) {
      return state.zoomValue
    }
  },
  mutations: {
    updateTranslateXLabel (state, value) {
      state.translateXLabel = value
    },
    updateTranslateYLabel (state, value) {
      state.translateYLabel = value
    },
    updateTranslateXSubLabel (state, value) {
      state.translateXSubLabel = value
    },
    updateTranslateYSubLabel (state, value) {
      state.translateYSubLabel = value
    },
    updateShowSubLabel (state, value) {
      state.showSubLabel = value
    },
    updateSubLabelSize (state, value) {
      state.subLabelSize = value
    },
    updateLabelSize (state, value) {
      state.labelSize = value
    },
    updateLabelPosition (state, value) {
      state.labelPosition = value
    },
    updateLabelName (state, value) {
      state.labelName = value
    },
    updateSubLabel (state, value) {
      state.subLabel = value
    },
    updateAlphaExport (state, value) {
      state.alphaExport = value
    },
    updateProjectName (state, value) {
      state.projectName = value
    },
    updateFileFormat (state, value) {
      state.fileFormat = value
    },
    updateZoomValue (state, value) {
      if (value === 'zoomIn') {
        state.zoomValue = state.zoomValue * 1.5
      } else {
        state.zoomValue = state.zoomValue * 0.75
      }
    },
    updateColor (state, value) {
      state.color = value
    },
    updateAnimationPaint(state, mode) {
      if (mode === ANIMATION_MODE.BASIC) {
        state.animationPaint = state.paintNum
      }
      if (mode === ANIMATION_MODE.INCREMENT) {
        state.animationPaint += 10
      }
      if (mode === ANIMATION_MODE.DECREMENT) {
        state.animationPaint -= 10
      }
    },
    updateAnimationMode(state, value) {
      state.animationMode = value

      if (state.animationMode === 'basic') {
        state.animationPaint = state.paintNum
      } else if (state.animationMode === 'increment') {
        state.animationPaint = state.animationMin === 0 ? 0 : (state.animationMin/100) * (state.transformedData['1'].length-1)
      } else if (state.animationMode === 'decrement') {
        state.animationPaint = state.animationMax === 0 ? 0 : (state.animationMax/100) * (state.transformedData['1'].length-1)
      }
    },
    updateGeneratorType (state, value) {
      if (state.generatorType !== value) {
        state.generatorType = value
      }
    },
    updateLoop (state, value) {
      state.loop = value
    },
    updateTemplateName (state, value) {
      state.templateName = value
    },
    updateImageUrl (state, value) {
      state.imageUrl = value
    },
    updateLightnessLimit (state, value) {
      state.lightnessLimit = value
    },
    updateOpacityLimit (state, value) {
      state.opacityLimit = value
    },
    updateGridSize (state, value) {
      if (value.x) {
        state.gridSize.x = value.x
      }
      if (value.y) {
        state.gridSize.y = value.y
      }
    },
    updateImageRes (state, value) {
      state.imageRes = value
    },
    updateDistance (state, value) {
      state.distance = value
    },
    updateDirection (state, value) {
      state.direction = value
    },
    updateRadius (state, value) {
      state.radius = value
    },
    updatePaintNum (state, value) {
      state.paintNum = value
    },
    updateGrid (state, value) {
      state.grid = value
    },
    updateTransformedData (state, value) {
      state.transformedData = value
    }
  },
  actions: {
    setPreset (context) {
      let preset = PRESETS[context.state.generatorType]
      if (preset) {
        Object.keys(preset).forEach((key) => {
          context.state[key] = preset[key]
        })
        context.dispatch('generateGrid')
      }
    },
    generateGrid(context) {
      console.log('GENERATE');
      let generatorType = context.state.generatorType

      if (generatorType === 'image') {
        context.commit('updateGrid', [])
        context.dispatch('transformData')

        gridGenerator.imageGrid(
          context.state.imageUrl,
          context.state.imageRes,
          context.state.opacityLimit,
          context.state.lightnessLimit).then((res) => {
            context.commit('updateGrid', res)
            context.dispatch('transformData')
          })
      } else {
        let grid = []

        if (generatorType === 'grid') {
          grid = gridGenerator.simpleGrid(context.state.gridSize.x, context.state.gridSize.y)
        } else if (generatorType === 'template') {
          grid = gridGenerator.templateGrid(context.state.templateName)
        } else if (generatorType === 'logo') {
          grid = gridGenerator.logoGrid()
        }

        context.commit('updateGrid', grid)
        context.dispatch('transformData')
      }
    },
    transformData(context) {
      console.log('TRANSFORM');
      context.commit('updateAnimationPaint', context.state.animationMode)

      let transformedData = dataTransform(
        context.state.grid,
        context.state.animationPaint,
        context.state.radius,
        context.state.direction,
        context.state.generatorType === 'logo'
      )

      context.commit('updateTransformedData', transformedData)
    }
  }
})
