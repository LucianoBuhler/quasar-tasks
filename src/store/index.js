import tasks from './store-tasks'
import settings from './store-settings'
import auth from './store-auth'

import { createStore } from 'vuex'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      tasks,
      settings,
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}