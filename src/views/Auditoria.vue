<template>
  <v-row>
    <v-col>
      Auditoria:
      {{ new Date(store.currentAuditoria.createdAt).toLocaleString() }}
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      Tipos:
      <v-chip size="x-small" v-for="tipo in store.currentAuditoria.tipos">
        {{ store.getNombreTipoById(tipo) }}
      </v-chip>
      <v-btn
        v-if="!store.currentAuditoria.cerrada"
        icon="mdi-pencil"
        variant="text"
        @click="editAuditoria"
      ></v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-icon
        v-if="store.currentAuditoria.cerrada"
        icon="mdi-check"
        color="success"
      >
      </v-icon>
      <v-btn color="primary" v-else @click="cerrarAuditoria"
        >Cerrar auditoría</v-btn
      >
    </v-col>
  </v-row>

  <ActivoAuditoria
    :items="items"
    @changeEvent="update"
    @auditar="addToAuditoria"
  >
  </ActivoAuditoria>

  <AuditoriaForm
    v-if="showForm"
    :formTitle="store.currentAuditoria.id"
    @envio="updateAuditoria"
    @close="closeForm"
    :auditoriaItem="store.currentAuditoria"
    :isEdit="true"
  ></AuditoriaForm>

  <DialogDelete
    @close="close"
    @accept="cerrarAuditoriaConfirm"
    v-model="dialogCerrar"
    :message="`¿Desea cerrar la auditoría? Se asignarán los nuevos activos a la sala indicada; los activos de la sala que estén sin asignar, se asignarán a la sala 'DESCONOCIDA'`"
  ></DialogDelete>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useAppStore } from "../store/app";

const store = useAppStore();
const props = defineProps(["sala", "auditoria"]);

let items = ref([]);
let showForm = ref(false);
let dialogCerrar = ref(false);

store.backURL = {
  name: "salaAuditorias",
  params: { sala: props.sala },
};

function closeForm() {
  showForm.value = false;
}

function cerrarAuditoria() {
  dialogCerrar.value = true;
}

async function cerrarAuditoriaConfirm() {
  let promises = [];
  for (let it of items.value) {
    if (it.auditado) {
      it.salaId = props.sala;
    } else {
      it.salaId = 0;
    }
    promises.push(store.updateActivo(it));
  }
  await Promise.all(promises);
  store.currentAuditoria.cerrada = true;
  store.updateAuditoria(store.currentAuditoria);
  close();
}

async function close() {
  dialogCerrar.value = false;
  // await nextTick();
}

function editAuditoria() {
  showForm.value = true;
}

async function updateAuditoria(item) {
  await store.updateAuditoria(item);
  closeForm();
  await store.setCurrentAuditoria(item.id);
}

import { useRouter } from "vue-router";
const router = useRouter();

function volverLista() {
  router.push({
    name: "auditorias",
    params: { sala: sala },
  });
}

async function update() {
  //  store.listActivosByAuditoriaId(props.auditoria);

  let activosAuditados = await store.getActivosByAuditoriaId(props.auditoria);

  let its = store.activos
    .filter((el) => {
      return store.currentAuditoria.tipos.includes(el.tipoId);
    })
    .map((el) => {
      let newEl = el;
      newEl.auditado = false;
      newEl.nuevo = false;
      newEl.auditoriaId = props.auditoria;
      return newEl;
    });

  for (let item of activosAuditados) {
    let el2 = its.find((el) => el.id == item.activoId);
    if (el2) {
      el2.auditado = true;
      el2.nuevo = false;
    } else {
      let nuevoActivoDatos = await store.getActivo(item.activoId);
      nuevoActivoDatos.auditado = true;
      nuevoActivoDatos.nuevo = true;
      nuevoActivoDatos.auditoriaId = props.auditoria;
      its.push(nuevoActivoDatos);
    }
  }
  items.value = its;
}

update();

async function addToAuditoria(idActivo) {
  let activo = await store.getActivo(idActivo);
  if (!activo) {
    alert("No existe en el sistema");
    return;
  }
  await store.createActivoAuditoria(idActivo, props.auditoria);
  await update();
  //  activosAuditados.push(activo);
  //  store.listActivosByAuditoriaId(props.auditoria);
}
</script>
