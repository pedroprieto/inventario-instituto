<template>
  <ActivoTable v-if="useRoute().name == 'activos'" @changeEvent="update">
  </ActivoTable>
  <router-view v-else></router-view>
</template>

<script setup>
import { useAppStore } from "../store/app";
import { useRoute } from "vue-router";

const store = useAppStore();
await store.listActivos();

function update() {
  store.listActivos();
}
</script>
