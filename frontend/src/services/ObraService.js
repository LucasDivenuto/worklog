import api from "../api";

class ObraService {
  getAllObras() {
    return api.get("/obras");
  }

  createObra(obra) {
    return api.post("/obra", obra);
  }

  getObraById(obraId) {
    return api.get(`/obra/${obraId}`);
  }

  updateObra(obraId, obra) {
    return api.put(`/obra/${obraId}`, obra);
  }

  deleteObra(obraId) {
    return api.delete(`/obra/${obraId}`);
  }

  getObraByBPS(bps) {
    return api.get(`/getObraByBPS/${bps}`);
  }

  getObrasActivasEntreFechas(fechaDesde, fechaHasta) {
    return api.get("/getAllObrasByDates/", {
      params: { fechaDesde, fechaHasta },
    });
  }

  getObraByNombre(nombre) {
    return api.get(`/getObraByNombre/${nombre}`);
  }

  getObrasActivasEntreFechasyTrabajador(fechaDesde, fechaHasta, persona_id) {
    return api.get("/getAllObrasByDatesAndTrabajador/", {
      params: { fechaDesde, fechaHasta, persona_id },
    });
  }
}

export default new ObraService();
