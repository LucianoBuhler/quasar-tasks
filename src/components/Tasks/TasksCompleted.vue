<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div class="q-mt-lg">
      <list-header bgColor="bg-green-4">Completed</list-header>

      <q-list 
        separator
        bordered
      >

        <task
          v-for="(task, key) in tasksCompleted"
          :key="key"
          :task="task"
          :id="key"
        />

      </q-list>

    </div>
  </transition>
</template>

<script>
  export default {
    props: ['tasksCompleted'],
    components: {
      'task': () => import('components/Tasks/Task.vue'),
      'list-header': require('components/Shared/ListHeader.vue').default
    }
    
  }
</script>

<style lang="scss" scoped>

</style>