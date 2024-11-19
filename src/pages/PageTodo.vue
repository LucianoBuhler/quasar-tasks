<template>
  <q-page>

    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <search />
          <sort />
        </div>

        <p v-if="search 
          && !Object.keys(tasksTodo).length 
          && !Object.keys(tasksCompleted).length"
        >No search Results</p>
        
        <!-- <div class="relative-position"> -->
        <q-scroll-area class="q-scroll-area-tasks">
          <!-- No Todo Tasks -->
          <no-tasks
            v-if="!Object.keys(tasksTodo).length 
              && !search
              && !settings.showTasksInOneList"
            @showAddTask="showAddTaskDialog = true"
          />

          <!-- Todo Tasks -->
          <tasks-todo
            v-if="Object.keys(tasksTodo).length"
            :tasksTodo="tasksTodo"
          ></tasks-todo>

          <!-- Completed Tasks -->
          <tasks-completed
            v-if="Object.keys(tasksCompleted).length"
            :tasksCompleted="tasksCompleted" 
            class="q-mb-xl"
          ></tasks-completed>
        </q-scroll-area>
        

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="showAddTaskDialog = true"
            round
            class="all-pointer-events"
            color="primary"
            size="24px"
            icon="add"
          />
        </div>

      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner-gears
            color="primary"
            size="5em"
          />
        </span>
      </template>

    </div>

    <q-dialog v-model="showAddTaskDialog">
      <add-task @close="showAddTaskDialog = false" />
    </q-dialog>
  </q-page>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { mapGetters, mapState } from 'vuex'
  import eventBus from 'boot/event-bus'
  export default {
    data() {
      return {
        showAddTaskDialog: false
      }
    },
    computed: {
      ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
      ...mapGetters('settings', ['settings']),
      ...mapState('tasks', ['search', 'tasksDownloaded'])
    },
    mounted() {
      // listen for an event
      eventBus.$on('showAddTask', () => {
        this.showAddTaskDialog = true
      })
    },
    components: {
      'add-task': require('components/Tasks/Modals/AddTask.vue').default,
      'search': require('components/Tasks/Tools/Search.vue').default,
      'sort': require('components/Tasks/Tools/Sort.vue').default,
      'tasks-todo': defineAsyncComponent(() => import('components/Tasks/TasksTodo.vue')),
      'tasks-completed': defineAsyncComponent (() => import('components/Tasks/TasksCompleted.vue')),
      'no-tasks': defineAsyncComponent (() => import('components/Tasks/NoTasks.vue'))
    }
  }
</script>

<style lang="scss">
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
  }
  .electron {
    .q-scroll-area-tasks {
      .scroll {
        height: auto !important;
      }
    }
  }
</style>

