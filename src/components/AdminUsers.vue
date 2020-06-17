<template>
  <v-app id="inspire">
    <Header/>
    <v-content>
      <v-container fluid>
        <v-card
            class="mx-auto"
            min-width="500"
            max-width="650"
            raised
            style="opacity: 90%"
        >

          <v-card-title class="mx-auto"
                        min-width="500" max-width="650" style="background-color: lightgray; font-size: 200%" >Usuarios<v-row></v-row>
            <v-row
              align="center"
              justify="center"
            >
              <v-dialog v-model="dialog" persistent min-width="500" max-width="650">
                <template v-slot:activator="{ on }">
                  <v-btn color="#6200EA" dark v-on="on">Añadir usuario</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Añadir usuario</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                          label="Nombre"
                          name="name"
                          v-model="userToAdd.name"
                          type="text"
                      />
                      <v-text-field
                          label="Apellidos"
                          name="surname"
                          v-model="userToAdd.surname"
                          type="text"
                      />
                      <v-text-field
                          label="Correo electronico"
                          name="email"
                          v-model="userToAdd.email"
                          type="text"
                      />
                      <v-text-field
                          label="Despacho"
                          name="office"
                          v-model="userToAdd.office"
                          type="text"
                      />
                      <v-select
                          v-model="userToAdd.idRol"
                          :items="roles"
                          name="rol"
                          item-text="desc"
                          item-value="id"
                          dense
                          filled
                          label="Rol"
                      ></v-select>

                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="green darken-1" dark @click="addUser">Crear</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

          </v-row></v-card-title>

          <v-row >
            <v-col v-for="user in users" :key="user.idUser">
              <v-card class="mx-auto" min-width="500">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 150%">{{ user.name }} {{ user.surname}}</v-list-item-title>
                    <v-list-item-subtitle  style="font-size: 20px"> {{ user.email }}</v-list-item-subtitle>
                    <v-list-item-subtitle  style="font-size: 20px">{{ user.office }} </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar tile size="40">
                    <v-col>
                      <v-row>
                        <v-icon @click="deleteUser(user.idUser)" size="40" left>delete_outlined</v-icon>
                      </v-row>
                    </v-col>
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
          <v-alert type="error" v-if="error">
            {{ message }}
          </v-alert>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Header from "./Header";
  import {addUser, getUsers, deleteUser} from "@/shared/data";
  export default {
    components: {Header},
    name: "AdminUsers",
    data() {
      return{
        roles: [{id: 'ADMIN', desc: 'Administrador'}, {id: 'PROF', desc: 'Profesor'}],
        rol: {id: 'PROF', desc: 'Profesor'},
        dialog: false,
        users: [],
        error: false,
        message: '',
        response: 0,
        userToAdd: {
          name: '',
          surname: '',
          office: '',
          email: '',
          idRol: '',
        }
      }
    },
    methods: {
      async getUsers() {
          await getUsers().then((v) => {
            if(v.status == 200){
              this.response = 200;
              this.users = [];
              this.users.push.apply(this.users, v.data);
            }
            else if(v.status == 204){
              this.users = [];
              this.response = 204;
            }
          }).catch((e) => {
            this.message = e.response.data.message;
          });
          if(this.response > 204){
            this.error = true;
          }

      },
      async addUser() {
        await addUser(this.userToAdd).then((v) => {
          if(v.status == 201){
            this.response = 201;
            this.dialog = false;
            this.users.push.apply(this.users, v.data);
            this.$router.go()
          }
          else if(v.status == 204){
            this.users = [];
            this.response = 204;
          }
        }).catch(() => {
          this.message = 'Error al crear un nuevo usuario';
          this.error = true;
          this.dialog = false;
        });
      },
      async deleteUser(idUser) {
        this.userToAdd.idRol = this.rol.id;
        await deleteUser(idUser).then((v) => {
          if(v.status == 204){
            this.response = 204;
            this.$router.go()
          }
        }).catch(() => {
          this.message = 'No se ha podido borrar el usuario';
          this.error = true;
        });
      }
    },
    beforeMount(){
      this.users = [];
      this.getUsers();
    },
  }
</script>

<style scoped>

</style>