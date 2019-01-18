import firebase from 'firebase'
import { db } from './../main.js'

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
    errors: [],
    projectList: null,
    selectedProject: null,
    canWrite: false
  },
  actions: {
    login (context) {
      const provider = new firebase.auth.GoogleAuthProvider()
      let user = localStorage.getItem('user')
      let token = localStorage.getItem('token')
      if (!user && !token) {
        firebase.auth().signInWithPopup(provider).then(function(result) {
          context.state.token = result.credential.accessToken
          context.state.user = result.user
          localStorage.setItem('user', JSON.stringify(result.user))
          localStorage.setItem('token', JSON.stringify(result.credential.accessToken))
          context.dispatch('getProjectList')
        }).catch(function(error) {
          context.state.errors.push(error)
        })
      } else {
        context.state.token = JSON.parse(token)
        context.state.user = JSON.parse(user)
      }
      context.dispatch('userCanWrite')
    },
    logout (context) {
      firebase.auth().signOut().then(() => {
        localStorage.clear()
        context.state.token = null
        context.state.user = null
        context.state.canWrite = false
      })
    },
    saveProject (context, projectName) {
      if (context.state.user && context.state.canWrite) {
        let data = JSON.stringify(context.rootState.generator)
        db.ref(`projects/${projectName}`).set({
          data: data
        }).then(() => {
          context.dispatch('getProjectList')
        }, (error) => {
          context.state.errors.push(error)
        })
      }
    },
    userCanWrite (context) {
      db.ref('users').once('value').then((res) => {
        let users = res.val()
        let valid = Object.keys(users).find((id) => {
          return context.state.user.uid === id
        })
        if (valid && users[valid].canWrite ) {
          context.state.user.canWrite = true
        } else {
          context.state.user.canWrite = false
        }
      }, (error) => {
        context.state.errors.push(error)
      })
    },
    getProjectList (context) {
      db.ref('projects').once('value').then((res) => {
        context.state.projectList = res.val()
      }, (error) => {
        context.state.errors.push(error)
      })
    },
    selectProject (context, val) {
      context.state.selectedProject = val
      context.rootState.generator = JSON.parse(context.state.projectList[val].data)
    }
  }
}
