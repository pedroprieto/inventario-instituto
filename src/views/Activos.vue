<template>
  <ActivoTable v-if="useRoute().name == 'activos'" @changeEvent="update">
  </ActivoTable>
  <router-view v-else></router-view>
</template>

<script setup>
import { useAppStore } from "../store/app";
import { useRoute } from "vue-router";

const store = useAppStore();

function update() {
  store.listActivos();
}

import { onMounted } from "vue";
onMounted(async () => {
  await store.listActivos();
});
</script>
