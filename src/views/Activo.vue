<template>
  <v-card v-if="store.currentItem">
    <v-card-item>
      <v-card-title align="center"
        >Activo: {{ store.currentItem.nombre }}</v-card-title
      >
      <v-card-subtitle>
        <v-tabs color="deep-purple-accent-4" align-tabs="center">
          <v-tab
            :to="{
              name: 'activoDatos',
              params: { activo: activo },
            }"
            >Datos
          </v-tab>
          <v-tab
            :to="{
              name: 'activoHistorico',
              params: { activo: activo },
            }"
            >Histórico
          </v-tab>
        </v-tabs>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-card elevation="10">
        <router-view> </router-view>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useAppStore } from "../store/app";

const store = useAppStore();

import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps(["activo"]);

await store.setCurrentItem(props.activo);

store.backURL = {
  name: "activos",
};
</script>
