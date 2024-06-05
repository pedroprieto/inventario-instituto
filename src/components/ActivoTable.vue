<template>
  <ListView
    v-if="!showForm"
    @delete="deleteItem"
    @edit="showEditActivoForm"
    @visit="visitActivo"
    title="Activos"
    :items="store.activos"
    :loading="loading"
  >
    <template #anyadir>
      <v-btn @click="showCreateActivoForm" color="primary" dark>
        <v-icon size="large" class="me-2"> mdi-plus </v-icon>
        Añadir
      </v-btn>
      <v-btn @click="showBatchActivoForm" color="secondary" dark>
        <v-icon size="large" class="me-2"> mdi-plus-box-multiple </v-icon>
        Añadir batch
      </v-btn>
    </template>

    <template #titulo="{ nombre, salaId }">
      {{ nombre }}
    </template>

    <template #subtitulo="{ nombre, salaId }">
      {{ store.getNombreSalaById(salaId) }}
    </template>

    <template #avatar="{ tipoId }">
      <v-avatar color="grey-lighten-1">
        <v-icon color="white">mdi-{{ store.getIconoTipoById(tipoId) }}</v-icon>
      </v-avatar>
    </template>
  </ListView>
  <ActivoForm
    :formTitle="formTitle"
    v-else-if="showForm == 1"
    @envio="editOrCreate"
    @close="closeForm"
    :activoItem="store.currentItem"
    :isEdit="isEdit"
  ></ActivoForm>
  <BatchActivoForm
    formTitle="Añadir un conjunto de activos"
    v-else
    @envio="batchCreate"
    @close="closeForm"
  ></BatchActivoForm>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useAppStore } from "../store/app";
const emit = defineEmits(["changeEvent"]);

const store = useAppStore();

const client = generateClient();
let loading = ref(false);
let showForm = ref(0);
let isEdit = ref(false);
let formTitle = ref("");

function showCreateActivoForm() {
  formTitle.value = "Crear activo";
  store.currentItem = {};
  isEdit.value = false;
  showForm.value = 1;
}

function showBatchActivoForm() {
  showForm.value = 2;
}

function showEditActivoForm(item) {
  formTitle.value = "Editar item";
  store.currentItem = {};
  isEdit.value = false;
  isEdit.value = true;
  showForm.value = 1;
}

function visitActivo(item) {
  router.push({
    name: "activoDatos",
    params: { activo: item.id },
  });
}

async function editOrCreate(activoData, isEdit) {
  if (isEdit) {
    await store.updateActivo(activoData);
  } else {
    await store.createActivo(activoData);
  }
  closeForm();
  emit("changeEvent");
}

async function batchCreate(data) {
  await store.batchCreateActivos(data);
  closeForm();
  emit("changeEvent");
}

async function deleteItem(item) {
  await store.deleteActivo(item);

  emit("changeEvent");
}

function closeForm() {
  showForm.value = 0;
}
</script>
