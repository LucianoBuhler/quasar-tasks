import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  tasks: {
    'ID1': {
      name: 'Go to shop',
      completed: false,
      dueDate: '2020/03/09',
      dueTime: '10:00'
    },
    'ID2': {
      name: 'Get bananas',
      completed: false,
      dueDate: '2020/03/10',
      dueTime: '15:45'
    },
    'ID3': {
      name: 'Get apples',
      completed: false,
      dueDate: '2020/03/11',
      dueTime: '18:30'
    },
    'ID4': {
      name: 'Get oranges',
      completed: false,
      dueDate: '2020/03/12',
      dueTime: '20:30'
    },
    'ID5': {
      name: 'Get bananas',
      completed: false,
      dueDate: '2020/03/10',
      dueTime: '15:45'
    },
    'ID6': {
      name: 'Get apples',
      completed: false,
      dueDate: '2020/03/11',
      dueTime: '18:30'
    },
    'ID7': {
      name: 'Get oranges',
      completed: false,
      dueDate: '2020/03/12',
      dueTime: '20:30'
    },
    'ID8': {
      name: 'Get bananas',
      completed: false,
      dueDate: '2020/03/10',
      dueTime: '15:45'
    },
    'ID9': {
      name: 'Get apples',
      completed: false,
      dueDate: '2020/03/11',
      dueTime: '18:30'
    },
    'ID10': {
      name: 'Get oranges',
      completed: false,
      dueDate: '2020/03/12',
      dueTime: '20:30'
    },
    'ID11': {
      name: 'Get bananas',
      completed: false,
      dueDate: '2020/03/10',
      dueTime: '15:45'
    },
    'ID12': {
      name: 'Get apples',
      completed: false,
      dueDate: '2020/03/11',
      dueTime: '18:30'
    },
    'ID13': {
      name: 'Get oranges',
      completed: false,
      dueDate: '2020/03/12',
      dueTime: '20:30'
    }
  },
  search: '',
  sort: 'name'
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
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
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
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    commit('setSort', value)
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