<template>
  <SalaTable v-if="useRoute().name == 'salas'"> </SalaTable>
  <router-view></router-view>
</template>

<script setup>
import { useRoute } from "vue-router";
</script>
