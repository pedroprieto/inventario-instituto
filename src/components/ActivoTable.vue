<template>
  <v-container>
    <ListView
      v-if="!showForm"
      @delete="deleteItem"
      @edit="showEditActivoForm"
      @visit="visitActivo"
      :headers="headers"
      title="Activos"
      :items="store.activos"
      :loading="loading"
    >
      <template #anyadir>
        <v-btn @click="showCreateActivoForm" color="primary" dark class="mb-2">
          <v-icon size="large" class="me-2"> mdi-plus </v-icon>
          Añadir
        </v-btn>
      </template>
    </ListView>
    <ActivoForm
      :formTitle="formTitle"
      v-else
      @envio="editOrCreate"
      @close="closeForm"
      :activoItem="store.currentItem"
      :isEdit="isEdit"
    ></ActivoForm>
  </v-container>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useAppStore } from "../store/app";
const emit = defineEmits(["changeEvent"]);

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
let loading = ref(false);
let showForm = ref(false);
let isEdit = ref(false);
let formTitle = ref("");

function showCreateActivoForm() {
  formTitle.value = "Crear activo";
  store.currentItem = {};
  isEdit.value = false;
  showForm.value = true;
}

function showEditActivoForm(item) {
  formTitle.value = "Editar item";
  store.currentItem = {};
  isEdit.value = false;
  isEdit.value = true;
  showForm.value = true;
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

async function deleteItem(item) {
  await store.deleteActivo(item);

  emit("changeEvent");
}

function closeForm() {
  showForm.value = false;
}
</script>
