import Vue from 'vue'

export const login = (user) => {
  return Vue.axios.post(`/api/v0/users/login`, user, {headers:{ 'Content-Type': 'application/json',
      'Accept': 'application/json'}})
};

export const getUsers = () => {
  return Vue.axios.get(`/api/v0/users`, {headers:{ 'Accept': 'application/json'}})
};

export const getUser = (idUser) => {
  return Vue.axios.get(`/api/v0/users/${idUser}`, {headers:{ 'Accept': 'application/json'}})
};


export const getExams = () => {
  return Vue.axios.get(`/api/v0/exams`, {headers:{ 'Accept': 'application/json'}})
};

export const getQuestions = (idExam) => {
  return Vue.axios.get(`/api/v0/exams/${idExam}/questions`, {headers:{ 'Accept': 'application/json'}})
};

export const getAvailabilities = (idExam, idQuestion) => {
  return Vue.axios.get(`/api/v0/exams/${idExam}/questions/${idQuestion}/availabilities`, {headers:{ 'Accept': 'application/json'}})
};

export const getAvailability = (idExam, idQuestion, idAvailabilty) => {
  return Vue.axios.get(`/api/v0/exams/${idExam}/questions/${idQuestion}/availabilities/${idAvailabilty}`, {headers:{ 'Accept': 'application/json'}})
};

export const getQuestion = (idExam, idQuestion) => {
  return Vue.axios.get(`/api/v0/exams/${idExam}/questions/${idQuestion}`, {headers:{ 'Accept': 'application/json'}})
};

export const getIntervals = () => {
  return Vue.axios.get(`/api/v0/intervals`, {headers:{ 'Accept': 'application/json'}})
};

export const getLoggedUser = () => {
  return Vue.axios.get(`/api/v0/users/userLogged`, {headers:{ 'Accept': 'application/json'}})
};

export const logout = () => {
  return Vue.axios.post(`/api/v0/users/logout`, {headers:{ 'Accept': 'application/json'}})
};

export const getBookings = (idQuestion, idAvailability) => {
  return Vue.axios.get(`/api/v0/questions/${idQuestion}/availabilities/${idAvailability}/bookings`, {headers:{ 'Accept': 'application/json'}})
};

export const addUser = (user) => {
  return Vue.axios.post(`/api/v0/users`, user, {headers:{ 'Content-Type': 'application/json',
      'Accept': 'application/json'}})
};

export const addExam = (exam) => {
  return Vue.axios.post(`/api/v0/exams`, exam, {headers:{ 'Content-Type': 'application/json',
      'Accept': 'application/json'}})
};

export const addQuestion = (idExam, question) => {
  return Vue.axios.post(`/api/v0/exams/${idExam}/questions`, question, {headers:{ 'Content-Type': 'application/json',
      'Accept': 'application/json'}})
};

export const addBooking = (idQuestion, booking) => {
  return Vue.axios.post(`/api/v0/questions/${idQuestion}/availabilities/${booking.idAvailable}/bookings`, booking, {headers:{ 'Content-Type': 'application/json',
      'Accept': 'application/json'}})
};

export const addAvailability = (idExam, idQuestion, availability) => {
  return Vue.axios.post(`/api/v0/exams/${idExam}/questions/${idQuestion}/availabilities`, availability, {headers:{ 'Content-Type': 'application/json',
      'Accept': 'application/json'}})
};

export const modifyPassword = (idUser, password) => {
  return Vue.axios.put(`/api/v0/users/${idUser}/password`, password, {headers:{ 'Content-Type': 'application/json',
      'Accept': 'application/json'}})
};

export const modifyUser = (idUser, user) => {
  return Vue.axios.put(`/api/v0/users/${idUser}`, user, {headers:{ 'Content-Type': 'application/json',
      'Accept': 'application/json'}})
};

export const deleteUser = (idUser) => {
  return Vue.axios.delete(`/api/v0/users/${idUser}`,{headers:{ 'Accept': 'application/json'}})
};

export const deleteQuestion = (idExam, idQuestion) => {
  return Vue.axios.delete(`/api/v0/exams/${idExam}/questions/${idQuestion}`,{headers:{ 'Accept': 'application/json'}})
};

export const deleteExam = (idExam) => {
  return Vue.axios.delete(`/api/v0/exams/${idExam}`,{headers:{ 'Accept': 'application/json'}})
};

export const deleteAvailability = (idExam, idQuestion, idAvailability) => {
  return Vue.axios.delete(`/api/v0/exams/${idExam}/questions/${idQuestion}/availabilities/${idAvailability}`,{headers:{ 'Accept': 'application/json'}})
};

export const deleteBooking = (idQuestion, idAvailability, idBooking) => {
  return Vue.axios.delete(`/api/v0//questions/${idQuestion}/availabilities/${idAvailability}/bookings/${idBooking}`,{headers:{ 'Accept': 'application/json'}})
};