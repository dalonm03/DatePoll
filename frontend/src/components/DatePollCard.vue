<template>
    <v-layout justify-center class="cardsContent" id="cardsContent"> 
        <v-flex>

          <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex  lg3 v-for="(card, index) in datePollCards" v-bind:key="index" >
                    <v-hover>
                      <v-card class="mx-auto" max-width="350" outlined hover >
                          <v-list-item three-line>
                            <v-list-item-content>
                            <v-list-item-title class="headline mx-1">{{card.name}}
                                <v-tooltip top>
                                    <template v-slot:activator="{on}">
                                        <v-btn small absolute icon right color="green darken-4" v-on="on" class="ml-12"><v-icon>mdi-close</v-icon></v-btn>
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
                    </v-hover>

                </v-flex>
            </v-layout>
          </v-container>

        </v-flex>
      </v-layout>
</template>>

<script>

export default {
    data:()=>({
        datePollCards:[],
        infoCardLocal:this.infoCard
    }),
    props:{
        infoCard:JSON
    },
    watch:{
        infoCardLocal:function(){
            this.datePollCards.push(this.infoCard)
        }
    }
}
</script>

<style scoped>

</style>