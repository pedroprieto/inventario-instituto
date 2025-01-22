<template>
  <v-list lines="two">
    <v-list-item
      v-for="sala in store.currentItem.salas
        .slice()
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))"
      :key="sala.id"
    >
      <v-list-item-title>
        {{ store.getNombreSalaById(sala.salaId) }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ new Date(sala.createdAt).toLocaleString() }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { useAppStore } from "../store/app";

const store = useAppStore();
const props = defineProps(["activo"]);

store.backURL = {
  name: "activos",
};
</script>
