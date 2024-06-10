<template>
  <v-container>
    <div class="grid">
      <div class="idTitle text-h6 text-right font-weight-light">Id:</div>
      <div class="identifier text-h6">{{ store.currentItem.id }}</div>
      <div class="buttons">
        <v-btn
          size="small"
          icon="mdi-pencil"
          color="secondary"
          @click="editItem"
        ></v-btn>
        <v-btn
          size="small"
          color="primary"
          icon="mdi-printer"
          :to="{ name: 'activoImprimir', query: { activos: props.activo } }"
        ></v-btn>
      </div>
      <div class="nombreTitle text-h6 text-right font-weight-light">
        Nombre:
      </div>
      <div class="nombre text-h5">{{ store.currentItem.nombre }}</div>
      <div class="salaTitle text-h6 text-right font-weight-light">Sala:</div>
      <div class="sala text-h5">{{ store.currentItem.sala.nombre }}</div>
      <div class="tipoTitle text-h6 text-right font-weight-light">Tipo:</div>
      <div class="tipo text-h5">{{ store.currentItem.tipo.nombre }}</div>
      <div class="qr">
        <qrcode-vue
          class="qrcode"
          :value="store.currentItem.id"
          :size="size"
          :level="level"
          :render-as="renderAs"
        />
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";
import { useAppStore } from "../store/app";
import { useRouter } from "vue-router";
const router = useRouter();

const store = useAppStore();
const props = defineProps(["activo"]);

const level = ref("M");
const size = ref(100);
const renderAs = ref("svg");

function editItem() {
  router.push({
    name: "activoEdit",
    params: { activo: props.activo },
  });
}
</script>

<style scoped>
.grid {
  grid-template-columns: 1fr 6fr 1fr 2fr;
  display: grid;
  row-gap: 10px;
  column-gap: 10px;
  align-items: center;
  grid-template-areas:
    ". . buttons buttons"
    "idTitle identifier identifier identifier"
    "nombreTitle nombre qr qr"
    "salaTitle sala qr qr"
    "tipoTitle tipo qr qr";
}

.idTitle {
  grid-area: idTitle;
}
.identifier {
  grid-area: identifier;
}
.nombreTitle {
  grid-area: nombreTitle;
}
.nombre {
  grid-area: nombre;
}
.salaTitle {
  grid-area: salaTitle;
}
.sala {
  grid-area: sala;
}
.tipoTitle {
  grid-area: tipoTitle;
}
.tipo {
  grid-area: tipo;
}
.qr {
  grid-area: qr;
  justify-self: right;
}

.qrcode {
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  padding: 0;
}

.buttons {
  grid-area: buttons;
  justify-self: end;
}
</style>
