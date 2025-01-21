<template>
  <v-app>
    <default-bar />
    <nav-bar />
    <default-view />
  </v-app>
</template>

<script setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import NavBar from "./NavBar.vue";
</script>
