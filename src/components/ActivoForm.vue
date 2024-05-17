<template>
  <v-dialog :model-value="mostrar" :fullscreen="true">
    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h4">{{ formTitle }}</span>
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
              :items="store.salas"
              item-title="nombre"
              item-value="id"
              label="Sala"
            ></v-select>
            <v-select
              v-model="activoData.tipoId"
              :items="store.tipos"
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
            <v-btn type="button" @click="closeForm">Cancelar</v-btn>
          </v-form>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "../store/app";

const store = useAppStore();
const emit = defineEmits(["envio", "close"]);
const props = defineProps(["formTitle", "activoItem", "isEdit"]);
let disabled = ref(false);
let activoData = ref(Object.assign({}, props.activoItem));
let mostrar = ref(true);

function enviar() {
  disabled.value = true;
  emit("envio", activoData.value, props.isEdit);
}

function closeForm() {
  mostrar.value = false;
  emit("close");
}
</script>
