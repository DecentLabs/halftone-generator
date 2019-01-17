import firebase from 'firebase'
import { db } from './../main.js'

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
    errors: [],
    projectList: null,
    selectedProject: null
  },
  getters: {
    isLoggedIn (state) {
      return state.user
    }
  },
  actions: {
    login (context) {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function(result) {
        context.state.auth.token = result.credential.accessToken;
        context.state.auth.user = result.user;
      }).catch(function(error) {
        console.error(error)
        context.state.errors.push(error)
      });
    },
    saveProject (context, projectName) {
      let data = JSON.stringify(context.rootState.generator)
      db.ref(`projects/${projectName}`).set({
        data: data
      }).then(() => {
        context.dispatch('getProjectList')
      })
    },
    getProjectList (context) {
      db.ref('projects').once('value').then((res) => {
        context.state.projectList = res.val()
      })
    },
    selectProject (context, val) {
      context.state.selectedProject = val
      context.rootState.generator = JSON.parse(context.state.projectList[val].data)
    }
  }
}
