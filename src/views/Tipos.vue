<template>
  <ListView
    v-if="!showForm"
    @delete="deleteTipos"
    @visit="showEditTipoForm"
    title="Tipos"
    :items="store.tipos"
    :loading="loading"
    :canDelete="store.isAdmin"
    :canSelect="store.isAdmin"
  >
    <template #anyadir>
      <v-btn @click="showCreateTipoForm" color="primary" dark>
        <v-icon size="large" class="me-2"> mdi-plus </v-icon>
        Añadir
      </v-btn>
    </template>
    <template #busqueda> </template>

    <template #titulo="{ nombre }">
      {{ nombre }}
    </template>

    <template #avatar="{ icono }">
      <v-avatar color="grey-lighten-1">
        <v-icon color="white">mdi-{{ icono }}</v-icon>
      </v-avatar>
    </template>
  </ListView>
  <TipoForm
    :formTitle="formTitle"
    v-else
    @envio="editOrCreate"
    @close="closeForm"
    :tipoItem="tipoItem"
    :isEdit="isEdit"
  ></TipoForm>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { ref } from "vue";
import { useAppStore } from "../store/app";

const store = useAppStore();

const client = generateClient();
let tipoItem = ref({});
let loading = ref(false);
let showForm = ref(false);
let isEdit = ref(false);
let formTitle = ref("");

async function deleteTipos(items) {
  let promises = [];
  loading.value = true;
  for (let item of items) {
    promises.push(client.models.Tipo.delete({ id: item.id }));
  }
  await Promise.all(promises);
  await store.getTipos();
  loading.value = false;
}

async function updateTipo(item) {
  return client.models.Tipo.update({
    id: item.id,
    nombre: item.nombre,
    icono: item.icono,
  });
}

function showCreateTipoForm() {
  formTitle.value = "Crear tipo";
  tipoItem.value = {};
  isEdit.value = false;
  showForm.value = true;
}

function showEditTipoForm(item) {
  formTitle.value = "Editar item";
  tipoItem.value = item;
  isEdit.value = true;
  showForm.value = true;
}

async function editOrCreate(tipoData, isEdit) {
  loading.value = true;
  if (isEdit) {
    await updateTipo(tipoData);
  } else {
    await createTipo(tipoData);
  }
  closeForm();
  await store.getTipos();
  loading.value = false;
}

function closeForm() {
  showForm.value = false;
}

async function createTipo(data) {
  return client.models.Tipo.create({
    nombre: data.nombre,
    icono: data.icono,
  });
}
</script>
