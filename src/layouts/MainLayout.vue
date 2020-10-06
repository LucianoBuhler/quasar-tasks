<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>

        <q-btn
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
        />

      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab 
          v-for="link in essentialLinks"
          :key="link.title"
          :to="link.link"
          :icon="link.icon" 
          :label="link.title" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import EssentialLink from 'components/EssentialLink.vue'

  const linksData = [
    {
      title: 'Tasks',
      // caption: 'quasar.dev',
      icon: 'list',
      // link: 'https://quasar.dev'
      link: '/'
    },
    {
      title: 'Settings',
      // caption: 'github.com/quasarframework',
      icon: 'settings',
      link: '/settings'
    }
  ];

  export default {
    name: 'MainLayout',
    components: { EssentialLink },
    data () {
      return {
        leftDrawerOpen: false,
        essentialLinks: linksData
      }
    }
  }
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }

  .q-drawer {
    .q-item.q-router-link--active {
      color: white !important;
    }
  }
</style>
