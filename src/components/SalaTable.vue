<template>
  <ListView
    @delete="deleteItem"
    @edit="showEditSalaForm"
    @visit="visitSala"
    title="Salas"
    :items="store.salas"
    :loading="loading"
  >
    <template #anyadir>
      <v-btn @click="showCreateSalaForm" color="primary" dark>
        <v-icon size="large" class="me-2"> mdi-plus </v-icon>
        Añadir
      </v-btn>
    </template>
    <template #busqueda> </template>
    <template #titulo="{ nombre, salaId }">
      {{ nombre }}
    </template>

    <template #subtitulo="{ nombre, salaId }">
      {{ store.getNombreSalaById(salaId) }}
    </template>
  </ListView>
  <SalaForm
    :formTitle="formTitle"
    v-if="showForm"
    @envio="editOrCreate"
    @close="closeForm"
    :salaItem="salaItem"
    :isEdit="isEdit"
  ></SalaForm>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { ref } from "vue";
import { useAppStore } from "../store/app";
import { useRouter } from "vue-router";
const router = useRouter();

const store = useAppStore();

const client = generateClient();
let salaItem = ref({});
let loading = ref(false);
let showForm = ref(false);
let isEdit = ref(false);
let formTitle = ref("");

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

function visitSala(item) {
  router.push({
    name: "salaDatos",
    params: { sala: item.id },
  });
}

async function editOrCreate(salaData, isEdit) {
  loading.value = true;
  if (isEdit) {
    await store.updateSala(salaData);
  } else {
    await store.createSala(salaData);
  }
  closeForm();
  await store.getSalas();
  loading.value = false;
}

async function deleteItem(item) {
  loading.value = true;
  await store.deleteSala(item);
  await store.getSalas();
  loading.value = false;
}

function closeForm() {
  showForm.value = false;
}
</script>
