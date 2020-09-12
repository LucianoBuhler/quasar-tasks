import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  tasks: {
    // 'ID1': {
    //   name: 'Go to shop',
    //   completed: false,
    //   dueDate: '2020/03/09',
    //   dueTime: '10:00'
    // },
    // 'ID2': {
    //   name: 'Get bananas',
    //   completed: false,
    //   dueDate: '2020/03/10',
    //   dueTime: '15300'
    // },
    // 'ID3': {
    //   name: 'Get apples',
    //   completed: false,
    //   dueDate: '2020/03/11',
    //   dueTime: '18:30'
    // },
    // 'ID4': {
    //   name: 'Get oranges',
    //   completed: false,
    //   dueDate: '2020/03/12',
    //   dueTime: '20:30'
    // }
  }
}

// just change state
const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates )
  },
  deleteTask(state, id){
    console.log('Store - mutation - deleteTask - id: ', id);
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    console.log('Store - mutation - addTask - payload: ', payload);
    Vue.set(state.tasks, payload.id, payload.task)
  }
}

// can be async
const actions = {
  updateTask({ commit }, payload) {
    commit('updateTask', payload)
  },
  deleteTask( { commit }, id) {
    console.log('Store - action - deleteTask - id: ', id);
    commit('deleteTask', id)
  },
  addTask({ commit }, task) {
    let taskId = uid()

    let payload = {
      id: taskId,
      task: task
    }

    commit('addTask', payload)
  }
}

const getters = {
  tasks: (state) => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}