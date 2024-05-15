<template>
  <v-dialog :model-value="true" :fullscreen="true">
    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="enviar">
            <v-text-field
              label="Nombre"
              text="Nombre"
              v-model="activoData.nombre"
            ></v-text-field>
            <v-select
              v-model="activoData.salaId"
              :items="salas"
              item-title="nombre"
              item-value="id"
              label="Sala"
            ></v-select>
            <v-select
              v-model="activoData.tipoId"
              :items="tipos"
              item-title="nombre"
              item-value="id"
              label="Tipo"
            ></v-select>
            <v-text-field
              label="Número de serie"
              v-model="activoData.numeroSerie"
            ></v-text-field>
            <v-btn
              :disabled="disabled"
              class="me-4"
              type="submit"
              color="primary"
              >Enviar</v-btn
            >
            <v-btn class="me-4" type="button" @click="$emit('close')"
              >Cancelar</v-btn
            >
          </v-form>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["envio", "close"]);
const props = defineProps([
  "formTitle",
  "salas",
  "tipos",
  "activoItem",
  "isEdit",
]);
let disabled = ref(false);
let activoData = ref(Object.assign({}, props.activoItem));

function enviar() {
  disabled.value = true;
  emit("envio", activoData.value, props.isEdit);
}
</script>
