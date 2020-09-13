<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[val => !!val || 'Field is required']"
      autofocus
      v-select-all
      ref="name"
      label="Task Name"
      class="col"
      clearable
    />
  </div>
</template>

<script>
  import { selectAll } from 'src/directives/directive-select-all'

  export default {
    props: ['name'],
    directives: {
      // select all text in field field when focus and it's not empty
      // v-select-all
      selectAll
    }
  }
</script>

<style lang="scss" scoped>

</style>