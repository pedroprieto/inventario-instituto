<template>
  <AuditoriaTable @changeEvent="update" :salaId="props.sala"> </AuditoriaTable>
</template>

<script setup>
import { useAppStore } from "../store/app";
import { defineProps } from "vue";
const props = defineProps(["sala"]);
const store = useAppStore();

store.backURL = {
  name: "salas",
};

function update() {
  store.listAuditoriasBySalaId(props.sala);
}

import { onMounted } from "vue";
onMounted(async () => {
  await store.listAuditoriasBySalaId(props.sala);
});
</script>
