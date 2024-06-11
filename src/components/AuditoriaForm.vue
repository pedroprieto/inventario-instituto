<template>
  <v-dialog :model-value="true" :fullscreen="true">
    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form @submit.prevent="enviar">
              <v-select
                v-model="auditoriaData.tipos"
                :items="store.tipos"
                item-title="nombre"
                item-value="id"
                label="Tipos"
                chips
                multiple
              ></v-select>
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
          </v-container>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["formTitle", "auditoriaItem", "isEdit"]);
let auditoriaData = ref(Object.assign({}, props.auditoriaItem));
const emit = defineEmits(["envio", "close"]);
let disabled = ref(false);
import { useAppStore } from "../store/app";
const store = useAppStore();

function enviar() {
  disabled.value = true;
  emit("envio", auditoriaData.value, props.isEdit);
}
</script>
