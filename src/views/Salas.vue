<template>
  <v-container>
    <ListView
      @delete="deleteSala"
      @edit="showEditSalaForm"
      :headers="headers"
      title="Salas"
      :items="store.salas"
      :loading="loading"
    >
      <template #anyadir>
        <v-btn @click="showCreateSalaForm" color="primary" dark class="mb-2">
          <v-icon size="large" class="me-2"> mdi-plus </v-icon>
          Añadir
        </v-btn>
      </template>
      <template #busqueda> </template>
    </ListView>
    <SalaForm
      :formTitle="formTitle"
      v-if="showForm"
      @envio="editOrCreate"
      @close="closeForm"
      :salaItem="salaItem"
      :isEdit="isEdit"
    ></SalaForm>
  </v-container>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { ref } from "vue";
import { useAppStore } from "../store/app";

const store = useAppStore();

const headers = [
  {
    title: "Nombre",
    align: "start",
    sortable: true,
    key: "nombre",
  },
  { key: "actions", title: "Acciones", sortable: false, align: "end" },
];

const client = generateClient();
let salaItem = ref({});
let loading = ref(false);
let showForm = ref(false);
let isEdit = ref(false);
let formTitle = ref("");

async function deleteSala(item) {
  loading.value = true;
  await client.models.Sala.delete({
    id: item.id,
  });
  await store.getSalas();
  loading.value = false;
}

async function updateSala(item) {
  return client.models.Sala.update({
    id: item.id,
    nombre: item.nombre,
  });
}

function showCreateSalaForm() {
  formTitle.value = "Crear sala";
  salaItem.value = {};
  isEdit.value = false;
  showForm.value = true;
}

function showEditSalaForm(item) {
  formTitle.value = "Editar item";
  salaItem.value = item;
  isEdit.value = true;
  showForm.value = true;
}

async function editOrCreate(salaData, isEdit) {
  loading.value = true;
  if (isEdit) {
    await updateSala(salaData);
  } else {
    await createSala(salaData);
  }
  closeForm();
  await store.getSalas();
  loading.value = false;
}

function closeForm() {
  showForm.value = false;
}

async function createSala(data) {
  return client.models.Sala.create({
    nombre: data.nombre,
  });
}
</script>
