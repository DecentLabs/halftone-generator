import Vue from 'vue'
import Vuex from 'vuex'
import generators from './generators'

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

export default new Vuex.Store({
  state: {
    generatorType: GENERATOR_TYPES.GRID,
    templateName: TEMPLATES.BEER,
    gridSize: {x: 10, y: 10},
    imageUrl: './assets/heart2.png',
    imageRes: 10,
    distance: 30,
    direction: DIRECTIONS.DIAGONAL,
    radius: 10,
    paintNum: 10,
    grid: [],
    transformedData: null
  },
  getters: {
    getGeneratorType(state) {
      return state.generatorType
    },
    getSettings(state, getters) {
      if (state.generatorType === GENERATOR_TYPES.GRID) {
        return getters.getGridSettings
      } else if (state.generatorType === GENERATOR_TYPES.IMAGE) {
        return getters.getImageSettings
      } else if (state.generatorType === GENERATOR_TYPES.TEMPLATE) {
        return getters.getTemplateSettings
      }
    },
    getCommonSettings(state) {
      return {
        distance: state.distance,
        direction: state.direction,
        radius: state.radius,
        paintNum: state.paintNum
      }
    },
    getImageSettings(state) {
      return {
        url: state.imageUrl,
        resolution: state.imageRes
      }
    },
    getTemplateSettings(state) {
      return {
        templateName: state.templateName
      }
    },
    getGridSettings(state) {
      return {
        gridSize: state.gridSize
      }
    },
    getGrid(state) {
      return state.grid
    },
    getTransformedData(state) {
      return state.transformedData
    }
  },
  mutations: {
    updateGeneratorType (state, value) {
      state.generatorType = value
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
    transformData (state, value) {
      state.transformedData = value
    }
  },
  actions: {
    generateGrid(context) {
      let grid = generators.gridGenerator(context.getters.getGeneratorType, context.getters.getSettings)
      context.commit('updateGrid', grid)
      let transformedData = generators.dataTransform(grid, context.state.paintNum, context.state.radius)
      context.commit('transformData', transformedData)
    }
  }
})
