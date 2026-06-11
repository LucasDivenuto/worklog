import api from "../api";

class ReporteService {
  getReporteEntreFechas(exportRequest) {
    return api.post("/reporte", exportRequest, {
      responseType: "blob", // 👈 importante para descargar archivos
    });
  }
}

export default new ReporteService();
