import { defineStore } from "pinia";
import { generateClient } from "aws-amplify/data";
const client = generateClient();

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      activos: [],
      salas: [],
      tipos: [],
      currentItem: null,
      currentSala: null,
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
    async updateActivo() {
      let item = this.currentItem;
      await client.models.Activo.update({
        id: item.id,
        nombre: item.nombre,
        salaId: item.salaId,
        tipoId: item.tipoId,
      });
      await client.models.ActivoSala.create({
        activoId: item.id,
        salaId: item.salaId,
      });
    },
    async setCurrentItem(itemId) {
      let res = await client.models.Activo.get(
        { id: itemId },
        {
          selectionSet: [
            "id",
            "nombre",
            "salaId",
            "tipoId",
            "sala.*",
            "tipo.*",
            "salas.*",
          ],
        }
      );
      this.currentItem = res.data;
    },
    async setCurrentSala(itemId) {
      let res = await client.models.Sala.get(
        { id: itemId },
        {
          /*
          selectionSet: [
            "id",
            "nombre",
            "salaId",
            "tipoId",
            "sala.*",
            "tipo.*",
            "salas.*",
          ],
           */
        }
      );
      this.currentSala = res.data;
    },
    async deleteSala(item) {
      await client.models.Sala.delete({
        id: item.id,
      });
      await this.getSalas();
    },
    async updateSala(item) {
      return client.models.Sala.update({
        id: item.id,
        nombre: item.nombre,
      });
    },
    async createSala(data) {
      return client.models.Sala.create({
        nombre: data.nombre,
      });
    },
    async deleteActivo(item) {
      await client.models.Activo.delete({
        id: item.id,
      });
    },
    async updateActivo(item) {
      await client.models.Activo.update({
        id: item.id,
        nombre: item.nombre,
        salaId: item.salaId,
        tipoId: item.tipoId,
      });
      await client.models.ActivoSala.create({
        activoId: item.id,
        salaId: item.salaId,
      });
    },
    async createActivo(data) {
      return client.models.Activo.create({
        nombre: data.nombre,
        salaId: data.salaId,
        tipoId: data.tipoId,
      }).then((el) => {
        // el.data.id: nuevo elemento creado
        return client.models.ActivoSala.create({
          activoId: el.data.id,
          salaId: data.salaId,
        });
      });
    },
    async listActivos() {
      let filter = {};
      /*if (selectedSalas.value.length) {
        filter.filter = {};
        filter.filter.salaId = { eq: selectedSalas.value[0] };
        }*/

      const { data: items, errors } = await client.models.Activo.list(filter);
      this.activos = items;
    },
    async listActivosBySalaId(salaId) {
      const { data: items, errors } =
        await client.models.Activo.listActivoBySalaId({
          salaId,
        });
      this.activos = items;
    },
    getNombreSalaById(salaId) {
      return this.salas.find((el) => el.id == salaId).nombre;
    },
    getNombreTipoById(tipoId) {
      return this.tipos.find((el) => el.id == tipoId).nombre;
    },
  },
});
