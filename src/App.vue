<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>

    <!-- <AppFooter />
    -->
  </v-app>
</template>

<script setup>
import { useAppStore } from "./store/app";

const store = useAppStore();
store.getSalas();
store.getTipos();
</script>
