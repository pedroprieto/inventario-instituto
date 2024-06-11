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
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { toRefs } from "vue";
import { fetchAuthSession } from "aws-amplify/auth";

const store = useAppStore();
let router = useRouter();
router.beforeEach((to, from) => {
  store.backURL = null;
});

const { user } = toRefs(useAuthenticator());
let authSession = await fetchAuthSession();

store.user = user;

const groups = authSession.tokens.idToken.payload["cognito:groups"];

store.isAdmin = groups ? groups[0] == "Admin" : false;

store.getSalas();
store.getTipos();
</script>
