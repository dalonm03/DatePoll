<template>
  <v-app>
    <v-content>
      <MyDatePolls/>
    </v-content>
  </v-app>
</template>

<script>
import MyDatePolls from './views/MyDatePolls';

export default {
  name: 'App',

  components: {
    MyDatePolls,
  },

  data: () => ({
    //
  }),
};
</script>
