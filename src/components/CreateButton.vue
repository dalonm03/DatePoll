<template>
  <div>
    <v-btn rounded color="green darken-4" dark>Create new {{object}}
      <v-icon right>{{icon}}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name:'CreateButton',
  props:{
    object:String,
    icon:String
  }
}
</script>