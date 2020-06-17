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
                        min-width="500" max-width="650" style="background-color: lightgray; font-size: 200%" >Exámenes<v-row></v-row>
            <v-row
                align="center"
                justify="center"
            >
              <v-dialog v-model="dialog" persistent min-width="500" max-width="650">
                <template v-slot:activator="{ on }">
                  <v-btn color="#6200EA" dark v-on="on">Crear Examen</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Crear Examen</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                          label="Titulo del examen"
                          name="name"
                          v-model="examToAdd.name"
                          type="text"
                      />
                      <v-text-field
                          label="Fecha de realización"
                          name="date"
                          v-model="examToAdd.date"
                          type="text"
                      />
                      <v-text-field
                          label="Comienzo de las revisiones"
                          name="dateStart"
                          v-model="examToAdd.dateStart"
                          type="text"
                      />
                      <v-text-field
                          label="Final de las revisines"
                          name="dateEnd"
                          v-model="examToAdd.dateEnd"
                          type="text"
                      />

                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="green darken-1" dark @click="addExam">Crear</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-row></v-card-title>

          <v-row >
            <v-col v-for="exam in exams" :key="exam.idExam">
              <v-card class="mx-auto" min-width="500">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 150%">{{ exam.name }}</v-list-item-title>
                    <v-list-item-subtitle  style="font-size: 20px">Fecha de realización: {{ exam.date }}</v-list-item-subtitle>
                    <v-list-item-subtitle  style="font-size: 20px">Inicio revisión: {{ exam.dateStart }} </v-list-item-subtitle>
                    <v-list-item-subtitle  style="font-size: 20px">Fin revisión: {{ exam.dateEnd }} </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar tile size="120">
                    <v-col>
                      <v-row>
                        <v-btn color="green darken-1" size="100" dark @click="goQuestions(exam.idExam)">Ejercicios</v-btn>
                      </v-row>
                      <v-row>
                        <v-btn color="red darken-1" size="150" dark @click="deleteExam(exam.idExam)">Eliminar</v-btn>
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
  import {addUser, getUsers, getExams, addExam, deleteExam} from "@/shared/data";
  export default {
    components: {Header},
    name: "AdminExams",
    data() {
      return{
        roles: [{id: 'ADMIN', desc: 'Administrador'}, {id: 'PROF', desc: 'Profesor'}],
        rol: {id: 'PROF', desc: 'Profesor'},
        dialog: false,
        users: [],
        exams: [],
        error: false,
        message: '',
        response: 0,
        userToAdd: {
          name: '',
          surname: '',
          office: '',
          email: '',
          idRol: '',
        },
        examToAdd: {
          name: '',
          date: '',
          dateStart: '',
          dateEnd: ''
        },
      }
    },
    methods: {
      goQuestions(idExam){
        this.$router.push({name: 'questions', params: {id: idExam}} ).catch(() => {})
      },
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
      async getExams() {
        await getExams().then((v) => {
          if(v.status == 200){
            this.response = 200;
            this.exams = [];
            this.exams.push.apply(this.exams, v.data);
          }
          else if(v.status == 204){
            this.exams = [];
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
      async addExam() {
        await addExam(this.examToAdd).then((v) => {
          if(v.status == 201){
            this.response = 201;
            this.dialog = false;
            this.exams = [];
            this.$router.go();
          }
        }).catch(() => {
          this.message = 'Error al crear un nuevo examen';
          this.error = true;
          this.dialog = false;
        });
      },
      async deleteExam(idExam) {
        await deleteExam(idExam).then((v) => {
          if(v.status == 204){
            this.response = 204;
            this.$router.go();
          }
        }).catch(() => {
          this.message = 'No se ha podido borrar el examen';
          this.error = true;
        });
      }
    },
    beforeMount(){
      this.users = [];
      this.exams = [];
      this.getUsers();
      this.getExams();
    },
  }
</script>

<style scoped>

</style>