<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      label="Due Time"
      :model-value="dueTime"
      @update:model-value="updateDueTime"
      mask="time"
      class="col"
    >
      <template v-slot:append>
        <q-icon
          v-if="dueTime"
          @click="clearTime"
          name="cancel"
          class="cursor-pointer"
        />

        <q-icon
          name="access_time"
          class="cursor-pointer"
        >
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time
              :model-value="dueTime"
              @update:model-value="updateDueTime"
            >
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'TimeInput',
    props: {
      dueTime: {
        type: String,
        default: ''
      }
    },
    emits: ['update:dueTime'],
    methods: {
      updateDueTime(value) {
        console.log("updateDueTime value: ", value);

        this.$emit('update:dueTime', value)
      },
      clearTime(){
        this.$emit('update:dueTime', '')
      }
    }
  })
</script>

<style lang="scss" scoped>

</style>