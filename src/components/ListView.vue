<template>
  <v-toolbar flat>
    <template v-if="!selectedItems.length">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-text-field
        v-model="search"
        label="Buscar"
        density="compact"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        clearable
        flat
        variant="solo-filled"
      ></v-text-field>
      <v-toolbar-items>
        <slot name="anyadir"> </slot>
      </v-toolbar-items>
    </template>
    <template v-else>
      <v-btn @click="deselectAll" dark>
        <v-icon size="large" variant="text" class="me-2">
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="deleteItems" color="error" dark>
        <v-icon size="large" class="me-2"> mdi-delete </v-icon>
      </v-btn>
      <slot name="selectedActions" :selectedItems="selectedItems"> </slot>
    </template>
  </v-toolbar>

  <v-list
    lines="two"
    select-strategy="classic"
    v-model:selected="selectedItems"
  >
    <v-list-item v-for="item in items" :key="item.id" :value="item">
      <v-list-item-title>
        <slot name="titulo" v-bind="item"> </slot>
      </v-list-item-title>
      <v-list-item-subtitle>
        <slot name="subtitulo" v-bind="item"> </slot>
      </v-list-item-subtitle>

      <template v-slot:prepend>
        <slot name="avatar" v-bind="item"> </slot>
      </template>
      <template v-slot:append>
        <v-btn icon="mdi-chevron-right" variant="text" @click="visitItem(item)">
        </v-btn>
      </template>
    </v-list-item>
  </v-list>

  <DialogDelete
    @close="close"
    @accept="deleteItemsConfirm"
    v-model="dialogDelete"
    :message="`¿Desea borrar ${selectedItems.length} elementos?`"
  ></DialogDelete>
</template>

<script setup>
import { ref, nextTick } from "vue";
const props = defineProps(["title", "items", "loading"]);
const emit = defineEmits(["delete", "edit", "visit"]);
let dialogDelete = ref(false);

import { useAppStore } from "../store/app";
const store = useAppStore();

let search = ref("");
let selectedItems = ref([]);

function deleteItemsConfirm() {
  emit("delete", selectedItems.value);
  deselectAll();
  close();
}

function editItem(item) {
  emit("edit", item);
}

function visitItem(item) {
  emit("visit", item);
}

function deselectAll() {
  selectedItems.value = [];
}

async function close() {
  dialogDelete.value = false;
  await nextTick();
}

function deleteItems() {
  dialogDelete.value = true;
}
</script>

<style scoped></style>
