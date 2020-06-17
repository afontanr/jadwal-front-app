<template>
  <v-app id="inspire">
    <Header/>
    <v-content>
      <v-container
          fill-height
          fluid
      >
        <v-row
            align="center"
            justify="center"
        >

          <v-card
              class="elevation-12"
              color= "rgb(235, 236, 236, 0.8)"
              min-width="600"
              min-height="250"
          >
            <v-toolbar
                color="#6200EA"
                dark
                flat
                tile
            >
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form>
                <v-text-field
                    label="Email"
                    name="email"
                    :rules="[rules.required]"
                    v-model="loginRequest.email"
                    prepend-icon="mdi-email"
                    type="text"
                />
                <v-text-field
                    id="password"
                    label="Password"
                    :rules="[rules.required]"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    prepend-icon="fas fa-lock"
                    name="password"
                    v-model="loginRequest.password"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                />

              </v-form>
            </v-card-text>
            <v-row
                align="center"
                justify="center"
            >
              <v-card-actions>
                <v-btn color="#6200EA" @click="loginUser" raised style="color: white">Login</v-btn>
              </v-card-actions>

            </v-row>
            <v-alert type="warning" v-if="error">
              {{ message }}
            </v-alert>
          </v-card>

        </v-row>

        <v-row
            align="center"
            justify="center"
        >


        </v-row>

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Header from "./Header";
  import {login} from "@/shared/data";
  import {user} from "@/store/store";
  import { required } from "vuelidate/lib/validators";

  export default {
    components: {Header},
    name: "Login",
  data () {
    return {
      show1: false,
      password: 'Password',
      error: false,
      message: '',
      rules: {
        required: value => !!value || 'Required.',
      },
      users: [],
      loginRequest: {
        email: '',
        password: ''
      },
    }
  },
    validations:{
      loginRequest: {
        email: { required },
        password: { required }
      }
    },
    methods: {
      async loginUser() {
        this.$v.$touch();
        if(!this.$v.$invalid){
          await login(this.loginRequest).then((v) => {
            if(v.status == 200){
              user.email = v.data.email;
              user.idUser = v.data.idUser;
              user.name = v.data.name;
              user.surname = v.data.surname;
              user.office = v.data.office;
              user.isLogged = true;
              user.isAdmin = v.data.isAdmin
            }
          }).catch((e) => {
            this.message = e.response.data.message;
            this.error = true
          });
          if(user.isLogged){
            await this.$router.push({name: 'profile'})
          }
          else{
            this.error = true
          }
        }
      },
    }
  }
</script>

<style scoped>
</style>
