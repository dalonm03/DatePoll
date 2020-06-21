<template>
    <v-container>
        <v-row justify="center" align-content="center" align="center">
            <v-col cols="12">
                <v-card max-width="550" class="ma-auto">
                    <v-container fluid>
                        <v-row>
                        <v-card-title><span class="headline mb-1">{{this.card.name}}</span></v-card-title>
                        <v-card-text>{{this.card.description}}</v-card-text>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field color="green darken-4" label="Your name" v-model="name"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="8">
                                <v-date-picker color="green darken-4" show-current="false" :min="firstDayMonth" :max="lastDayMonth" :allowed-dates="pollMonth" v-model="pickedDate" ></v-date-picker>
                            </v-col>
                        </v-row>
                        <v-row justify="end">
                        <v-col cols="2">
                            <v-btn dark color="green darken-4" v-on:click="submitVote">OK</v-btn>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row align="end" justify="center" align-content="end">
            <v-col cols=4>
                <v-alert v-if="voteWasSubmitted" type="success">Your vote was submitted succesfully!</v-alert>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script>
const axios=require('axios')

export default {
    data:function(){
        return{
            name:"",
            pickedDate:String,
            card:Object,
            voteWasSubmitted:false
        }


    },
    props:{
        pollId:[Number,String],
        
    },
    methods:{
        submitVote(){
            
            let vote={
                date:this.pickedDate,
                voterName:this.name,
                pollId:this.card.id
            }
            axios.post('http://'+this.$store.state.ip+':3000/submitVote',vote)
            .then(()=>{
                console.log('Submitted new vote');
                
                this.voteWasSubmitted=true;
                
            })
            .catch(function(error){
                console.log(error)
            });
        },
        pollMonth(date){
            let dateMonth=date.split('-');
            let posibleMonth=this.card.month.split('-')
            
            if((dateMonth[0]==posibleMonth[0]) && dateMonth[1]==posibleMonth[1]){
                return true;
            }else{
                return false;
            }
        },
        
    },

    created:function(){
      this.$store.commit('changeExitVisible',false)
      axios.post('http://'+this.$store.state.ip+':3000/getPoll',{pollId:this.pollId})
      .then((response)=>{
          
        this.card=response.data[0];
        let nowDate=new Date().toISOString().slice(0,7);
        if(nowDate==this.card.month){
            this.pickedDate=new Date().toISOString().slice(0,10);
        }else{
            this.pickedDate=this.card.month+'-01';
        }
        console.log(this.card);
      })

    },

    computed:{

        firstDayMonth: function(){
            let nowDate=new Date().toISOString().slice(0,7);
            if(nowDate==this.card.month){
                return new Date().toISOString().slice(0,10);
            }else{
                return this.card.month+'-01';
            }
            
        },
        lastDayMonth:function(){
            console.log(this.card.month)
            let actualMonth=this.card.month.split('-')[1];
            switch(actualMonth){
                case '04':
                case '06':
                case '09':
                case '11':
                    return this.card.month+'-30'
                case '02':

                    var year=parseInt(this.card.month.split('-')[0])
                    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
                        return this.card.month+'-29'
                    }else{
                        return this.card.month+'-28'
                    }
                default:
                    return this.card.month+'-31';
            }
        }
    },

}
</script>