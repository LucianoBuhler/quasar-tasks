const state = {
  settings: {
    show12HourTimeFormat: false
  }

}

// just change state
const mutations = {
  setShow12HourTimeFormat(state, value) {
    state.settings.show12HourTimeFormat = value
  },
}

// can be async
const actions = {
  setShow12HourTimeFormat({ commit }, value) {
    commit('setShow12HourTimeFormat', value)
  }
}

const getters = {
  settings: state => {
    return state.settings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}