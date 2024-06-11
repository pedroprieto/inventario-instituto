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
import { useRouter } from "vue-router";
import { useAppStore } from "../../store/app";

const store = useAppStore();
let router = useRouter();
router.beforeEach((to, from) => {
  store.backURL = null;
});
</script>
