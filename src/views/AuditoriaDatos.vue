<template>
  <v-container v-if="!showForm">
    <div class="grid">
      <div class="idTitle text-h6 text-right font-weight-light">Id:</div>
      <div class="identifier text-h5">{{ store.currentAuditoria.id }}</div>
      <div class="nombreTitle text-h6 text-right font-weight-light">
        Nombre:
      </div>
      <div class="nombre text-h5">{{ store.currentAuditoria.nombre }}</div>
      <div class="buttons">
        <v-btn icon="mdi-pencil" variant="text" @click="editAuditoria"></v-btn>
      </div>
    </div>
  </v-container>

  <AuditoriaForm
    v-else
    :formTitle="store.currentAuditoria.id"
    @envio="updateAuditoria"
    @close="closeForm"
    :auditoriaItem="store.currentAuditoria"
    :isEdit="true"
  ></AuditoriaForm>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "../store/app";

const store = useAppStore();
const props = defineProps(["auditoria"]);

let showForm = ref(false);

function editAuditoria() {
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
}

async function updateAuditoria(item) {
  await store.updateAuditoria(item);
  closeForm();
  await store.setCurrentAuditoria(item.id);
  await store.getAuditorias();
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
