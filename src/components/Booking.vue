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
              <v-toolbar-title>Reservar Fecha</v-toolbar-title>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text>
              <v-form>
              <v-select
                  v-model="idExam"
                  :items="exams"
                  item-text="name"
                  item-value="idExam"
                  dense
                  filled
                  label="Examen"
                  v-on:change="getQuestions"
              ></v-select>
              <v-select
                  v-model="idQuestion"
                  :items="questions"
                  item-text="description"
                  item-value="idQuestion"
                  dense
                  filled
                  label="Ejercicio"
                  v-on:change="getAvailabilities"
              ></v-select>
              <v-select
                  v-model="idAvailability"
                  :items="availabilities"
                  :item-text="availability => `${ availability.day }   ${availability.descInterval}`"
                  item-value="idAvailability"
                  dense
                  filled
                  label="Día"
              ></v-select>
                <v-text-field
                    label="Correo electronico"
                    name="email"
                    v-model="email"
                    type="text"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
              <v-btn color="green darken-1" dark @click="addBooking">Crear</v-btn>
            </v-card-actions>
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
  import {addBooking, getAvailabilities, getExams, getIntervals, getQuestions} from "@/shared/data";
  export default {
    components: {Header},
    name: "Booking",
    data() {
      return {
        items: [{name:'aaa'}, {name:'bbb'}, {name:'ccc'}, {name:'ddd'}],
        items2: [],
        exams: [],
        questions: [],
        availabilities: [],
        intervals: [],
        idAvailability: '',
        idExam: '',
        idQuestion: '',
        email: '',
        dialog: false,
        value: null,
        value2: null
      }
    },
    methods: {
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
      async getQuestions() {
        await getQuestions(this.idExam).then((v) => {
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
      async getAvailabilities() {
        getIntervals();
        await getAvailabilities(this.idExam, this.idQuestion).then((v) => {
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
      async addBooking() {
        let bookingToAdd = {idAvailable: this.idAvailability, email: this.email};
        await addBooking(this.idQuestion, bookingToAdd).then((v) => {
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
    },
    beforeMount(){
      this.getExams()
    },
  }
</script>

<style scoped>

</style>