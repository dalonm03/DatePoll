<template>
    <v-dialog ref="dialog" max-width="600px" v-model="showForm">
        <template v-slot:activator="{on}">
            <v-btn rounded color="green darken-4" v-on="on" dark>Create new Date Poll<v-icon right>mdi-calendar-plus</v-icon></v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline mb-1">Date Poll Info</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="6">
                                <v-text-field color="green darken-4" label="Name*" v-model="nameLocal"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea label="Description" hint="Why do you need to pick a date?" counter="500" rows="3" color="green darken-4" v-model="descriptionLocal"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="pickedMonth"
                                transition="scale-transition"
                                offset-x
                                
                                right
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="pickedMonth"
                                        label="Month in which people will vote"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-on="on"
                                        color="green darken-4"
                                        
                                    ></v-text-field>
                                </template>
                                <v-date-picker color="green darken-4" type="month" :min="nowDate" v-model="pickedMonth" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="green darken-4" @click="menu = false">Cancel</v-btn>
                                    <v-btn text color="green darken-4" @click="$refs.menu.save(pickedMonth)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                        
                    <v-row justify="end">
                        <v-col cols="2">
                            <v-btn text color="green darken-4" v-on:click="reset">Cancel</v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn text color="green darken-4" v-on:click="saveNewDatePoll">OK</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    props:{
        description:String,
        title:String,
        name:String
    },
    data:function(){
        return{
            showForm:false,
            nowDate:new Date().toISOString().slice(0,10),
            pickedMonth: new Date().toISOString().slice(0,7),
            menu:false,
            nameLocal:this.name,
            descriptionLocal:this.description,
            
        }
        
    },
    
    methods:{
        reset(){
            this.nameLocal="";
            this.pickedMonth=new Date().toISOString().slice(0,7);
            this.nowDate=new Date().toISOString().slice(0,10);
            this.descriptionLocal="";
            this.showForm=false;
        },
        saveNewDatePoll:function(){
            
            let datePollCard={id:-1,name:this.nameLocal,description:this.descriptionLocal,month:this.pickedMonth,isOpen:true}
            this.$emit('newDatePollCard',datePollCard)
            this.reset();
        }
    },
    
}
</script>

<style scoped>
 span{
     text-decoration: underline;
     text-decoration-color:#1B5E20;
 }
</style>