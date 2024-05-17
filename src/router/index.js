// Composables
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/activos/:activo/datos/imprimir",
    name: "activoImprimir",
    props: true,
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/ActivoImprimir.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "escanear",
        meta: {
          prompt: "Escanear",
          mainMenu: true,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Escanear.vue"),
        props: true,
      },
      {
        path: "/activos",
        name: "activos",
        meta: {
          prompt: "Activos",
          mainMenu: true,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Activos.vue"),
        props: true,
      },
      {
        path: "/activos/:activo",
        name: "activo",
        meta: {
          prompt: "Activo",
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Activo.vue"),
        props: true,
        children: [
          {
            path: "/activos/:activo/edit",
            name: "activoEdit",
            props: true,
            component: () =>
              import(/* webpackChunkName: "home" */ "@/views/ActivoEdit.vue"),
          },
          {
            path: "/activos/:activo/historico",
            name: "activoHistorico",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "home" */ "@/views/ActivoHistorico.vue"
              ),
          },
          {
            path: "/activos/:activo/datos",
            name: "activoDatos",
            props: true,
            component: () =>
              import(/* webpackChunkName: "home" */ "@/views/ActivoDatos.vue"),
          },
        ],
      },
      {
        path: "/tipos",
        name: "tipos",
        meta: {
          mainMenu: true,
          prompt: "Tipos",
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Tipos.vue"),
        props: true,
      },
      {
        path: "/salas",
        name: "salas",
        meta: {
          mainMenu: true,
          prompt: "Salas",
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Salas.vue"),
        props: true,
      },
      {
        path: "/salas/:sala",
        name: "sala",
        meta: {
          prompt: "Sala",
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Sala.vue"),
        props: true,
        children: [
          {
            path: "/salas/:sala/datos",
            name: "salaDatos",
            props: true,
            component: () =>
              import(/* webpackChunkName: "home" */ "@/views/SalaDatos.vue"),
          },
          {
            path: "/salas/:sala/activos",
            name: "salaActivos",
            props: true,
            component: () =>
              import(/* webpackChunkName: "home" */ "@/views/SalaActivos.vue"),
          },
          {
            path: "/salas/:sala/auditorias",
            name: "salaAuditorias",
            meta: {
              prompt: "Auditorías",
            },
            component: () =>
              import(/* webpackChunkName: "home" */ "@/views/Auditorias.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/salas/:sala/auditorias/:auditoria",
        name: "auditoria",
        meta: {
          prompt: "Auditoría",
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Auditoria.vue"),
        props: true,
        children: [
          {
            path: "/salas/:sala/auditorias/:auditoria/datos",
            name: "auditoriaDatos",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "home" */ "@/views/AuditoriaDatos.vue"
              ),
          },
          {
            path: "/salas/:sala/auditorias/:auditoria/activos",
            name: "auditoriaActivos",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "home" */ "@/views/AuditoriaActivos.vue"
              ),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
