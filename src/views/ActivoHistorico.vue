<template>
  <div>histórico</div>

  <div v-for="sala in store.currentItem.salas">
    {{ store.currentItem.salaId }}
  </div>
</template>

<script setup>
import { useAppStore } from "../store/app";

const store = useAppStore();
const props = defineProps(["activo"]);
</script>
