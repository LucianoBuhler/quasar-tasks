import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn(state, value){
    state.loggedIn = value
  }
}

const actions = {
  // registerUser({}, payload) {
  //   console.log('register user payload: ', payload);
  //   Loading.show()

  //   firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
  //   .then(response => {
  //     console.log('Firebase auth response ', response);
  //   })
  //   .catch(error => {
  //     console.log('Firebase auth error.message: ', error.message);
  //     showErrorMessage(error.message)
  //   })
  // },
  async registerUser({}, payload) {
    console.log('register user payload: ', payload);
    Loading.show()

    try {
      const response = await createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
      console.log('Firebase registration response ', response);
    } catch (error) {
      console.log('Firebase auth error.message: ', error.message);
      showErrorMessage(error.message)
    } finally {
      Loading.hide();
    }

    // firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    // .then(response => {
    //   console.log('Firebase auth response ', response);
    // })
    // .catch(error => {
    // })
  },
  async loginUser({}, payload) {
    Loading.show()

    try {
      const response = await signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password);
      console.log('Firebase login response', response);
    } catch (error) {
      console.log('Firebase login error.message:', error.message);
      showErrorMessage(error.message);
    } finally {
      Loading.hide();
    }
  },
  logoutUser() {
    firebaseAuth.signOut()
      // .then(response => {
      //   console.log('Firebase login response ', response);

      // })
      // .catch(error => {
      //   console.log('Firebase login error.message: ', error.message);
      // })

  },
  handleAuthStateChange({ commit, dispatch }) {
    console.log('handleAuthStateChange');
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()

      console.log("user: ", user)

      if (user) {
        // User is signed in.
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(err => {})
        dispatch('tasks/fbReadData', null, { root: true })
      }
      else {
        // logout
        commit('tasks/clearTasks', null, { root: true})
        commit('tasks/setTasksDownloaded', false, { root: true})
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth').catch(err => { })
      }
    });

  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}