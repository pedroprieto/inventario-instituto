<template>
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
  </v-toolbar>
  <v-toolbar flat>
    <slot name="anyadir"> </slot>
  </v-toolbar>
  <v-list lines="two" v-if="!showForm">
    <v-list-item
      v-for="item in items"
      :key="item.id"
      :value="item.id"
      @click="visitItem(item)"
    >
      <v-list-item-title>
        <slot name="titulo" v-bind="item"> </slot>
      </v-list-item-title>
      <v-list-item-subtitle>
        <slot name="subtitulo" v-bind="item"> </slot>
      </v-list-item-subtitle>

      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white"
            >mdi-{{ store.getIconoTipoById(item.tipoId) }}</v-icon
          >
        </v-avatar>
      </template>
      <template v-slot:append>
        <!--
        <v-btn
          color="secondary"
          icon="mdi-pencil"
          variant="text"
          @click="editItem(item)"
        >
        </v-btn>
-->
        <v-btn
          color="error"
          icon="mdi-delete"
          variant="text"
          @click="deleteItem(item)"
        >
        </v-btn>
      </template>
    </v-list-item>
  </v-list>

  <DialogDelete
    @close="close"
    @accept="deleteItemConfirm"
    v-model="dialogDelete"
  ></DialogDelete>
</template>

<script setup>
import { ref, nextTick } from "vue";
const props = defineProps(["title", "items", "loading"]);
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
