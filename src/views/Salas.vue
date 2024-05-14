<template>
  <v-container>
    <ListView
      @delete="deleteSala"
      @edit="showEditSalaForm"
      :headers="headers"
      title="Salas"
      :items="salas"
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
import { onMounted, ref } from "vue";

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
const salas = ref([]);
let salaItem = ref({});
let loading = ref(true);
let showForm = ref(false);
let isEdit = ref(false);
let formTitle = ref("");

async function listSalas() {
  loading.value = true;
  const { data: items, errors } = await client.models.Sala.list();
  salas.value = items;
  loading.value = false;
}

async function deleteSala(item) {
  await client.models.Sala.delete({
    id: item.id,
  });
  listSalas();
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
  if (isEdit) {
    await updateSala(salaData);
  } else {
    await createSala(salaData);
  }
  closeForm();
  listSalas();
}

function closeForm() {
  showForm.value = false;
}

async function createSala(data) {
  return client.models.Sala.create({
    nombre: data.nombre,
  });
}

onMounted(async () => {
  listSalas();
});
</script>
