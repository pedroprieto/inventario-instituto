import { defineStore } from "pinia";
import { generateClient } from "aws-amplify/data";
const client = generateClient();

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      activos: [],
      salas: [],
      tipos: [],
      auditorias: [],
      currentItem: null,
      currentSala: null,
      currentAuditoria: null,
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
    async getActivo(itemId) {
      let res = await client.models.Activo.get({ id: itemId });
      return res.data;
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
    async batchCreateActivos(data) {
      let elemPromises = [];
      let j = parseInt(data.inicial);
      for (
        let i = parseInt(data.inicial);
        i < parseInt(data.inicial) + parseInt(data.numero);
        i++
      ) {
        let el = {
          nombre: data.prefijo + i,
          salaId: data.salaId,
          tipoId: data.tipoId,
        };
        elemPromises.push(client.models.Activo.create(el));
      }

      let resuls = await Promise.all(elemPromises);

      let elemPromises2 = [];
      for (let res of resuls) {
        elemPromises2.push(
          client.models.ActivoSala.create({
            activoId: res.data.id,
            salaId: data.salaId,
          })
        );
      }
      return Promise.all(elemPromises2);
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
      let sala = this.salas.find((el) => el.id == salaId);
      if (sala) return sala.nombre;
      return salaId;
    },
    getNombreTipoById(tipoId) {
      let tipo = this.tipos.find((el) => el.id == tipoId);
      if (tipo) return tipo.nombre;
      return tipoId;
    },
    async listAuditoriasBySalaId(salaId) {
      const { data: items, errors } =
        await client.models.Auditoria.listAuditoriaBySalaId({
          salaId,
        });
      this.auditorias = items;
    },
    async deleteAuditoria(item) {
      await client.models.Auditoria.delete({
        id: item.id,
      });
    },
    async updateAuditoria(item) {
      return client.models.Auditoria.update({
        id: item.id,
        salaId: item.salaId,
        cerrada: item.cerrada,
        tipos: item.tipos,
      });
    },
    async createAuditoria(data) {
      return client.models.Auditoria.create({
        salaId: data.salaId,
        cerrada: data.cerrada,
        tipos: data.tipos,
      });
    },
    async setCurrentAuditoria(itemId) {
      let res = await client.models.Auditoria.get(
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
      this.currentAuditoria = res.data;
    },
    async getActivosByAuditoriaId(auditoriaId) {
      const { data: items, errors } =
        await client.models.ActivoAuditoria.listActivoAuditoriaByAuditoriaId({
          auditoriaId,
        });
      return items;
    },
    async createActivoAuditoria(activoId, auditoriaId) {
      return client.models.ActivoAuditoria.create({
        activoId,
        auditoriaId,
      });
    },
    async deleteActivoAuditoria(activoAuditoria) {
      return client.models.ActivoAuditoria.delete({
        activoId: activoAuditoria.id,
        auditoriaId: activoAuditoria.auditoriaId,
      });
    },
  },
});
