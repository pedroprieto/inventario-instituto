// Composables
import { createRouter, createWebHashHistory } from "vue-router";

import { useAppStore } from "../store/app";

import { useAuthenticator } from "@aws-amplify/ui-vue";
import { toRefs } from "vue";
import { fetchAuthSession } from "aws-amplify/auth";

const routes = [
  {
    path: "/imprimir",
    name: "activoImprimir",
    props: (route) => ({ activos: route.query.activos }),
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/ActivoImprimir.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    name: "root",
    meta: {
      prompt: "HOME",
    },
    beforeEnter: async (to, from) => {
      const store = useAppStore();

      store.backURL = null;

      const { user } = toRefs(useAuthenticator());
      let authSession = await fetchAuthSession();

      store.user = user;

      const groups = authSession.tokens.idToken.payload["cognito:groups"];

      store.isAdmin = groups ? groups[0] == "Admin" : false;

      await store.getSalas();
      await store.getTipos();
    },
    redirect: (to) => {
      return { path: "/escanear" };
    },
    children: [
      {
        path: "/escanear",
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
        beforeEnter: async (to, from) => {
          const store = useAppStore();
          await store.listActivos();
        },
        children: [
          {
            path: "/activos/:activo",
            name: "activo",
            meta: {
              prompt: "Activo",
            },
            component: () =>
              import(/* webpackChunkName: "home" */ "@/views/Activo.vue"),
            props: true,
            beforeEnter: async (to, from) => {
              const store = useAppStore();
              await store.setCurrentItem(to.params.activo);
            },
            children: [
              {
                path: "/activos/:activo/edit",
                name: "activoEdit",
                props: true,
                component: () =>
                  import(
                    /* webpackChunkName: "home" */ "@/views/ActivoEdit.vue"
                  ),
              },
              {
                path: "/activos/:activo/historico",
                name: "activoHistorico",
                props: true,
                meta: {
                  prompt: "Histórico",
                },
                component: () =>
                  import(
                    /* webpackChunkName: "home" */ "@/views/ActivoHistorico.vue"
                  ),
              },
              {
                path: "/activos/:activo",
                name: "activoDatos",
                props: true,
                meta: {
                  prompt: "Datos activo",
                },
                component: () =>
                  import(
                    /* webpackChunkName: "home" */ "@/views/ActivoDatos.vue"
                  ),
              },
            ],
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
          prompt: "Salas",
          mainMenu: true,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Salas.vue"),
        props: true,
        children: [
          {
            path: "/salas/:sala",
            name: "sala",
            meta: {
              prompt: "Sala",
            },
            component: () =>
              import(/* webpackChunkName: "home" */ "@/views/Sala.vue"),
            props: true,
            beforeEnter: async (to, from) => {
              const store = useAppStore();
              await store.setCurrentSala(to.params.sala);
            },
            children: [
              {
                path: "/salas/:sala/activos",
                name: "salaActivos",
                meta: {
                  prompt: "Activos",
                },
                props: true,
                beforeEnter: async (to, from) => {
                  const store = useAppStore();
                  await store.listActivosBySalaId(to.params.sala);
                },
                component: () =>
                  import(
                    /* webpackChunkName: "home" */ "@/views/SalaActivos.vue"
                  ),
              },
              {
                path: "/salas/:sala/auditorias",
                name: "salaAuditorias",
                meta: {
                  prompt: "Auditorías",
                },
                component: () =>
                  import(
                    /* webpackChunkName: "home" */ "@/views/Auditorias.vue"
                  ),
                props: true,
                beforeEnter: async (to, from) => {
                  const store = useAppStore();
                  await store.listAuditoriasBySalaId(to.params.sala);
                },
              },
              {
                path: "/salas/:sala/auditorias/:auditoria",
                name: "auditoria",
                meta: {
                  prompt: "Auditoría",
                },
                component: () =>
                  import(
                    /* webpackChunkName: "home" */ "@/views/Auditoria.vue"
                  ),
                props: true,
                beforeEnter: async (to, from) => {
                  const store = useAppStore();
                  await store.setCurrentAuditoria(to.params.auditoria);
                },
              },
            ],
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
