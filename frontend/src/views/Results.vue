<template>
    <v-container fluid>
        <v-row justify="center" align-content="center" align="center">
            <v-col cols="12">
                <v-card max-width="550" max-length="600" class="ma-auto">
                    <v-card-title><span class="headline mb-1">{{this.poll.name}}</span></v-card-title>
                    <v-card-text>{{this.poll.description}}</v-card-text>
                    <v-calendar 
                        :start="firstDayMonth" 
                        :end="lastDayMonth" 
                        color="green darken-4"
                        weekdays="1,2,3,4,5,6,0"
                        :short-weekdays=false
                        :short-months=false
                        :events="votes"
                        event-color="green darken-4"
                        :event-more=true
                    >
                    </v-calendar>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
const axios=require('axios')
export default {
    data:function(){
        return{
            poll:Object,
            votes:[]
        }


    },
    props:{
        pollId:[Number,String]
    },

    computed:{

        firstDayMonth: function(){
            let nowDate=new Date().toISOString().slice(0,7);
            if(nowDate==this.poll.month){
                return new Date().toISOString().slice(0,10);
            }else{
                return this.poll.month+'-01';
            }
            
        },
        lastDayMonth:function(){
            console.log(this.poll.month)
            let actualMonth=this.poll.month.split('-')[1];
            switch(actualMonth){
                case '04':
                case '06':
                case '09':
                case '11':
                    return this.poll.month+'-30'
                case '02':

                    var year=parseInt(this.poll.month.split('-')[0])
                    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
                        return this.poll.month+'-29'
                    }else{
                        return this.poll.month+'-28'
                    }
                default:
                    return this.poll.month+'-31';
            }
        }
    },

    created:function(){
      this.$store.commit('changeExitVisible',false)
      axios.post('http://'+this.$store.state.ip+':3000/getPoll',{pollId:this.pollId})
      .then((response)=>{
          
        this.poll=response.data[0];
        
        console.log(this.card);
      });
      let data={id:this.pollId}
        axios.post('http://'+this.$store.state.ip+':3000/getVotesOfPoll',data)
        .then((response)=>{
          if(response.data.length>0){
            for(let vote of response.data){
                this.votes.push({name:vote.voterName,start:vote.date})
            }
          }
          
        })

    },

}
</script>

<style scoped>
</style>