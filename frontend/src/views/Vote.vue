<template>
    <v-container fluid>
        <v-row justify="center" align="center">
            <v-card>
                <v-card-title><span class="headline mb-1">{{datePollTitle}}</span></v-card-title>
                <v-card-text></v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data:()=>({

    }),
    props:{
        datePollTitle:String,
        datePollDescription:String,
        datePollMonth:String,
    }
}
</script>