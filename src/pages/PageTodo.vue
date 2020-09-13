<template>
  <q-page class="q-pa-md">
    
    <!-- Todo Tasks -->
    <tasks-todo
      v-if="Object.keys(tasksTodo).length"
      :tasksTodo="tasksTodo"
    ></tasks-todo>

    <!-- No Todo Tasks -->
    <no-tasks
      v-else
      @showAddTask="showAddTaskDialog = true"
    />

    <!-- Completed Tasks -->
    <tasks-completed
      v-if="Object.keys(tasksCompleted).length"
      :tasksCompleted="tasksCompleted"  
    ></tasks-completed>

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTaskDialog = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog v-model="showAddTaskDialog">
      <add-task @close="showAddTaskDialog = false" />
    </q-dialog>
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        showAddTaskDialog: false
      }
    },
    computed: {
      ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted'])
    },
    mounted() {
      // listen for an event
      this.$root.$on('showAddTask', () => {
        this.showAddTaskDialog = true
      })

    },
    components: {
      'add-task': require('components/Tasks/Modals/AddTask.vue').default,
      'tasks-todo': () => import('components/Tasks/TasksTodo.vue'),
      'tasks-completed': () => import('components/Tasks/TasksCompleted.vue'),
      'no-tasks': () => import('components/Tasks/NoTasks.vue'),
    }
  }
</script>

