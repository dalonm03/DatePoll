<template>
      <v-container
        fluid
      >
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <DatePollForm name="" description=""></DatePollForm>
          </v-col>
        </v-row>
        <v-row align="start" justify="space-between">
          <v-col align-self="start" cols="4">
            <DatePollCard/>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
  import DatePollForm from '../components/DatePollForm';
  import DatePollCard from '../components/DatePollCard';
  export default {
    props: {
      source: String,
    },
    components:{
      DatePollForm,
      DatePollCard,
    },
    data: () => ({
      drawer: false,
    }),
  }
</script>

<style lang="scss" scoped>

</style>