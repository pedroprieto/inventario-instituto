<template>
  <v-container>
    <v-card>
      <v-card-item>
        <v-card-title>
          <v-container>
            <v-row>
              <v-col> Auditoria: {{ store.currentAuditoria.id }} </v-col>
            </v-row>
          </v-container>
        </v-card-title>
        <v-card-subtitle>
          <v-tabs color="deep-purple-accent-4" align-tabs="center">
            <v-tab
              :to="{
                name: 'auditoriaDatos',
                params: { sala: sala, auditoria: auditoria },
              }"
              >Datos
            </v-tab>
            <v-tab
              :to="{
                name: 'auditoriaActivos',
                params: { sala: sala, auditoria: auditoria },
              }"
              >Activos
            </v-tab>
          </v-tabs>
        </v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-card elevation="10">
          <router-view> </router-view>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAppStore } from "../store/app";

const store = useAppStore();
const props = defineProps(["sala", "auditoria"]);

let selectedAuditoria = ref(props.auditoria);

await store.setCurrentAuditoria(props.auditoria);

import { useRouter } from "vue-router";
const router = useRouter();

function volverLista() {
  router.push({
    name: "auditorias",
    params: { sala: sala },
  });
}
</script>
