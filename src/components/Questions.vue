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
                        min-width="500" max-width="650" style="background-color: lightgray; font-size: 200%" >Ejercicios<v-row></v-row>
            <v-row
                align="center"
                justify="center"
            >
              <v-dialog v-model="dialog" persistent min-width="500" max-width="650">
                <template v-slot:activator="{ on }">
                  <v-btn color="#6200EA" dark v-on="on">Añadir ejercio</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Añadir ejercio</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                          label="Nombre"
                          name="name"
                          v-model="questionToAdd.description"
                          type="text"
                      />
                      <v-select
                          v-model="questionToAdd.idUser"
                          :items="users"
                          :item-text="user => `${user.name} ${user.surname} (${user.email})`"
                          item-value="idUser"
                          dense
                          filled
                          label="Profesor"
                      ></v-select>

                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="green darken-1" dark @click="addQuestion">Crear</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-row></v-card-title>

          <v-row >
            <v-col v-for="question in questions" :key="question.idQuestion">
              <v-card class="mx-auto" min-width="500">
                <v-list-item>
                  <v-list-item-content>
                    <a class="link -align-right" @click="goQuestion(question.idQuestion)"><v-list-item-title style="font-size: 150%">{{ question.description }}</v-list-item-title></a>
                  </v-list-item-content>
                  <v-list-item-avatar tile size="40">
                    <v-col>
                      <v-row>
                        <v-icon @click="deleteQuestion(question.idQuestion)" size="40" left>delete_outlined</v-icon>
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
  import {
    addUser,
    getUsers,
    deleteUser,
    getQuestions,
    addQuestion,
    deleteQuestion
  } from "@/shared/data";
  import {user} from "@/store/store";
  export default {
    components: {Header},
    name: "Questions",
    data() {
      return{
        roles: [{id: 'ADMIN', desc: 'Administrador'}, {id: 'PROF', desc: 'Profesor'}],
        rol: {id: 'PROF', desc: 'Profesor'},
        dialog: false,
        users: [],
        questions: [],
        error: false,
        message: '',
        response: 0,
        questionToAdd: {
          idUser: '',
          description: ''
        },
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
      goQuestion(idQuestion){
        this.$router.push({name: 'question', params: {idExam: this.$route.params.id, idQuestion: idQuestion }}).catch(() => {})
      },

      async getUsers() {
        await getUsers().then((v) => {

          if(v.status == 200){
            this.response = 200;
            this.users = [];
            this.users.push.apply(this.users, v.data);
            console.log(this.users);
            console.log(v.data);
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
      async getQuestions(idExam) {
        await getQuestions(idExam).then((v) => {
          if(v.status == 200){
            this.response = 200;
            this.questions = [];
            this.questions.push.apply(this.questions, v.data);
          }
          else if(v.status == 204){
            this.questions = [];
            this.response = 204;
          }
        }).catch(() => {
          this.message = 'No se han podido obtener la lista de ejercicios';
        });
        if(this.response > 204){
          this.error = true;
        }

      },
      async addUser() {
        this.userToAdd.idRol = this.rol.id;
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
      async addQuestion() {
        console.log(user);
        console.log(this.questionToAdd.idUser);
        await addQuestion(this.$route.params.id, this.questionToAdd).then((v) => {
          if(v.status == 201){
            this.response = 201;
            this.dialog = false;
            this.$router.go();
          }
        }).catch(() => {
          this.message = 'Error al crear un nuevo ejercicio';
          this.error = true;
          this.dialog = false;
        });
      },
      async deleteUser(idUser) {
        await deleteUser(idUser).then((v) => {
          if(v.status == 204){
            this.response = 204;
            this.$router.go()
          }
        }).catch(() => {
          this.message = 'No se ha podido borrar el usuario';
          this.error = true;
        });
      },
      async deleteQuestion(idQuestion) {
        await deleteQuestion(this.$route.params.id, idQuestion).then((v) => {
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
      this.getUsers();
      this.getQuestions(this.$route.params.id);
    },
  }
</script>

<style scoped>

</style>