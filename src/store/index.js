import Vue from 'vue'
import Vuex from 'vuex'

import generator from './generator.js'
import user from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    generator,
    user
  }
})

export default store
