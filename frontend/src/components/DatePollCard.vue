<template>
    <v-card
    class="mx-auto"
    max-width="344"
    outlined
    hover
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">Cena de clase</v-list-item-title>
        <v-list-item-subtitle>Decidir que dia y a que hora vamos a tener la cena de clase</v-list-item-subtitle>
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
</template>>

<script>
export default {
    
}
</script>

<style scoped>
    
</style>