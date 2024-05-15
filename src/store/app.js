import { defineStore } from "pinia";
import { generateClient } from "aws-amplify/data";
const client = generateClient();

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      salas: [],
      tipos: [],
    };
  },
  actions: {
    async getSalas() {
      const { data: items, errors } = await client.models.Sala.list();
      this.salas = items;
    },
    async getTipos() {
      const { data: items, errors } = await client.models.Tipo.list();
      this.tipos = items;
    },
  },
});
