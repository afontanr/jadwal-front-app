<template>
  <v-app id="inspire">
    <Header/>
    <v-content>
      <v-container
          fill-height
          fluid
      >

      <v-card
          class="mx-auto"
          max-width="650"
          raised>
        <v-list-item three-line>
          <v-list-item-content>
            <div style="font-size: 15px" class="mb-2">{{ user.office }}</div>
            <v-list-item-title style="font-size: 35px" class="mb-1">{{ user.name }} {{user.surname}}</v-list-item-title>
            <v-list-item-subtitle style="font-size: 20px">  {{ user.email }} </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar tile size="200">
            <v-col>
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Modificar Perfil</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">Modificar Perfil</v-card-title>
                    <v-card-text>
                      <v-form>
                        <v-text-field
                            label="Nombre"
                            name="name"
                            v-model="userToModify.name"
                            type="text"
                        />
                        <v-text-field
                            label="Apellidos"
                            name="surname"
                            v-model="userToModify.surname"
                            type="text"
                        />
                        <v-text-field
                            label="Correo"
                            name="email"
                            v-model="userToModify.email"
                            type="text"
                        />
                        <v-text-field
                            label="Despacho"
                            name="office"
                            v-model="userToModify.office"
                            type="text"
                        />
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
                      <v-btn color="green darken-1" dark @click="modifyUser">Crear</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <v-row justify="center" align="left">
                <v-btn right icon >
                  <v-dialog v-model="dialog2" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on">Cambiar Contraseña</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">Cambiar Contraseña</v-card-title>
                      <v-card-text>
                        <v-form>
                          <v-text-field
                              label="Antigua Contraseña"
                              name="oldPassword"
                              v-model="userToModifyPwd.oldPassword"
                              type="password"
                          />
                          <v-text-field
                              label="Nueva Contraseña"
                              name="newPassword"
                              v-model="userToModifyPwd.newPassword"
                              type="password"
                          />
                          <v-text-field
                              label="Repetir Nueva Contraseña"
                              name="repeatNewPassword"
                              v-model="userToModifyPwd.repeatPassword"
                              type="password"
                          />

                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog2 = false">Cancelar</v-btn>
                        <v-btn color="green darken-1" dark @click="modifyPassword">Crear</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-btn>
              </v-row>
              <v-row>
                <v-btn @click="logout" max-width="600px">Logout</v-btn>
              </v-row>
            </v-col>
          </v-list-item-avatar>
        </v-list-item>
        <v-alert type="warning" v-if="error">
          {{ message }}
        </v-alert>
      </v-card>
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
  import {user} from "@/store/store";
  import {logout, modifyPassword, modifyUser} from "@/shared/data";

  export default {
    components: {Header},
    name: "Profile",
    data(){
      return {
        user : user,
        dialog: false,
        dialog2: false,
        error: false,
        message: '',
        userToModify: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          office: user.office
        },
        userToModifyPwd: {
          oldPassword: '',
          newPassword: '',
          repeatPassword: ''
        }
      }
    },
    methods: {
      async modifyPassword(){
        await modifyPassword(this.user.idUser, this.userToModifyPwd).then((v) => {
          if(v.status == 200){
            this.$router.go();
          }

        }).catch((e) => {
          this.dialog = false;
          this.dialog2 = false;
          this.error = true;
          this.message = e.response.data.message;
        });
      },
      async modifyUser(){
        await modifyUser(this.user.idUser, this.userToModify).then((v) => {
          if(v.status == 200){
            this.$router.go();
          }

        }).catch((e) => {
          this.dialog = false;
          this.dialog2 = false;
          this.error = true;
          this.message = e.response.data.message;
        });
      },
      async logout(){
        await logout().then(() => {
          this.$router.push({name: 'login'}).catch(() => {})
        }).catch((e) => {
          this.message = e.response.data.message;
        });
      },

    }
  }
</script>

<style scoped>

</style>