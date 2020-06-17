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
                        min-width="500" max-width="650" style="background-color: lightgray; font-size: 200%" >{{question.description}}<v-row></v-row>
            <v-row
                align="center"
                justify="center"
            >
              <v-dialog v-model="dialog" persistent min-width="500" max-width="650">
                <template v-slot:activator="{ on }">
                  <v-btn color="#6200EA" dark v-on="on">Añadir disponibilidad</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Añadir disponibilidad</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                          label="Día"
                          name="day"
                          v-model="availabilityToAdd.day"
                          type="text"
                      />
                      <v-text-field
                          label="Capacidad"
                          name="capacity"
                          v-model="availabilityToAdd.capacity"
                          type="number"
                      />
                      <v-select
                          v-model="availabilityToAdd.idInterval"
                          :items="intervals"
                          item-text="description"
                          item-value="idInterval"
                          dense
                          filled
                          label="Hora"
                      ></v-select>

                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="green darken-1" dark @click="addAvailability">Crear</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-row></v-card-title>

          <v-row >
            <v-col v-for="availability in availabilities" :key="availability.idAvailability">
              <v-card class="mx-auto" min-width="500">
                <v-list-item>

                  <v-list-item-content>
                    <a class="link -align-right" @click="goAvailability(availability.idAvailability)"><v-list-item-title style="font-size: 150%">{{ availability.day }}   ({{ intervals.find(x => x.idInterval === availability.idInterval).description }})   {{availability.counter}}/{{availability.capacity}}</v-list-item-title></a>

                  </v-list-item-content>
                  <v-list-item-avatar tile size="40">
                    <v-col>
                      <v-row>
                        <v-icon @click="deleteAvailability(availability.idAvailability)" size="40" left>delete_outlined</v-icon>
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
  import {getUser, getQuestion, getAvailabilities, getIntervals, addAvailability, deleteAvailability} from "@/shared/data";
  export default {
    components: {Header},
    name: "Question",
    data() {
      return{
        roles: [{id: 'ADMIN', desc: 'Administrador'}, {id: 'PROF', desc: 'Profesor'}],
        rol: {id: 'PROF', desc: 'Profesor'},
        dialog: false,
        availabilities: [],
        users: [],
        questions: [],
        intervals: [],
        question: {
          description: '',
          idExam: '',
          idQuestion: '',
          idUser: ''
        },
        user: {
          idUser: '',
          name: '',
          surname: '',
          email: ''
        },
        availabilityToAdd:{
          idInterval: '',
          day: '',
          capacity: 0
        },
        error: false,
        message: '',
        response: 0
      }
    },
    methods: {
      goAvailability(idAvailability){
        console.log(idAvailability);
        this.$router.push({name: 'availability', params: {idExam: this.$route.params.idExam, idQuestion: this.$route.params.idQuestion,
            idAvailability: idAvailability }}).catch(() => {})
      },

      async getUser(idUser) {
        await getUser(idUser).then((v) => {
          if(v.status == 200) {
            this.response = 200;
            this.user.idUser = v.data.idUser;
            this.user.name = v.data.name;
            this.user.surname = v.data.surname;
            this.user.email = v.data.email;
          }
        }).catch((e) => {
          this.message = e.response.data.message;
        });

      },
      async getQuestion(idExam, idQuestion) {
        await getQuestion(idExam, idQuestion).then((v) => {
          if(v.status == 200){
            console.log(v.data);
            this.response = 200;
            this.question.idQuestion = v.data.idQuestion;
            this.question.idExam = v.data.idExam;
            this.question.idUser = v.data.idUser;
            this.question.description = v.data.description;

          }
        }).catch(() => {
          this.message = 'No se han podido obtener el ejercico';
        });
      },
      async getAvailabilities(idExam, idQuestion) {
        await getAvailabilities(idExam, idQuestion).then((v) => {
          if(v.status == 200){
            this.response = 200;
            this.availabilities = [];
            this.availabilities.push.apply(this.availabilities, v.data);
            console.log(this.availabilities)
          }
          else if(v.status == 204){
            this.availabilities = [];
            this.response = 204;
          }
        }).catch((e) => {
          this.message = e.response.data.message;
        });
      },
      async getIntervals() {
        await getIntervals().then((v) => {
          if(v.status == 200){
            this.response = 200;
            this.intervals = [];
            this.intervals.push.apply(this.intervals, v.data);
          }
          else if(v.status == 204){
            this.intervals = [];
            this.response = 204;
          }
        }).catch((e) => {
          this.message = e.response.data.message;
        });
      },
      async addAvailability() {
        await addAvailability(this.$route.params.idExam, this.$route.params.idQuestion, this.availabilityToAdd).then((v) => {
          if(v.status == 201){
            this.response = 201;
            this.$router.go();
          }
          else if(v.status == 204){
            this.response = 204;
          }
        }).catch((e) => {
          this.message = e.response.data.message;
        });
      },
      async deleteAvailability(idAvailability) {
        console.log(idAvailability);
        await deleteAvailability(this.$route.params.idExam, this.$route.params.idQuestion, idAvailability).then((v) => {
          if(v.status == 204){
            this.response = 204;
            this.$router.go();
          }
        }).catch((e) => {
          this.message = e.response.data.message;
        });
      },
    },

    beforeMount(){
      this.questions = [];
      this.users = [];
      this.availabilities = [];
      this.intervals = [];
      this.getQuestion(this.$route.params.idExam, this.$route.params.idQuestion);
      this.getUser(this.question.idUser);
      this.getIntervals();
      this.getAvailabilities(this.$route.params.idExam, this.$route.params.idQuestion);
    },
  }
</script>

<style scoped>

</style>