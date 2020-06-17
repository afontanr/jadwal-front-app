<template>
  <v-card
      dark
      flat
      tile
  >
    <v-toolbar short>
      <v-btn icon>
        <v-icon @click="goMain">home</v-icon>
      </v-btn>


      <v-toolbar-title>Jadwal</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="goAdminExams" tile v-if="user.isAdmin">
        Administrar Exámenes
      </v-btn>
      <v-btn @click="goAdminUsers" tile v-if="user.isAdmin">
        Administrar Usuarios
      </v-btn>
      <v-btn @click="goBooking" tile >
        Reservar Fecha
      </v-btn>
      <v-btn tile>
        Modificar Reserva
      </v-btn>
      <v-btn icon>
        <v-icon @click="goLogin">mdi-account-circle</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<style scoped>
</style>

<script>
  import {user} from "@/store/store";
  import {getLoggedUser} from "@/shared/data";

  export default {
    data(){
      return {
        user : user,
      }
    },
    methods: {

      goLogin() {
        if(user.isLogged === false){
          this.$router.push({name: 'login'}).catch(() => {})
        } else {
          this.$router.push({name: 'profile'}).catch(() => {})
        }
      },
      goMain() {
        this.$router.push({name: 'main'}).catch(() => {})
      },
      goBooking() {
        this.$router.push({name: 'booking'}).catch(() => {})
      },
      goAdminUsers() {
        this.$router.push({name: 'adminUsers'}).catch(() => {})
      },
      goAdminExams() {
        this.$router.push({name: 'adminExams'}).catch(() => {})
      },
      async getLoggedUser() {
        await getLoggedUser().then((v) => {
          if(v.status == 200){
            user.name = v.data.name;
            user.idUser = v.data.idUser;
            user.office = v.data.office;
            user.email = v.data.email;
            user.surname = v.data.surname;
            user.isLogged = true;
            user.isAdmin = v.data.admin;
          } else {
            user.isLogged = false;
            user.isAdmin = false;
          }
        }).catch(() => {
          this.message = 'No se han podido obtener el usuario';
        });
      },
    },
    beforeMount(){
      this.getLoggedUser();
    },
  }
</script>