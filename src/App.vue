<template>
  <v-app>
    <v-main>
      <authenticator>
        <template v-slot="{ user, signOut }">
          <h1>Hello {{ user.username }}!</h1>
          <button @click="signOut">Sign Out</button>
          <router-view />
        </template>
      </authenticator>
    </v-main>

    <!-- <AppFooter />
    -->
  </v-app>
</template>

<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
</script>
