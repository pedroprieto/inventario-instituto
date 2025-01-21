<template>
  <ListView
    v-if="!showForm"
    @delete="deleteItems"
    @edit="showEditSalaForm"
    @visit="visitSala"
    title="Salas"
    :items="store.salas"
    :loading="loading"
    :canDelete="store.isAdmin"
    :canSelect="store.isAdmin"
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
    v-else
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
    name: "salaActivos",
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

async function deleteItems(items) {
  let promises = [];
  loading.value = true;
  for (let item of items) {
    promises.push(store.deleteSala(item));
  }
  await Promise.all(promises);
  await store.getSalas();
  loading.value = false;
}

function closeForm() {
  showForm.value = false;
}
</script>
