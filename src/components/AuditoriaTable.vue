<template>
  <v-container>
    <ListView
      v-if="!showForm"
      @delete="deleteItem"
      @edit="showEditAuditoriaForm"
      @visit="visitAuditoria"
      :headers="headers"
      title="Auditorias"
      :items="store.auditorias"
      :loading="loading"
    >
      <template #anyadir>
        <v-btn
          @click="showCreateAuditoriaForm"
          color="primary"
          dark
          class="mb-2"
        >
          <v-icon size="large" class="me-2"> mdi-plus </v-icon>
          Añadir
        </v-btn>
      </template>
    </ListView>
    <AuditoriaForm
      :formTitle="formTitle"
      v-else
      @envio="editOrCreate"
      @close="closeForm"
      :auditoriaItem="auditoriaItem"
      :isEdit="isEdit"
    ></AuditoriaForm>
  </v-container>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useAppStore } from "../store/app";
const emit = defineEmits(["changeEvent"]);
import { defineProps } from "vue";
const props = defineProps(["salaId"]);

const store = useAppStore();

const headers = [
  {
    title: "Fecha creación",
    align: "start",
    sortable: true,
    key: "createdAt",
  },
  {
    title: "Tipos",
    align: "start",
    sortable: true,
    key: "tipos",
  },
  {
    title: "Finalizada",
    align: "start",
    sortable: true,
    key: "cerrada",
  },
  { key: "actions", title: "Acciones", sortable: false, align: "end" },
];

const client = generateClient();
let auditoriaItem = ref({});
let loading = ref(false);
let showForm = ref(false);
let isEdit = ref(false);
let formTitle = ref("");

function showCreateAuditoriaForm() {
  formTitle.value = "Crear auditoria";
  auditoriaItem.value = {};
  isEdit.value = false;
  showForm.value = true;
}

function showEditAuditoriaForm(item) {
  formTitle.value = "Editar item";
  auditoriaItem.value = item;
  isEdit.value = false;
  isEdit.value = true;
  showForm.value = true;
}

function visitAuditoria(item) {
  router.push({
    name: "auditoriaDatos",
    params: { auditoria: item.id },
  });
}

async function editOrCreate(auditoriaData, isEdit) {
  auditoriaData.salaId = props.salaId;
  if (isEdit) {
    await store.updateAuditoria(auditoriaData);
  } else {
    await store.createAuditoria(auditoriaData);
  }
  closeForm();
  emit("changeEvent");
}

async function deleteItem(item) {
  await store.deleteAuditoria(item);

  emit("changeEvent");
}

function closeForm() {
  showForm.value = false;
}
</script>
