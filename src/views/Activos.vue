<template>
  <v-container>
    <ListView
      @delete="deleteActivo"
      @edit="showEditActivoForm"
      :headers="headers"
      title="Activos"
      :items="activos"
      :loading="loading"
    >
      <template #anyadir>
        <v-btn @click="showCreateActivoForm" color="primary" dark class="mb-2">
          <v-icon size="large" class="me-2"> mdi-plus </v-icon>
          Añadir
        </v-btn>
      </template>
      <template #busqueda>
        <v-select
          @change="listActivos"
          v-model="selectedSalas"
          :items="store.salas"
          item-title="nombre"
          item-value="id"
          label="Salas"
          chips
          multiple
        ></v-select>
      </template>
    </ListView>
    <ActivoForm
      :formTitle="formTitle"
      v-if="showForm"
      @envio="editOrCreate"
      @close="closeForm"
      :salas="store.salas"
      :tipos="store.tipos"
      :activoItem="activoItem"
      :isEdit="isEdit"
    ></ActivoForm>
  </v-container>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { onMounted, ref, watch } from "vue";
import { useAppStore } from "../store/app";

const store = useAppStore();

const headers = [
  {
    title: "Nombre",
    align: "start",
    sortable: true,
    key: "nombre",
  },
  {
    title: "Sala",
    align: "start",
    sortable: true,
    key: "salaId",
  },
  {
    title: "Tipo",
    align: "start",
    sortable: true,
    key: "tipoId",
  },
  { key: "actions", title: "Acciones", sortable: false, align: "end" },
];

const client = generateClient();
const activos = ref([]);
let selectedSalas = ref([]);
let activoItem = ref({});
let loading = ref(true);
let showForm = ref(false);
let isEdit = ref(false);
let formTitle = ref("");

watch(selectedSalas, async (newQuestion, oldQuestion) => {
  listActivos();
});

async function listActivos() {
  loading.value = true;
  let filter = {};
  if (selectedSalas.value.length) {
    filter.filter = {};
    filter.filter.salaId = { eq: selectedSalas.value[0] };
  }

  const { data: items, errors } = await client.models.Activo.list(filter);
  activos.value = items;
  loading.value = false;
}

async function deleteActivo(item) {
  await client.models.Activo.delete({
    id: item.id,
  });
  listActivos();
}

async function updateActivo(item) {
  return client.models.Activo.update({
    id: item.id,
    nombre: item.nombre,
    salaId: item.salaId,
    tipoId: item.tipoId,
  });
}

function showCreateActivoForm() {
  formTitle.value = "Crear activo";
  activoItem.value = {};
  isEdit.value = false;
  showForm.value = true;
}

function showEditActivoForm(item) {
  formTitle.value = "Editar item";
  activoItem.value = item;
  isEdit.value = true;
  showForm.value = true;
}

async function editOrCreate(activoData, isEdit) {
  if (isEdit) {
    await updateActivo(activoData);
  } else {
    await createActivo(activoData);
  }
  closeForm();
  listActivos();
}

function closeForm() {
  showForm.value = false;
}

function createActivo(data) {
  client.models.Activo.create({
    nombre: data.nombre,
    salaId: data.salaId,
    tipoId: data.tipoId,
  })
    .then((el) => {
      // el.data.id: nuevo elemento creado
      return client.models.ActivoSala.create({
        activoId: el.data.id,
        salaId: data.salaId,
      });
    })
    .then((el) => {
      listActivos();
    });
}

onMounted(async () => {
  listActivos();
});
</script>
