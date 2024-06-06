<template>
  <!-- <v-app-bar :elevation="2"> -->
  <!--   <v-app-bar-nav-icon -->
  <!--     variant="text" -->
  <!--     @click.stop="drawer = !drawer" -->
  <!--   ></v-app-bar-nav-icon> -->

  <!--   <v-app-bar-title> -->
  <!--     <v-icon icon="mdi-file-document-multiple-outline" /> -->
  <!--     Gestión del PEAC -->
  <!--   </v-app-bar-title> -->
  <!-- </v-app-bar> -->

  <!-- <v-navigation-drawer v-model="drawer" temporary> -->
  <!--   <v-list> -->
  <!--     <v-list-item v-for="route of mainRoutes" :to="route.path">{{ -->
  <!--       route.meta.prompt -->
  <!--     }}</v-list-item> -->
  <!--   </v-list> -->
  <!-- </v-navigation-drawer> -->
  <v-app-bar>
    <template v-slot:prepend>
      <v-btn icon title="Volver" v-if="store.backURL" :to="store.backURL">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </template>
    <!--
    <v-toolbar-title>
      <v-icon icon="mdi-file-document-multiple-outline" />
      Gestión del PEAC
    </v-toolbar-title>
-->
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon
      v-if="$vuetify.display.mobile"
      title="Mostrar menú"
      @click="store.toggleDrawer()"
    >
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const store = useAppStore();
</script>
