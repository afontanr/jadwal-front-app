<template>
  <v-app id="inspire">
    <Header/>
    <v-content></v-content>
  </v-app>
</template>

<script>
  import Header from "./Header";
  export default {
    components: {Header},
    name: "Main"
  }
</script>

<style scoped>

</style>