<template>
  <v-container class="etidisplay" v-if="!showForm">
    <div class="grid">
      <div class="idTitle text-h6 text-right font-weight-light">Id:</div>
      <div class="identifier text-h5">{{ store.currentItem.id }}</div>
      <div class="buttons">
        <v-btn icon="mdi-pencil" variant="text" @click="editItem"></v-btn>
        <v-btn
          icon="mdi-printer"
          variant="text"
          :to="{ name: 'activoImprimir' }"
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
          :value="store.currentItem.id"
          :size="size"
          :level="level"
          :render-as="renderAs"
        />
      </div>
    </div>
  </v-container>

  <!--
  <qrcode-capture @detect="onDetect"></qrcode-capture>
  Pedro: <v-file-input type="file" accept="image/*" capture="camera" />nuevo
  <v-btn type="button" @click="imprimir">Imprimir</v-btn>

  <div id="printable">
    <v-card-text>
      <qrcode-vue
        :value="value"
        :size="size"
        :level="level"
        :render-as="renderAs"
      />
    </v-card-text>
  </div>
  -->
</template>

<script setup>
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";
import { useAppStore } from "../store/app";
import { useRouter } from "vue-router";
const router = useRouter();

import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

function onDetect(code) {
  alert(code[0].rawValue);
}

function imprimir() {
  window.print();
}

const store = useAppStore();
const props = defineProps(["activo"]);

const level = ref("M");
const size = ref(100);
const renderAs = ref("svg");

let showForm = ref(false);

function editItem() {
  router.push({
    name: "activoEdit",
    params: { activo: props.activo },
  });
}

function closeForm() {
  showForm.value = false;
}

async function updateItem(item) {
  await store.updateActivo(item);
  closeForm();
  await store.setCurrentItem(item.id);
}
</script>

<style scoped>
@page {
  size: 4in 2in; /* auto is the initial value */
  /* this affects the margin in the printer settings */
  margin: 0;
}

.grid {
  grid-template-columns: 1fr 6fr 1fr 2fr;
  display: grid;
  row-gap: 10px;
  column-gap: 10px;
  align-items: center;
  grid-template-areas:
    "idTitle identifier . buttons"
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
  justify-self: center;
}

.buttons {
  grid-area: buttons;
  justify-self: end;
}

#printable {
  display: none;
}

.etiquetas {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

.etiqueta {
  font-size: 8.5pt;
  box-sizing: border-box;
  flex: 0 1 auto;
  width: 33.3%;
  height: 37mm; /* 8 etiquetas a lo alto */
  padding: 1mm;
  margin: 0cm; /* Sin márgenes */
  text-align: left;
  overflow: hidden;
  outline: 1px dotted; /* outline doesn't occupy space like border does */
  display: flex;
  justify-content: center;
  line-height: 1.8em;
}

.etiqueta_content {
  align-self: center;
}

.titulo {
  display: inline-block;
  width: 5em;
  text-decoration: underline;
}

.valor {
  display: inline-block;
  width: 16em;
  vertical-align: middle;
}

.ciclo {
  font: 8pt sans-serif;
}

@media print {
  .grid {
    grid-template-areas:
      "idTitle identifier qr qr"
      "nombreTitle nombre qr qr"
      "salaTitle sala qr qr"
      "tipoTitle tipo qr qr";
  }
  .buttons {
    display: none;
  }

  #printable {
    display: block;
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 600;
    background-color: red;
  }

  #noprintable {
    display: none;
  }

  button {
    display: none;
  }
  .etiquetas {
    width: 210mm;
  }
  .etiqueta {
    width: 69.99mm; /*3 etiquetas a lo ancho */
  }
  body {
    /* A4: 210 × 297*/
    width: 4in;
    height: 2in;
    padding: 0;
    font: 8.5pt sans-serif;
    margin: 0;
    margin-left: 0;
  }
  header {
    display: none;
  }

  #control {
    display: none;
  }
  .tituloPagina {
    display: none;
  }
}
</style>
