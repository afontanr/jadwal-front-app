import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login";
import Main from "@/components/Main";
import Booking from "@/components/Booking";
import AdminUsers from "@/components/AdminUsers";
import Profile from "@/components/Profile";
import AdminExams from "@/components/AdminExams";
import Questions from "@/components/Questions";
import Question from "@/components/Question";
import Availability from "@/components/Availability";

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/booking',
    name: 'booking',
    component: Booking
  },
  {
    path: '/users',
    name: 'adminUsers',
    component: AdminUsers
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/exams',
    name: 'adminExams',
    component: AdminExams
  },
  {
    path: '/exams/:id/questions',
    name: 'questions',
    component: Questions
  },
  {
    path: '/exams/:idExam/questions/:idQuestion/availability/:idAvailability',
    name: 'availability',
    component: Availability
  },
  {
    path: '/exams/:idExam/questions/:idQuestion',
    name: 'question',
    component: Question
  },
  {
    path: '/',
    name: 'main',
    component: Main
  }
  ];
const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
});

export default router