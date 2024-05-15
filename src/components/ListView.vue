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

        <template v-slot:item.actions="{ item }">
          <v-btn icon="mdi-pencil" variant="text" @click="editItem(item)">
          </v-btn>
          <v-btn icon="mdi-delete" variant="text" @click="deleteItem(item)">
          </v-btn>
          <v-btn icon="mdi-eye" variant="text" @click="visitItem(item)">
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
