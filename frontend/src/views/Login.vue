<template>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            
            <v-card class="elevation-12">
              <v-toolbar
                color="green darken-4"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="Username"
                    prepend-icon="mdi-account"
                    type="text"
                    color="green darken-4"
                    v-model="username"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    color="green darken-4"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-dialog v-model="showForm" max-width="500px">
                  <template v-slot:activator="{on}">
                    <span class="register" v-on="on">Don't have a DatePoll account? Register</span>
                  </template>
                  <v-card>
                    <v-card-title>
                        <span class="headline mb-1">Register</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                        <v-text-field color="green darken-4" label="Username" v-model="registerName"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field label="Password" type="password" color="green darken-4" v-model="registerPassword"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field label="Repeat password" type="password" color="green darken-4" v-model="registerRepeatPassword"></v-text-field>
                                </v-col>
                            </v-row>
                                
                            <v-row justify="end">
                                <v-col cols="2">
                                    <v-btn text color="green darken-4" v-on:click="reset">Cancel</v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn text color="green darken-4" v-on:click="saveNewUser">OK</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
                <v-btn dark color="green darken-4" @click="validateUsernameAndPassword">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
  const axios=require('axios')
  const ip='localhost'
  export default {
    data:()=>({
      username:'',
      password:'',
      userId:Number,
      showForm:false,
      registerName:'',
      registerPassword:'',
      registerRepeatPassword:'',
    }),
    props: {
      source: String,
    },
    methods:{
      
      validateUsernameAndPassword: function() {
      console.log(location.host);

        if (
          this.username == null ||
         this.username == "" ||
         this.password == null ||
          this.password == ""
       ) {

        alert("Please fill all fields");
      } else {
        var datos = {
          name: this.username,
          password: this.password
        };
        
        axios.post('http://'+ip+':3000/login',datos)
        .then((response)=>{
          console.log(response.data[0].id)
          console.log('Entro a cambiar la ruta ');
          this.$store.commit('changeExitHidden',true)
          this.$router.push({name:'MyDatePolls',params:{userId:response.data[0].id}});
        })
        .catch(function(error){
          alert('Incorrect username or password');
          console.log(error);
        });
      }
    },
    
       
      reset:function(){
        this.registerName='';
        this.registerPassword='';
        this.registerRepeatPassword='';
        this.showForm=false;
      },

      saveNewUser:function(){
        if(this.registerName==''||this.registerPassword==''||this.registerRepeatPassword==''){
          alert("Please fill all fields.");
        }else{
          if(this.registerPassword!=this.registerRepeatPassword){
            alert("The passwords don't match.")
          }else{
            axios.post('http://'+ip+':3000/getNumberOfUsersWithName',{name:this.registerName})
            .then((response)=>{
              console.log(response.data.count)
              if(response.data.count>0){
                alert("That username is already in use.")
              }else{
                if(response.data.count==0){
                  let nuevoUsuario={
                    name:this.registerName,
                    password:this.registerPassword
                  }
                  axios.post('http://'+ip+':3000/insertUser',nuevoUsuario)
                  .then(()=>{
                    console.log('Insert of user '+this.username+' was succesful');
                  })
                  .catch(function(error){
                    console.log(error)
                  });
                  this.reset()
                }
              }
            })
          }
        }
      }
      
    }
  }
</script>

<style scoped>
.register{
  font-size: small;
  color:green;
  text-decoration:underline;
  cursor: pointer;
}
</style>