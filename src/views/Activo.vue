<template>
  <ActivoForm
    @submit="(el) => $emit('editActivo', el)"
    :salas="salas"
    :tipos="tipos"
    :activoItem="activoItem"
  ></ActivoForm>
</template>

<script setup>
const props = defineProps(["salas", "tipos", "activoItem"]);
</script>
