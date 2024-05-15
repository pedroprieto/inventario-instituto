<template>
  <v-container>
    <v-card>
      <v-card-item>
        <v-card-title>Sala: {{ sala }}</v-card-title>
        <v-select
          v-model="selectedSala"
          :items="store.salas"
          item-title="nombre"
          item-value="id"
          label="Salas"
        ></v-select>
        <v-card-subtitle>
          <v-tabs color="deep-purple-accent-4" align-tabs="center">
            <v-tab
              :to="{
                name: 'salaDatos',
                params: { sala: sala },
              }"
              >Datos
            </v-tab>
            <v-tab
              :to="{
                name: 'salaActivos',
                params: { sala: sala },
              }"
              >Activos
            </v-tab>
            <v-tab
              :to="{
                name: 'salaAuditorias',
                params: { sala: sala },
              }"
              >Auditorías
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
import { generateClient } from "aws-amplify/data";
import { ref, watch } from "vue";
import { useAppStore } from "../store/app";

const store = useAppStore();
const props = defineProps(["sala"]);

let selectedSala = ref(props.sala);

await store.setCurrentSala(props.sala);

watch(selectedSala, async (newSala, oldSala) => {
  router.push({
    name: "salaDatos",
    params: { sala: newSala },
  });

  await store.setCurrentSala(newSala);
});

import { useRouter } from "vue-router";
const router = useRouter();

const client = generateClient();

function volverLista() {
  router.push({
    name: "salas",
  });
}
</script>
