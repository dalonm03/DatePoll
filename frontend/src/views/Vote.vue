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
                                <v-date-picker color="green darken-4" :min="nowDate" v-model="pickedDate" scrollable></v-date-picker>
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
    data:()=>({
        name:"",
        nowDate:new Date().toISOString().slice(0,10),
        pickedDate: new Date().toISOString().slice(0,10),


    }),
    props:{
        card:Object
    },
    methods:{
        submitVote(){
            console.log(this.card);
            let vote={
                date:this.pickedDate,
                voterName:this.name,
                pollId:this.card.id
            }
            axios.post('http://'+ip+':3000/submitVote',vote)
            .then(()=>{
                console.log('Submitted new vote');
            })
        }
    }
}
</script>