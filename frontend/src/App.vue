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
      <v-btn icon absolute right v-if="!hideExit" @click="exit"><v-icon>mdi-exit-run</v-icon></v-btn>
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
    hideExit:true
  }),
  methods:{
    exit(){
      
      this.$router.push('/login');
    }
  },
  watch:{
    $route:function(){
      if(!(this.$router.path==='/login')){
        this.hideExit=false;
        
      }
    }
  }
};
</script>
