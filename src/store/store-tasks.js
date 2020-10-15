import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'

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
    //   dueTime: '15:45'
    // },
    // 'ID3': {
    //   name: 'Get apples',
    //   completed: false,
    //   dueDate: '2020/03/11',
    //   dueTime: '18:30'
    // }
  },
  search: '',
  sort: 'name',
  tasksDownloaded: false
}

// just change state
const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates )
  },
  deleteTask(state, id) {
    console.log('Store - mutation - deleteTask - id: ', id);
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    console.log('Store - mutation - addTask - payload: ', payload);
    Vue.set(state.tasks, payload.id, payload.task)
  },
  clearTasks(state) {
    state.tasks = {}
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value
  }
}

// can be async
const actions = {
  updateTask({ dispatch }, payload) {
    dispatch('fbUpdateTask', payload)
  },
  deleteTask( { dispatch }, id) {
    console.log('Store - action - deleteTask - id: ', id);
    dispatch('fbDeleteTask', id)
  },
  addTask({ dispatch }, task) {
    let taskId = uid()

    let payload = {
      id: taskId,
      task: task
    }

    dispatch('fbAddTask', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    commit('setSort', value)
  },
  fbReadData({ commit }) {
    const userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref('tasks/' + userId)

    // initial check for data
    userTasks.once('value', snapshot => {
      commit('setTasksDownloaded', true)
    }, error => {
      console.log('error.message: ', error.message);
    })

    // child added
    userTasks.on('child_added', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        task: task
      }

      commit('addTask', payload)
    })

    // child changed
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }

      commit('updateTask', payload)
    })

    // child deleted
    userTasks.on('child_removed', snapshot => {
      let taskId = snapshot.key

      commit('deleteTask', taskId)
    })
  },
  fbAddTask({}, payload) {
    const userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.set(payload.task)
  },
  fbUpdateTask({}, payload) {
    const userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.update(payload.updates)
  },
  fbDeleteTask({}, taskId) {
    const userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId)
    taskRef.remove()
  }

}

const getters = {
  taskSorted: (state) => {
    let tasksSorted = {},
        keysOrdered = Object.keys(state.tasks)

      keysOrdered.sort((a, b) => {
        let taskAProp = state.tasks[a].[state.sort].toLowerCase(),
            taskBProp = state.tasks[b].[state.sort].toLowerCase()

        if (taskAProp > taskBProp) return 1
        else if (taskAProp < taskBProp) return -1
        else return 0
      })
      
      keysOrdered.forEach((key) => {
        tasksSorted[key] = state.tasks[key]
      })

    return tasksSorted
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.taskSorted,
        tasksFiltered = {}

    if (state.search) {
      Object.keys(tasksSorted).forEach((key) => {
        let task = tasksSorted[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()

        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return tasksSorted
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}

    Object.keys(tasksFiltered).forEach((key) => {
      let task = tasksFiltered[key]

      if (!task.completed) {
        tasks[key] = task
      }
    })
    
    return tasks
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}

    Object.keys(tasksFiltered).forEach((key) => {
      let task = tasksFiltered[key]

      if (task.completed) {
        tasks[key] = task
      }
    })
    
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}