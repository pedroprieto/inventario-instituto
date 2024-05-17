<template>
  <ActivoAuditoria
    :items="items"
    @changeEvent="update"
    @auditar="addToAuditoria"
  >
  </ActivoAuditoria>
</template>

<script setup>
import { useAppStore } from "../store/app";
import { ref, defineProps } from "vue";
const props = defineProps(["sala", "auditoria"]);
const store = useAppStore();

let items = ref([]);

await store.listActivosBySalaId(props.sala);

async function update() {
  //  store.listActivosByAuditoriaId(props.auditoria);

  let activosAuditados = await store.getActivosByAuditoriaId(props.auditoria);

  let its = store.activos.map((el) => {
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
  await store.createActivoAuditoria(idActivo, props.auditoria);
  await update();
  //  activosAuditados.push(activo);
  //  store.listActivosByAuditoriaId(props.auditoria);
}
</script>
