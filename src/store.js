import Vue from 'vue'
import Vuex from 'vuex'
import gridGenerator from './generators/gridGenerator.js'
import dataTransform from './generators/dataTransform.js'

Vue.use(Vuex)

const GENERATOR_TYPES = {
  GRID: 'grid',
  IMAGE: 'image',
  TEMPLATE: 'template'
}

const DIRECTIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  DIAGONAL: 'diagonal'
}

const TEMPLATES = {
  BEER: 'beer'
}

const ANIMATION_MODE = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  BASIC: 'basic'
}

export default new Vuex.Store({
  state: {
    generatorType: GENERATOR_TYPES.IMAGE,
    templateName: TEMPLATES.BEER,
    gridSize: {x: 5, y: 5},
    imageUrl: './assets/heart2.png',
    imageRes: 2,
    distance: 6,
    direction: DIRECTIONS.DIAGONAL,
    radius: 3,
    grid: [],
    transformedData: null,
    loop: false,
    update: false,
    paintNum: 150,
    animationMode: ANIMATION_MODE.DECREMENT,
    animationMax: 100,
    animationMin: 0,
    animationPaint: 0
  },
  getters: {
    getGeneratorType(state) {
      return state.generatorType
    },
    getTransformedData(state) {
      return state.transformedData
    }
  },
  mutations: {
    updateAnimationPaint(state, mode) {
      if (mode === ANIMATION_MODE.INCREMENT) {
        state.animationPaint += 10
      }
      if (mode === ANIMATION_MODE.DECREMENT) {
        state.animationPaint -= 10
      }
    },
    updateAnimationMode(state, value) {
      console.log('update');
      state.animationMode = value

      if (state.animationMode === 'basic') {
        state.animationPaint = state.paintNum
      } else if (state.animationMode === 'increment') {
        state.animationPaint = state.animationMin === 0 ? 0 : (state.animationMin/100) * (state.transformedData['1'].length-1)
      } else if (state.animationMode === 'decrement') {
        state.animationPaint = state.animationMax === 0 ? 0 : (state.animationMax/100) * (state.transformedData['1'].length-1)
      }
    },
    redraw(state) {
      state.update = true
    },
    updateGeneratorType (state, value) {
      state.generatorType = value
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
    generateGrid(context) {
      let generatorType = context.state.generatorType

      if (generatorType === 'image') {
        gridGenerator.imageGrid(context.state.imageUrl, context.state.imageRes).then((res) => {
          context.commit('updateGrid', res)
          context.commit('redraw')
        })
      } else {
        let grid = []

        if (generatorType === 'grid') {
          grid = gridGenerator.simpleGrid(context.state.gridSize.x, context.state.gridSize.y)
        } else if (generatorType === 'template') {
          grid = gridGenerator.templateGrid(context.state.templateName)
        }

        context.commit('updateGrid', grid)
        context.commit('redraw')
      }
    },
    transformData(context) {
      context.state.update = false

      let transformedData = dataTransform(
        context.state.grid,
        context.state.animationPaint,
        context.state.radius,
        context.state.direction
      )
      context.commit('updateAnimationPaint', context.state.animationMode)
      context.commit('updateTransformedData', transformedData)
    }
  }
})
