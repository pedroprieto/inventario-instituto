<template>
  <v-navigation-drawer v-model="store.drawer">
    <v-list>
      <v-list-item v-for="route of mainRoutes" :to="route.path">{{
        route.meta.prompt
      }}</v-list-item>
      <v-divider></v-divider>
      <v-list-item> {{ store.user.signInDetails.loginId }} </v-list-item>
      <v-list-item>
        <v-btn color="secondary" @click="signOut">Cerrar sesión</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, watch, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../../store/app";
import { useAuthenticator } from "@aws-amplify/ui-vue";

const router = useRouter();
const store = useAppStore();

const { signOut } = toRefs(useAuthenticator());

let selectedSala = ref("");

const mainRoutes = router
  .getRoutes()
  .filter((route) => route.meta && route.meta.mainMenu);

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
