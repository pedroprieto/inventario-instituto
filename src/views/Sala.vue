<template>
  <v-card>
    <v-card-item>
      <v-card-title align="center">
        <v-row>
          <v-col cols="12" sm="9"> Sala: {{ store.currentSala.nombre }} </v-col>
          <v-col cols="12" sm="3"> </v-col>
        </v-row>
      </v-card-title>
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
      <v-tabs-window>
        <router-view> </router-view>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { ref, watch, computed } from "vue";
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

import { useRoute, useRouter } from "vue-router";
const router = useRouter();

const client = generateClient();

function volverLista() {
  router.push({
    name: "salas",
  });
}
</script>
