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

await store.listAuditoriasBySalaId(props.sala);

function update() {
  store.listAuditoriasBySalaId(props.sala);
}
</script>
