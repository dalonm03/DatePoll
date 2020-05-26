<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-calendar-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>My Date Polls</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="green darken-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Date Poll</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <CreateButton object="Date Poll" icon="mdi-calendar-plus" />
          </v-col>
        </v-row>
        <v-row align="start" justify="space-between">
          <v-col align-self="start" cols="4">
            <DatePollCard/>
          </v-col>
        </v-row>
      </v-container>
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
  import CreateButton from './CreateButton';
  import DatePollCard from './DatePollCard';
  export default {
    props: {
      source: String,
    },
    components:{
      CreateButton,
      DatePollCard
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>

<style lang="scss" scoped>

</style>