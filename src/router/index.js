// Composables
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "activos",
        meta: {
          prompt: "Activos",
          mainMenu: true,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Activos.vue"),
        props: true,
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
        children: [
          {
            path: "/salas/:sala/auditorias",
            name: "auditoriasSala",
            meta: {
              prompt: "Auditorías",
            },
            component: () =>
              import(/* webpackChunkName: "home" */ "@/views/Auditorias.vue"),
            props: true,
            children: [
              {
                path: "/salas/:sala/auditorias/:auditoria",
                name: "Ver auditoría",
                meta: {
                  prompt: "Auditoría",
                },
                component: () =>
                  import(
                    /* webpackChunkName: "home" */ "@/views/AuditoriasView.vue"
                  ),
                props: true,
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
