<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="Id" v-model="idAuditar"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="addToAuditoria" color="primary" dark class="mb-2">
          <v-icon size="large" class="me-2"> mdi-plus-box-multiple </v-icon>
          Auditar
        </v-btn>
      </v-col>
      <v-col>
        <v-switch
          v-model="enableQR"
          label="Escanear QR"
          color="primary"
          dark
          class="mb-2"
        >
        </v-switch>
      </v-col>
      <v-col v-if="enableQR">
        <qrcode-stream @detect="onDetect"></qrcode-stream>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-length="items.length"
      :loading="loading"
      :search="search"
      item-value="name"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Activos auditados</v-toolbar-title>
          <v-text-field
            v-model="search"
            label="Buscar"
            density="compact"
            prepend-inner-icon="mdi-magnify"
            single-line
            hide-details
            flat
            variant="solo-filled"
          ></v-text-field>

          <slot name="busqueda"> </slot>
          <v-spacer></v-spacer>

          <slot name="anyadir"> </slot>
        </v-toolbar>
      </template>

      <template v-slot:item.tipos="{ item }">
        <v-chip size="x-small" v-for="tipo in item.tipos">
          {{ store.getNombreTipoById(tipo) }}
        </v-chip>
      </template>

      <template v-slot:item.nuevo="{ item }">
        <v-icon
          v-if="item.nuevo"
          icon="mdi-alert-circle"
          color="warning"
        ></v-icon>
      </template>
      <template v-slot:item.salaId="{ item }">
        {{ store.getNombreSalaById(item.salaId) }}</template
      >
      <template v-slot:item.tipoId="{ item }">
        {{ store.getNombreTipoById(item.tipoId) }}</template
      >
      <template v-slot:item.actions="{ item }">
        <v-checkbox
          class="d-flex justify-end"
          v-model="item.auditado"
          :color="item.nuevo ? 'warning' : 'primary'"
          icon="mdi-check"
          variant="text"
          @change="toggleAuditoria(item)"
        >
        </v-checkbox>
      </template>
    </v-data-table>
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

import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

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
    title: "Nuevo",
    align: "start",
    sortable: true,
    key: "nuevo",
  },
  { key: "actions", title: "Acciones", sortable: false, align: "end" },
];

const client = generateClient();
let loading = ref(false);
let idAuditar = ref("");

let enableQR = ref(false);
let search = ref("");

function onDetect(code) {
  idAuditar.value = code[0].rawValue;
  addToAuditoria();
}

function addToAuditoria() {
  emit("auditar", idAuditar.value);
}

async function toggleAuditoria(item) {
  if (item.auditado) {
    emit("auditar", item.id);
  } else {
    await store.deleteActivoAuditoria(item);
    emit("changeEvent");
  }
}
</script>
