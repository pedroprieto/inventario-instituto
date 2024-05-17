<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-length="items.length"
        :loading="loading"
        :search="search"
        item-value="name"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-text-field
              v-model="search"
              label="Buscar"
              density="compact"
              prepend-inner-icon="mdi-magnify"
              single-line
              hide-details
              flat
              variant="solo-filled"
            ></v-text-field>

            <slot name="busqueda"> </slot>
            <v-spacer></v-spacer>

            <slot name="anyadir"> </slot>
          </v-toolbar>
        </template>

        <template v-slot:item.tipos="{ item }">
          <v-chip size="x-small" v-for="tipo in item.tipos">
            {{ store.getNombreTipoById(tipo) }}
          </v-chip>
        </template>

        <template v-slot:item.nuevo="{ item }">
          <v-icon v-if="item.nuevo" icon="mdi-check"></v-icon>
        </template>
        <template v-slot:item.auditado="{ item }">
          <v-icon v-if="item.auditado" icon="mdi-check"></v-icon>
        </template>
        <template v-slot:item.cerrada="{ item }">
          <v-icon v-if="item.cerrada" icon="mdi-check"></v-icon>
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{ new Date(item.createdAt).toLocaleString() }}</template
        >
        <template v-slot:item.salaId="{ item }">
          {{ store.getNombreSalaById(item.salaId) }}</template
        >
        <template v-slot:item.tipoId="{ item }">
          {{ store.getNombreTipoById(item.tipoId) }}</template
        >
        <template v-slot:item.actions="{ item }">
          <v-btn
            color="primary"
            icon="mdi-information-outline"
            variant="text"
            @click="visitItem(item)"
          >
          </v-btn>
          <v-btn
            color="secondary"
            icon="mdi-pencil"
            variant="text"
            @click="editItem(item)"
          >
          </v-btn>
          <v-btn
            color="error"
            icon="mdi-delete"
            variant="text"
            @click="deleteItem(item)"
          >
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <DialogDelete
      @close="close"
      @accept="deleteItemConfirm"
      v-model="dialogDelete"
    ></DialogDelete>
  </v-container>
</template>

<script setup>
import { ref, nextTick } from "vue";
const props = defineProps(["title", "items", "headers", "loading"]);
const emit = defineEmits(["delete", "edit", "visit"]);
let dialogDelete = ref(false);

import { useAppStore } from "../store/app";
const store = useAppStore();

let itemToDelete = ref({});
let search = ref("");

function deleteItemConfirm() {
  emit("delete", itemToDelete.value);
  close();
}

function editItem(item) {
  emit("edit", item);
}

function visitItem(item) {
  emit("visit", item);
}

async function close() {
  dialogDelete.value = false;
  itemToDelete.value = null;
  await nextTick();
}

function deleteItem(item) {
  itemToDelete.value = item;
  dialogDelete.value = true;
}
</script>

<style scoped></style>
