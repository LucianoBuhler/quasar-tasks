<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="q-pa-md">
    <q-list 
      v-if="Object.keys(tasks).length"
      separator
      bordered
    >

      <task
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :id="key"
      />

    </q-list>

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
      <add-task @close="showAddTaskDialog = false" />>
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
      ...mapGetters('tasks', ['tasks'])
    },
    components: {
      'task': require('components/Tasks/Task.vue').default,
      'add-task': require('components/Tasks/Modals/AddTask.vue').default
    }
  }
</script>

