<template>
    <v-dialog max-width="600px" v-model="showForm">
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
                                <v-text-field color="green darken-4" label="Name*">{name}</v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea label="Description" hint="Why do you need to pick a date?" counter="500" rows="3" color="green darken-4">{description}</v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="8">
                            <v-date-picker color="green darken-4" type="month" :min="nowDate" v-model="pickedMonths" multiple></v-date-picker>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data:()=>({
        showForm:false,
        nowDate:new Date().toISOString().slice(0,10),
        pickedMonths: [],
    }),
    props:{
        description:String,
        title:String,
        name:String
    }
}
</script>