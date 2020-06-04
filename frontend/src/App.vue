<template>
  <v-app>
        <v-app-bar
      app
      color="green darken-4"
      dark
    >
    
      <v-toolbar-title>Date Poll
        <v-icon>mdi-calendar-multiple-check</v-icon>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer
      color="green darken-4"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
