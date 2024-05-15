<template>
  <v-container v-if="!showForm">
    <div class="grid">
      <div class="idTitle text-h6 text-right font-weight-light">Id:</div>
      <div class="identifier text-h5">{{ store.currentSala.id }}</div>
      <div class="nombreTitle text-h6 text-right font-weight-light">
        Nombre:
      </div>
      <div class="nombre text-h5">{{ store.currentSala.nombre }}</div>
      <div class="buttons">
        <v-btn icon="mdi-pencil" variant="text" @click="editSala"></v-btn>
      </div>
    </div>
  </v-container>

  <SalaForm
    v-else
    :formTitle="store.currentSala.id"
    @envio="updateSala"
    @close="closeForm"
    :salaItem="store.currentSala"
    :isEdit="true"
  ></SalaForm>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "../store/app";

const store = useAppStore();
const props = defineProps(["sala"]);

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
}
</script>

<style scoped>
.grid {
  grid-template-columns: 1fr 6fr 1fr;
  display: grid;
  row-gap: 10px;
  column-gap: 10px;
  align-items: center;
  grid-template-areas:
    "idTitle identifier buttons"
    "nombreTitle nombre .";
}

.idTitle {
  grid-area: idTitle;
}
.identifier {
  grid-area: identifier;
}
.buttons {
  grid-area: buttons;
  justify-self: end;
}
</style>
