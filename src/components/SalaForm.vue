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
              <v-text-field
                label="nombre"
                v-model="salaData.nombre"
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
          </v-container>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["formTitle", "salaItem", "isEdit"]);
let salaData = ref(Object.assign({}, props.salaItem));
const emit = defineEmits(["envio", "close"]);
let disabled = ref(false);

function enviar() {
  disabled.value = true;
  emit("envio", salaData.value, props.isEdit);
}
</script>
