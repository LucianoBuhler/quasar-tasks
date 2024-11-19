<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      label="Due Date"
      :model-value="dueDate"
      @update:model-value="updateDueDate"
      mask="date"
    >
      <template v-slot:append>
        <q-icon
          v-if="dueDate"
          @click="clearDate"
          name="cancel"
          class="cursor-pointer"
        />

        <q-icon
          name="event"
          class="cursor-pointer"
        >
        <q-popup-proxy>
          <q-date
            :model-value="dueDate"
            @update:model-value="updateDueDate"
          />
        </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'DateInput',
    props: {
      dueDate: {
        type: String,
        default: ''
      }
    },
    emits: ['update:dueDate', 'clear'],
    methods: {
      updateDueDate(value) {
        console.log("updateDueDate value: ", value);
        
        this.$emit('update:dueDate', value)
      },
      clearDate(){
        this.$emit('update:dueDate', '')
        this.$emit('clear')
      }
    }
  })
</script>

<style lang="scss" scoped>

</style>