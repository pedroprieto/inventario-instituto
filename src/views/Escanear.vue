<template>
  <v-card>
    <v-card-item>
      <v-card-title>Buscar por id o escanear QR</v-card-title>
    </v-card-item>
    <v-card-text>
      <v-form @submit="navegar">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Introducir ID del activo"
                v-model="activoId"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="6">
              <v-btn type="submit" block color="primary" dark class="mb-2">
                <v-icon size="large" class="me-2">mdi-text-search</v-icon>
                Buscar activo
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-divider thickness="5"></v-divider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" offset="3">
              <qrcode-stream class="qr" @detect="onDetect"></qrcode-stream>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

const router = useRouter();

let activoId = ref("");

function onDetect(code) {
  activoId.value = code[0].rawValue;
  navegar();
}

function navegar() {
  router.push({
    name: "activoDatos",
    params: { activo: activoId.value },
  });
}
</script>

<style scoped>
.qr {
}
</style>
