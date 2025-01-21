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

function update() {
  store.listActivosBySalaId(props.sala);
}

import { onMounted } from "vue";
onMounted(async () => {
  await store.listActivosBySalaId(props.sala);
});
</script>
