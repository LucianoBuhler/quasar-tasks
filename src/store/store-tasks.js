import { uid, Notify } from 'quasar'
import { 
  firebaseDb, 
  firebaseAuth, 
  ref, 
  get, 
  set,
  update,
  remove,
  onValue, 
  onChildAdded, 
  onChildChanged, 
  onChildRemoved 
} from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  tasks: {
    // 'ID1': {
    //   name: 'Go to shop',
    //   completed: false,
    //   dueDate: '2020/03/09',
    //   dueTime: '10:00'
    // },
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
    console.log('Store - mutation - deleteTask - state.tasks: ', JSON.stringify(state.tasks));
    delete state.tasks[id] // Vue 3
  },
  addTask(state, payload) {
    console.log('Store - mutation - addTask - payload: ', payload);
    state.tasks[payload.id] = payload.task // Vue 3
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
    let userTasks = ref(firebaseDb, 'tasks/' + userId) 
    console.log("userTasks: ", userTasks);
    
    // initial check for data
    get(userTasks).then((snapshot) => {
      console.log("snapshot: ", snapshot);
      
      commit('setTasksDownloaded', true)
    })
     .catch((error) => {
      console.log('error: ', error.message);
      showErrorMessage(error.message)
      this.$router.replace('/auth')
    })

    // child added
    onChildAdded(userTasks, (snapshot) => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        task: task
      }

      commit('addTask', payload)
    })

    // child changed
    onChildChanged(userTasks, (snapshot) => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }

      commit('updateTask', payload)
    })

    // child deleted
    onChildRemoved(userTasks, (snapshot) => {
      let taskId = snapshot.key

      commit('deleteTask', taskId)
    })
  },
  fbAddTask({}, payload) {
    const userId = firebaseAuth.currentUser.uid
    let taskRef = ref(firebaseDb, 'tasks/' + userId + '/' + payload.id)
    set(taskRef, payload.task)
    .then(() => {
      Notify.create('Task added!')
    })
    .catch((error)  => {
      console.log('error: ', error.message);
      showErrorMessage(error.message)
    })
  },
  fbUpdateTask({}, payload) {
    const userId = firebaseAuth.currentUser.uid
    let taskRef = ref(firebaseDb, 'tasks/' + userId + '/' + payload.id)
    update(taskRef, payload.updates)
    .then(() => {
      const keys = Object.keys(payload.updates)
      if (!(keys.includes('completed') && keys.length == 1)){
        Notify.create('Task updated!')
      }
    })
    .catch((error) => {
      console.log('error: ', error.message);
      showErrorMessage(error.message)
    })
  },
  fbDeleteTask({}, taskId) {
    const userId = firebaseAuth.currentUser.uid
    let taskRef = ref(firebaseDb, 'tasks/' + userId + '/' + taskId)
    remove(taskRef)
    .then(() => {
      Notify.create('Task deleted!')
    }).
    catch((error) => {
      console.log('error: ', error.message);
      showErrorMessage(error.message)
    })
  }
}

const getters = {
  taskSorted: (state) => {
    let tasksSorted = {},
        keysOrdered = Object.keys(state.tasks)

      keysOrdered.sort((a, b) => {
        let taskAProp = state.tasks[a][state.sort].toLowerCase(),
            taskBProp = state.tasks[b][state.sort].toLowerCase()

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