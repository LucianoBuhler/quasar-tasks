<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header
        v-if="!settings.showTasksInOneList"
        bgColor="bg-orange-4"
      >Todo</list-header>

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
  import { mapGetters } from 'vuex'

  export default {
    props: ['tasksTodo'],
    computed: {
      ...mapGetters('settings', ['settings'])
    },
    components: {
      'task': () => import('components/Tasks/Task.vue'),
      'list-header': require('components/Shared/ListHeader.vue').default
    }
  }
</script>

<style lang="scss" scoped>

</style>