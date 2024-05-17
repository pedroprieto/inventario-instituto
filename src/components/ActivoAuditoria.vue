<template>
  <v-container>
    <v-text-field label="nombre" v-model="idAuditar"></v-text-field>
    <v-btn @click="addToAuditoria" color="primary" dark class="mb-2">
      <v-icon size="large" class="me-2"> mdi-plus-box-multiple </v-icon>
      Auditar
    </v-btn>
    <ListView
      v-if="!showForm"
      @delete="deleteItem"
      :headers="headers"
      title="Activos auditados"
      :items="items"
      :loading="loading"
    >
    </ListView>
  </v-container>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useAppStore } from "../store/app";
const emit = defineEmits(["changeEvent", "auditar"]);
const props = defineProps(["items"]);

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
  {
    title: "Auditado",
    align: "start",
    sortable: true,
    key: "auditado",
  },
  {
    title: "Nuevo",
    align: "start",
    sortable: true,
    key: "nuevo",
  },
  { key: "actions", title: "Acciones", sortable: false, align: "end" },
];

const client = generateClient();
let loading = ref(false);
let showForm = ref(0);
let isEdit = ref(false);
let formTitle = ref("");
let idAuditar = ref("");

function addToAuditoria() {
  emit("auditar", idAuditar.value);
}

async function deleteItem(item) {
  console.log(item);
  await store.deleteActivoAuditoria(item);
  emit("changeEvent");
}
</script>
