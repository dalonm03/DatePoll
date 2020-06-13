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
      userId:Number
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

        alert("No deje campos vacíos");
      } else {
        var datos = {
          nombre: this.username,
          password: this.password
        };
        
        axios.post('http://'+ip+':3000/login',datos)
        .then((response)=>{
          console.log(response.data[0].idusuario)
          console.log('Entro a cambiar la ruta ');
          this.$router.push('/myDatePolls');
        })
        .catch(function(error){
          
          console.log(error)
        });
        /*this.$http.post("http://localhost:3000/login", datos).then(
          response => {
            if(response.body != ""){


                this.$router.push({name: 'MyDatePolls', params:{userId:response.body[0].idusuario}});
                
                
            }
              
            else alert("Nombre o contraseña son incorrectos");
          },
          response => {
            response.body != "0";
            alert("Error al enviar los datos");
          }
        );*/
      }
    },
    
       

      
    }
  }
</script>