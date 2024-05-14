<template>
  <v-container>
    <ListView
      @delete="deleteTipo"
      @edit="showEditTipoForm"
      :headers="headers"
      title="Tipos"
      :items="tipos"
      :loading="loading"
    >
      <template #anyadir>
        <v-btn @click="showCreateTipoForm" color="primary" dark class="mb-2">
          <v-icon size="large" class="me-2"> mdi-plus </v-icon>
          Añadir
        </v-btn>
      </template>
      <template #busqueda> </template>
    </ListView>
    <TipoForm
      :formTitle="formTitle"
      v-if="showForm"
      @envio="editOrCreate"
      @close="closeForm"
      :tipoItem="tipoItem"
      :isEdit="isEdit"
    ></TipoForm>
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
const tipos = ref([]);
let tipoItem = ref({});
let loading = ref(true);
let showForm = ref(false);
let isEdit = ref(false);
let formTitle = ref("");

async function listTipos() {
  loading.value = true;
  const { data: items, errors } = await client.models.Tipo.list();
  tipos.value = items;
  loading.value = false;
}

async function deleteTipo(item) {
  await client.models.Tipo.delete({
    id: item.id,
  });
  listTipos();
}

async function updateTipo(item) {
  return client.models.Tipo.update({
    id: item.id,
    nombre: item.nombre,
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
  if (isEdit) {
    await updateTipo(tipoData);
  } else {
    await createTipo(tipoData);
  }
  closeForm();
  listTipos();
}

function closeForm() {
  showForm.value = false;
}

function createTipo(data) {
  client.models.Tipo.create({
    nombre: data.nombre,
  }).then(() => {
    listTipos();
  });
}

onMounted(async () => {
  listTipos();
});
</script>
