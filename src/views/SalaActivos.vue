<template>
  <ActivoTable @changeEvent="update"> </ActivoTable>
</template>

<script setup>
import { useAppStore } from "../store/app";
import { defineProps } from "vue";
const props = defineProps(["sala"]);
const store = useAppStore();

store.backURL = {
  name: "salas",
};

await store.listActivosBySalaId(props.sala);

function update() {
  store.listActivosBySalaId(props.sala);
}
</script>
