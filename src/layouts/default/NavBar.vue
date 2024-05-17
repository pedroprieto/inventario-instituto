<template>
  <v-container>
    <v-breadcrumbs :items="useRoute().matched">
      <template v-slot:title="{ item }">
        <RouterLink :to="{ name: item.name, params: useRoute().params }">
          {{ item.meta.prompt }}
        </RouterLink>
      </template>
    </v-breadcrumbs>

    <!--
    <v-select
      v-model="selectedSala"
      :items="store.salas"
      item-title="nombre"
      item-value="id"
      density="compact"
      variant="plain"
    ></v-select>
-->
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../../store/app";
const router = useRouter();
const store = useAppStore();

let selectedSala = ref("");

watch(selectedSala, async (newSala, oldSala) => {
  router.push({
    name: "salaDatos",
    params: { sala: newSala },
  });

  await store.setCurrentSala(newSala);
});

const getMainMenu = computed(() => {
  return router
    .getRoutes()
    .filter((route) => route.meta.mainMenu)
    .map((el) => {
      return {
        to: route.path,
        params: route.params,
      };
    });
});
</script>
