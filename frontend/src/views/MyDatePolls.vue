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
                          <v-menu offset-x left>
                            <template v-slot:activator="{on: menu, attrs}">
                              <v-tooltip bottom>
                                <template v-slot:activator="{on: tooltip}">
                                  <v-btn icon color="green darken-4"  v-bind="attrs" v-on="{...tooltip, ...menu}"><v-icon>mdi-account-multiple</v-icon></v-btn>
                                </template>
                                <span>Voters</span>
                              </v-tooltip>
                            </template>
                            
                            <v-list dense>
                              <template v-if="card.voters">
                              <v-list-item v-for="(voter, index) in card.voters" :key="index">
                                <v-list-item-icon>
                                  <v-icon color="green darken-4">mdi-account</v-icon>
                                </v-list-item-icon>                               
                                  <v-list-item-title v-text="voter.voterName"></v-list-item-title>                                                       
                              </v-list-item>
                              </template>
                              <template v-else>
                                <v-list-item>                
                                  <v-list-item-title>No voters yet</v-list-item-title>                                                       
                              </v-list-item>
                              </template>
                            </v-list>
                          </v-menu>
                          <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                                <v-btn icon color="green darken-4" @click="goToPollResults(card)" v-on="on"><v-icon>mdi-poll</v-icon></v-btn>
                            </template>
                            <span>Poll results</span>
                          </v-tooltip>
                          <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                                <v-btn icon color="green darken-4" @click="vote(card)" v-on="on"><v-icon>mdi-vote</v-icon></v-btn>
                            </template>
                            <span>Vote</span>
                          </v-tooltip>
                            <DatePollEdit :card="card" v-on:editDatePollCard="updateDatePollCard"></DatePollEdit>
                          <v-menu offset-x right :close-on-content-click=false>
                            <template v-slot:activator="{on: menu, attrs}">
                              <v-tooltip bottom>
                                <template v-slot:activator="{on: tooltip}">
                                  <v-btn icon color="green darken-4"  v-bind="attrs" v-on="{...tooltip, ...menu}"><v-icon>mdi-share-variant</v-icon></v-btn>
                                </template>
                                <span>Share</span>
                              </v-tooltip>
                            </template>
                            <v-list>
                              <v-list-item>
                                <v-list-item-title>
                                  <v-text-field readonly color="green darken-4" :id="card.link" :value="card.link">
                                    <template v-slot:append-outer>
                                      <v-tooltip bottom>
                                        <template v-slot:activator="{on}">
                                          <v-btn icon color="green darken-4" v-on="on" @click="copyToClipboard(card)"><v-icon>mdi-content-copy</v-icon></v-btn>
                                        </template>
                                        <span>Copy to clipboard</span>
                                      </v-tooltip>
                                    </template>
                                  </v-text-field>
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
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
  const axios=require('axios')
  
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
          userId:this.userId,
         
        };
        axios.post('http://'+this.$store.state.ip+':3000/insertPoll',newPoll)
        .then((result)=>{
         console.log("New poll inserted succesfully");
         card.id=result.data.id;
         card.link=this.$store.state.ip+':8080/vote/'+card.id
         
         this.datePollCards.push(card)
        })
        .catch(function(error){
          console.log(error)
        });
        
      },


      updateDatePollCard(card){
               
        console.log(card)
        axios.post('http://'+this.$store.state.ip+':3000/updatePoll',card)
        .then(()=>{
         console.log("New poll updated succesfully");
        })
        .catch(function(error){
          console.log(error)
        });
        
      },

      goToPollResults(card){
        this.$router.push({name:'Results',params:{pollId:card.id}});
      },

      deleteDatePollCard(card){
        let index=this.datePollCards.indexOf(card);
        if(index>-1){
          let data={id:card.id}
          axios.post('http://'+this.$store.state.ip+':3000/deleteVotesOfPoll',data)
          axios.post('http://'+this.$store.state.ip+':3000/deletePoll',data)
          this.datePollCards.splice(index,1);
        }

      },

      vote(card){
        this.$router.push({name:'Vote',params:{pollId:card.id}});
      },

      getVoters(card){
        let data={id:card.id}
        axios.post('http://'+this.$store.state.ip+':3000/getVotesOfPoll',data)
        .then((response)=>{
          if(response.data.length>0){
            card.voters=response.data;
          }
          
        })
      },

      copyToClipboard(card){
        let copyText=document.getElementById(card.link)
        copyText.select();
        document.execCommand("copy");
      }

    },

    mounted:function(){
      this.$store.commit('changeExitVisible',true)
      let data={
        userId:this.userId
      }
      axios.post('http://'+this.$store.state.ip+':3000/getUserPolls',data)
      .then((response)=>{
        
        this.datePollCards=response.data;
        for(let i=0;i<this.datePollCards.length;i++){
          this.datePollCards[i].link=this.$store.state.ip+':8080/vote/'+this.datePollCards[i].id
          this.getVoters(this.datePollCards[i]);
        }
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