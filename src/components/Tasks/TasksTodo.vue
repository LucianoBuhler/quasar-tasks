<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header bgColor="bg-orange-4">Todo</list-header>

      <q-list 
        separator
        bordered
      >

        <task
          v-for="(task, key) in tasksTodo"
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
    props: ['tasksTodo'],
    components: {
      'task': () => import('components/Tasks/Task.vue'),
      'list-header': require('components/Shared/ListHeader.vue').default
    }
    
  }
</script>

<style lang="scss" scoped>

</style>