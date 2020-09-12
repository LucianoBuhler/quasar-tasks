<template>
  <q-card-section class="row">
    <div class="text-h6">
      <slot />
    </div
    >
    <q-space />
    <q-btn 
      flat 
      round 
      dense
      color="primary" 
      icon="close" 
      v-close-popup
    />
  </q-card-section>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>