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
                <v-flex  lg3 v-for="(card, index) in datePollCards" v-bind:key="index">
                    <v-hover>
                      <v-card class="mx-auto" max-width="350" outlined hover>
                          <v-list-item three-line>
                            <v-list-item-content>
                            <v-list-item-title class="headline mx-1">{{card.name}}
                                <v-tooltip top>
                                    <template v-slot:activator="{on}">
                                        <v-btn small absolute icon right color="green darken-4" @click="deleteDatePollCard(card)" v-on="on" class="ml-12"><v-icon>mdi-close</v-icon></v-btn>
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
                                <v-btn icon color="green darken-4" @click="vote(card)" v-on="on"><v-icon>mdi-vote</v-icon></v-btn>
                            </template>
                            <span>Vote</span>
                          </v-tooltip>
                          <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                              <DatePollEdit :card="card" v-on="on" v-on:editDatePollCard="updateDatePollCard"></DatePollEdit>
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
  import DatePollEdit from '../components/DatePollEdit';
 // import DatePollCard from '../components/DatePollCard';
  const axios=require('axios')
  const ip='localhost'
  export default {
    props: {
      userId:[String,Number],
    },
    components:{
      DatePollForm,
      DatePollEdit,

    },
    data: () => ({
      datePollCards:[]
    }),
    methods:{

       addNewDatePollCard(card){
        
        
        console.log(this.datePollCards)
        var newPoll = {
          name: card.name,
          description: card.description,
          month: card.month,
          isOpen:true,
          userId:this.userId,
         
        };
        axios.post('http://'+ip+':3000/insertPoll',newPoll)
        .then((result)=>{
         console.log("New poll inserted succesfully");
         card.id=result.data.id;
         this.datePollCards.push(card)
        })
        .catch(function(error){
          console.log(error)
        });
        
      },


      updateDatePollCard(card){
        
        
        console.log(card)
        axios.post('http://'+ip+':3000/updatePoll',card)
        .then(()=>{
         console.log("New poll updated succesfully");
        })
        .catch(function(error){
          console.log(error)
        });
        
      },


      deleteDatePollCard(card){
        let index=this.datePollCards.indexOf(card);
        if(index>-1){
          let data={id:card.id}
          axios.post('http://'+ip+':3000/deletePoll',data)
          this.datePollCards.splice(index,1);
        }

      },

      vote(card){
        this.$router.push({name:'Vote',params:{card:card}});
      }

    },

    mounted:function(){
      this.$store.commit('changeExitVisible',true)
      let data={
        userId:this.userId
      }
      axios.post('http://'+ip+':3000/getUserPolls',data)
      .then((response)=>{
        
        this.datePollCards=response.data;
        console.log(this.datePollCards)
      })
      .catch(function(error){
        console.log(error)
      });
      
    }

  }
</script>

<style scoped>

</style>