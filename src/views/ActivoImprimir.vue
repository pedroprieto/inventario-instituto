<template>
  <div class="grid">
    <div class="titulo idTitle text-h6 text-right font-weight-light">Id:</div>
    <div class="valor identifier text-h5">{{ store.currentItem.id }}</div>
    <div class="titulo nombreTitle text-h6 text-right font-weight-light">
      Nombre:
    </div>
    <div class="valor nombre text-h5">{{ store.currentItem.nombre }}</div>
    <div class="titulo salaTitle text-h6 text-right font-weight-light">
      Sala:
    </div>
    <div class="valor sala text-h5">{{ store.currentItem.sala.nombre }}</div>
    <div class="titulo tipoTitle text-h6 text-right font-weight-light">
      Tipo:
    </div>
    <div class="valor tipo text-h5">{{ store.currentItem.tipo.nombre }}</div>
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
  <v-container class="controles">
    <v-row class="controles">
      <v-col>
        <v-btn
          elevated
          color="secondary"
          size="x-large"
          icon="mdi-arrow-left"
          @click="back"
        ></v-btn>
        &nbsp;

        <v-btn
          elevated
          color="primary"
          size="x-large"
          icon="mdi-printer"
          @click="imprimir"
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";
import { useAppStore } from "../store/app";
import { useRouter } from "vue-router";
const router = useRouter();

function imprimir() {
  window.print();
}

function back() {
  router.back();
}

const store = useAppStore();
const props = defineProps(["activo"]);

const level = ref("M");
const size = ref(100);
const renderAs = ref("svg");
</script>

<style>
@page {
  size: 4in 1in portrait; /* auto is the initial value */
  /* this affects the margin in the printer settings */
  margin: 0;
}

.grid {
  margin: 10px;
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

.qrcode {
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  padding: 0;
}

.titulo {
  display: inline-block;
  text-decoration: underline;
}

.valor {
  display: inline-block;
  vertical-align: middle;
}

@media print {
  body {
    /* A4: 210 × 297*/
    width: 4in;
    height: 1in;
    padding: 0;
    font: 8.5pt sans-serif;
    margin: 0;
    margin-left: 0;
    font-weight: 400 !important;
  }

  .titulo,
  .valor {
    font-weight: 600 !important;
  }

  .qr {
    width: 2cm;
    height: 2cm;
    justify-self: right;
  }

  .titulo {
    font-size: 8pt !important;
  }
  .valor {
    font-size: 8pt !important;
  }
  .controles {
    display: none;
  }
  .grid {
    margin: 0;
    margin-right: 2mm;
    grid-template-columns: 1fr 6fr 2fr;
    row-gap: 1mm;
    grid-template-areas:
      "idTitle identifier qr"
      "nombreTitle nombre qr"
      "salaTitle sala qr "
      "tipoTitle tipo qr ";
  }
}
</style>
