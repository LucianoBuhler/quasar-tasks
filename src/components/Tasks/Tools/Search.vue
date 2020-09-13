<template>
  <q-input
    v-model="searchField"
    @keyup.esc="searchField = ''"
    v-select-all
    outlined
    class="col"
    label="Search"
  >

    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>

  </q-input>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { selectAll } from 'src/directives/directive-select-all'

  export default {
    computed: {
      ...mapState('tasks', ['search']),
      searchField: {
        get(){
          return this.search
        },
        set(value){
          console.log('value: ', value);
          this.setSearch(value)
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['setSearch'])
    },
    directives: {
      // select all text in field field when focus and it's not empty
      // v-select-all
      selectAll
    }
  }
</script>

<style lang="scss" scoped>

</style>