<template>
  <v-row class="text-center">
    <v-col>
      <v-card>
        <v-card-item>
          <v-row>
            <v-col>Existentes</v-col>
            <v-col>Nuevos</v-col>
            <v-col>Auditados</v-col>
          </v-row>
          <v-row class="text-h2">
            <v-col>{{ existentes }}</v-col>
            <v-col>{{ nuevos }}</v-col>
            <v-col>{{ auditados }}</v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>

  <v-row v-if="!store.currentAuditoria.cerrada">
    <v-col>
      <v-text-field
        label="Id"
        append-icon="mdi-send"
        @click:append="addToAuditoria"
        v-model="idAuditar"
        density="compact"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row align="center" v-if="!store.currentAuditoria.cerrada">
    <v-col>
      <v-switch
        v-model="enableQR"
        density="compact"
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

  <v-row v-if="!store.currentAuditoria.cerrada">
    <v-col>
      <v-divider></v-divider>
    </v-col>
  </v-row>

  <v-list>
    <v-list-item
      :base-color="colorItem(item)"
      v-for="item in items"
      :key="item.id"
      :value="item.id"
      @click="toggleAuditoria(item)"
      :disabled="store.currentAuditoria.cerrada"
    >
      <v-list-item-title>
        {{ item.nombre }}
      </v-list-item-title>

      <template v-slot:append>
        <v-checkbox v-model="item.auditado" icon="mdi-check" variant="text">
        </v-checkbox>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useAppStore } from "../store/app";
const emit = defineEmits(["changeEvent", "auditar"]);
const props = defineProps(["items"]);

import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

const store = useAppStore();

const client = generateClient();
let loading = ref(false);
let idAuditar = ref("");

let enableQR = ref(false);
let search = ref("");

const auditados = computed(() => {
  return props.items.filter((el) => el.auditado).length;
});

const existentes = computed(() => {
  return props.items.filter((el) => !el.nuevo).length;
});

const nuevos = computed(() => {
  return props.items.filter((el) => el.nuevo).length;
});

function onDetect(code) {
  idAuditar.value = code[0].rawValue;
  addToAuditoria();
}

function addToAuditoria() {
  emit("auditar", idAuditar.value);
}

function colorItem(item) {
  if (item.nuevo) return "warning";
  if (item.auditado) return "primary";
  return "";
}

async function toggleAuditoria(item) {
  if (!item.auditado) {
    emit("auditar", item.id);
  } else {
    await store.deleteActivoAuditoria(item);
    emit("changeEvent");
  }
}
</script>
