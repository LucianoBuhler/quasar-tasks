<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      No tasks to do today!
      <template v-slot:action>
        <q-btn
          @click="emitEvent"
          
          flat
          color="primary"
          label="Add Task"
        />
      </template>
    </q-banner>
  </transition>
</template>

<script>
  import eventBus from 'boot/event-bus'
  export default {
    methods: {
      emitEvent() {
        eventBus.$emit('showAddTask');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>