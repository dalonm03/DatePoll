<template>
      <v-container
        fluid
      >
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <DatePollForm name="" description="" v-on:newDatePollCard="addNewDatePollCard"></DatePollForm>
          </v-col>
        </v-row>
        
        <v-layout justify-center class="cardsContent" id="cardsContent"> 
        <v-flex>

          <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex  lg3 v-for="(card, index) in datePollCards" v-bind:key="index" >
                    <v-hover>
                      <v-card class="mx-auto" max-width="350" outlined hover >
                          <v-list-item three-line>
                            <v-list-item-content>
                            <v-list-item-title class="headline mx-1">{{card.name}}
                                <v-tooltip top>
                                    <template v-slot:activator="{on}">
                                        <v-btn small absolute icon right color="green darken-4" v-on="on" class="ml-12"><v-icon>mdi-close</v-icon></v-btn>
                                    </template>
                                    <span>Delete Poll</span>
                                </v-tooltip>
                            </v-list-item-title>
                            <v-list-item-subtitle>{{card.description}}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>

                        <v-card-actions>
                          <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                              <v-btn icon color="green darken-4" v-on="on"><v-icon>mdi-account-multiple</v-icon></v-btn>
                            </template>
                            <span>Users</span>
                          </v-tooltip>
                          <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                                <v-btn icon color="green darken-4" v-on="on"><v-icon>mdi-poll</v-icon></v-btn>
                            </template>
                            <span>Poll results</span>
                          </v-tooltip>
                          <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                                <v-btn icon color="green darken-4" v-on="on"><v-icon>mdi-vote</v-icon></v-btn>
                            </template>
                            <span>Vote</span>
                          </v-tooltip>
                          <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                                <v-btn icon right color="green darken-4" v-on="on"><v-icon>mdi-calendar-edit</v-icon></v-btn>
                            </template>
                            <span>Edit Poll</span>
                          </v-tooltip>
                        </v-card-actions>

                      </v-card>
                    </v-hover>

                </v-flex>
            </v-layout>
          </v-container>

        </v-flex>
      </v-layout>

      </v-container>
</template>

<script>
  import DatePollForm from '../components/DatePollForm';
 // import DatePollCard from '../components/DatePollCard';
  export default {
    props: {
      source: String,
    },
    components:{
      DatePollForm,
  //  DatePollCard,
    },
    data: () => ({
      drawer: false,
      datePollCards:[{name:String,description:String,month:String}]
    }),
    methods:{
      addNewDatePollCard(args){
        this.datePollCards.push(args)
        console.log(args)
      }
    }
  }
</script>

<style scoped>

</style>