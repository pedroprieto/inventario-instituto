<template>
  <v-dialog :model-value="mostrar" :fullscreen="true">
    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h4">{{ formTitle }}</span>
        </v-card-title>
        <v-card-subtitle>
          <span class="text-h7"
            >Ejemplo: <br />Prefijo: <b>Silla</b> <br />
            Núm. elementos: <b>3</b><br />
            Núm. inicial: <b>20</b><br />
            Se crearán los activos: "<b>Silla20</b>", "<b>Silla21</b>" y
            "<b>Silla22</b>"
          </span>
        </v-card-subtitle>
        <v-card-text>
          <v-form @submit.prevent="enviar" ref="formulario">
            <v-select
              :rules="nameRules"
              v-model="activoData.salaId"
              :items="store.salas"
              item-title="nombre"
              item-value="id"
              label="Sala"
            ></v-select>
            <v-select
              :rules="nameRules"
              v-model="activoData.tipoId"
              :items="store.tipos"
              item-title="nombre"
              item-value="id"
              label="Tipo"
            ></v-select>
            <v-text-field
              :rules="nameRules"
              label="Prefijo"
              v-model="activoData.prefijo"
            ></v-text-field>
            <v-text-field
              :rules="nameRules"
              label="Número de elementos"
              type="number"
              v-model="activoData.numero"
            ></v-text-field>
            <v-text-field
              :rules="nameRules"
              label="Número inicial"
              type="number"
              v-model="activoData.inicial"
            ></v-text-field>
            <v-btn
              :disabled="disabled"
              class="me-4"
              type="submit"
              color="primary"
              >Enviar</v-btn
            >
            <v-btn class="me-4" type="button" @click="closeForm"
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
import { useAppStore } from "../store/app";

const store = useAppStore();
const emit = defineEmits(["envio", "close"]);
const props = defineProps(["formTitle"]);
let disabled = ref(false);
let activoData = ref({});
let mostrar = ref(true);
let formulario = ref(null);
let nameRules = [(v) => !!v || "Dato obligatorio"];

async function enviar() {
  const { valid } = await formulario.value.validate();
  if (!valid) return;
  disabled.value = true;
  emit("envio", activoData.value);
}

function closeForm() {
  mostrar.value = false;
  emit("close");
}
</script>
