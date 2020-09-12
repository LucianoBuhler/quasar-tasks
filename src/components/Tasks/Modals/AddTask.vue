<template>
  <q-card>
    
    <modal-header>Add Task</modal-header>

    <!-- <q-form
      @submit.prevent="submitForm"
      class="q-gutter-md"
      ref="taskForm"
    > -->
    <q-form
      @submit.prevent="submitForm"
      class="q-gutter-md"
    >
      
      <div>
        <q-card-section class="q-pt-none">
         
         <modal-task-name
           :name.sync="taskToSubmit.name"
           ref="modalTaskName"
         />

          <modal-due-date
            :dueDate.sync="taskToSubmit.dueDate"
            @clear="clearDueDate"
          />

          <modal-due-time 
            v-if="taskToSubmit.dueDate"
            :dueTime.sync="taskToSubmit.dueTime"
          />

        </q-card-section>

        <modal-buttons />

        <!-- <pre>{{ taskToSubmit }}</pre> -->
        <!-- <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
      </div>
    </q-form>
    
  </q-card>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        taskToSubmit: {
          name: '',
          dueDate: '',
          dueTime: '',
          completed: false
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['addTask']),
      submitForm() {
        console.log('AddTask - Submit form');
        // this.$refs.taskForm.validate()
        this.$refs.modalTaskName.$refs.name.validate()
        console.log(this.$refs.taskForm);

        // if(!this.$refs.taskForm.hasError) {
        if(!this.$refs.modalTaskName.$refs.name.hasError) {
          this.submitTask()
        }
      },
      submitTask() {
        console.log('AddTask - submitTask');
        this.addTask(this.taskToSubmit)
        this.$emit('close')
      },
      clearDueDate(){
        this.taskToSubmit.dueDate = ''
        this.taskToSubmit.dueTime = ''
      }
    },
    components: {
      'modal-header': require('components/Tasks/Modals/Shared/ModalHeader.vue').default,
      'modal-task-name': require('components/Tasks/Modals/Shared/ModalTaskName.vue').default,
      'modal-due-date': require('components/Tasks/Modals/Shared/ModalDueDate.vue').default,
      'modal-due-time': require('components/Tasks/Modals/Shared/ModalDueTime.vue').default,
      'modal-buttons': require('components/Tasks/Modals/Shared/ModalButtons.vue').default
    }
  }
</script>

<style lang="scss" scoped>

</style>