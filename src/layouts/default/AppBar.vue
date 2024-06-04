<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const router = useRouter();

// const drawer = ref(false);

function uploadData(event) {
  const reader = new FileReader();
  reader.readAsText(event.target.files[0]);
  reader.addEventListener(
    "load",
    () => {
      //store.restoreData(reader.result);
      alert("Archivo subido correctamente. Se recargará la página");
      location.reload();
    },
    false
  );
}
</script>

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
    <v-btn
      icon
      title="Restaurar copia de seguridad"
      v-if="store.backURL"
      :to="store.backURL"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
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
