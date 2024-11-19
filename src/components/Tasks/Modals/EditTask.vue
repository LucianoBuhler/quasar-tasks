<template>
  <q-card>
    
    <modal-header>Edit Task</modal-header>

    <q-form
      @submit.prevent="submitForm"
      class="q-gutter-md"
    >
      
      <div>
        <q-card-section class="q-pt-none">
         
         <modal-task-name
           v-model:name="taskToSubmit.name"
           ref="modalTaskName"
         />

          <modal-due-date
            v-model:dueDate="taskToSubmit.dueDate"
            @clear="clearDueDate"
          />

          <modal-due-time 
            v-if="taskToSubmit.dueDate"
            v-model:dueTime="taskToSubmit.dueTime"
          />

        </q-card-section>

        <modal-buttons />
      </div>
    </q-form>
    
  </q-card>
</template>

<script>
  import { mapActions } from 'vuex'
  import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'

  export default {
    mixins: [mixinAddEditTask],
    props: ['task', 'id'],
    data() {
      return {
        taskToSubmit: {}
      }
    },
    methods: {
      ...mapActions('tasks', ['updateTask']),
      submitTask() {
        console.log('EditTask - submitTask');
        this.updateTask({
          id: this.id,
          updates: this.taskToSubmit
        })
        this.$emit('close')
      }
    },
    mounted() {
      this.taskToSubmit = Object.assign({}, this.task)
    }
  }
</script>

<style lang="scss" scoped>

</style>