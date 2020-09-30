<template>
  <q-page padding>
      <q-list bordered padding>
        <q-item-label header>Setings</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Show 12 hour time format</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle
              color="blue"
              v-model="show12HourTimeFormat"
            />
          </q-item-section>
        </q-item>

      </q-list>
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data(){
      return {}
    },
    computed: {
      ...mapGetters('settings', ['settings']),
      show12HourTimeFormat: {
        get(){
          return this.settings.show12HourTimeFormat
        },
        set(value){
          console.log('value: ', value);
          this.setShow12HourTimeFormat(value)
        }
      }
    },
    methods: {
      ...mapActions('settings', ['setShow12HourTimeFormat'])
    },
  }
</script>
