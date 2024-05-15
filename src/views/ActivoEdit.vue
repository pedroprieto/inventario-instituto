<template>
  <ActivoForm
    :formTitle="store.currentItem.nombre"
    @envio="update"
    @close="closeForm"
    :salas="store.salas"
    :tipos="store.tipos"
    :activoItem="store.currentItem"
    :isEdit="true"
  ></ActivoForm>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAppStore } from "../store/app";

const store = useAppStore();
const router = useRouter();

function closeForm() {
  router.back();
}

async function update(item) {
  await store.updateActivo(item);
  await store.setCurrentItem(item.id);
  closeForm();
}
</script>
