<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      ref="name"
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[val => !!val || 'Field is required']"
      autofocus
      label="Task Name"
      class="col"
      clearable
    />
  </div>
</template>

<script>
  export default {
    props: ['name']
  }
</script>

<style lang="scss" scoped>

</style>