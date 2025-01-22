<template>
  <template v-if="store.currentSala">
    <template v-if="!showForm">
      <v-row>
        <v-col cols="12" align="center" class="text-h5 font-weight-bold">
          Sala: {{ store.currentSala.nombre }}
          <v-btn icon="mdi-pencil" variant="text" @click="editSala"></v-btn>
        </v-col>
      </v-row>
      <v-tabs color="deep-purple-accent-4" align-tabs="center">
        <v-tab
          :to="{
            name: 'salaActivos',
            params: { sala: sala },
          }"
          >Activos
        </v-tab>
        <v-tab
          v-if="selectedSala != 0"
          :to="{
            name: 'salaAuditorias',
            params: { sala: sala },
          }"
          >Auditorías
        </v-tab>
      </v-tabs>
      <v-tabs-window>
        <router-view> </router-view>
      </v-tabs-window>
    </template>

    <SalaForm
      v-else
      :formTitle="store.currentSala.id"
      @envio="updateSala"
      @close="closeForm"
      :salaItem="store.currentSala"
      :isEdit="true"
    ></SalaForm>
  </template>
</template>

<script setup>
import { generateClient } from "aws-amplify/data";
import { ref, watch, computed } from "vue";
import { useAppStore } from "../store/app";

const store = useAppStore();
const props = defineProps(["sala"]);

store.backURL = {
  name: "salas",
};

let selectedSala = ref(props.sala);

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

let showForm = ref(false);

function editSala() {
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
}

async function updateSala(item) {
  await store.updateSala(item);
  closeForm();
  await store.setCurrentSala(item.id);
  await store.getSalas();
}

import { onMounted } from "vue";
onMounted(async () => {
  await store.setCurrentSala(props.sala);
});
</script>
