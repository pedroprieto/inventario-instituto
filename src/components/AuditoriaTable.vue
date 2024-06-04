<template>
  <ListView
    v-if="!showForm"
    @delete="deleteItem"
    @edit="showEditAuditoriaForm"
    @visit="visitAuditoria"
    title="Auditorias"
    :items="store.auditorias"
    :loading="loading"
  >
    <template #anyadir>
      <v-btn @click="showCreateAuditoriaForm" color="primary" dark>
        <v-icon size="large" class="me-2"> mdi-plus </v-icon>
        Añadir
      </v-btn>
    </template>

    <template #titulo="item">
      {{ new Date(item.createdAt).toLocaleString() }}
    </template>

    <template #subtitulo="{ nombre, tipos, nuevo, auditado, cerrada }">
      <v-chip size="x-small" v-for="tipo in tipos">
        {{ store.getNombreTipoById(tipo) }}
      </v-chip>
      <v-icon v-if="nuevo" icon="mdi-check"></v-icon>
      <v-icon v-if="auditado" icon="mdi-check"></v-icon>
      <v-icon v-if="cerrada" icon="mdi-check"></v-icon>
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
    name: "auditoria",
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
