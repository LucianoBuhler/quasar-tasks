<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :model-value="name"
      @update:model-value="updateName"
      :rules="[val => !!val || 'Field is required']"
      autofocus
      v-select-all
      ref="nameInput"
      label="Task Name"
      class="col"
      clearable
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { selectAll } from 'src/directives/directive-select-all';

export default {
  name: 'TaskInput',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  directives: {
    selectAll
  },
  setup(props, { emit }) {
    const nameInput = ref(null);

    const updateName = (newValue) => {
      emit('update:name', newValue);
    };

    return {
      nameInput,
      updateName
    };
  }
};
</script>

<style lang="scss" scoped>

</style>