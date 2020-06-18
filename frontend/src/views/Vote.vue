<template>
    <v-container>
        <v-row justify="center" align-content="center" align="center">
            <v-col cols="12">
                <v-card max-width="550" class="ma-auto">
                    <v-container fluid>
                        <v-card-title><span class="headline mb-1">{{this.card.name}}</span></v-card-title>
                        <v-card-text>{{this.card.description}}</v-card-text>
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
    </v-container>
</template>

<script>
const axios=require('axios')
const ip='localhost'
export default {
    data:function(){
        return{
            name:"",
            pickedDate: this.card.month+'-01',
        }


    },
    props:{
        card:Object,
        fromUser:Boolean
    },
    methods:{
        submitVote(){
            
            let vote={
                date:this.pickedDate,
                voterName:this.name,
                pollId:this.card.id
            }
            axios.post('http://'+ip+':3000/submitVote',vote)
            .then(()=>{
                console.log('Submitted new vote');
            })
        },
        pollMonth(date){
            let dateMonth=date.split('-');
            let posibleMonth=this.card.month.split('-')
            
            if((dateMonth[0]==posibleMonth[0]) && dateMonth[1]==posibleMonth[1]){
                return true;
            }else{
                return false;
            }
        }
    },
    computed:{
        firstDayMonth: function(){
            return this.card.month+'-01'
        },
        lastDayMonth:function(){
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
    }
}
</script>