import api from "../api"; // 👈 usamos la instancia central con baseURL + token

class JornalService {
  getAllJornales() {
    return api.get("/jornal/es");
  }

  createJornal(jornal) {
    return api.post("/jornal", jornal);
  }

  createOrUpdateJornalQr(obraID) {
    return api.post("/jornal/Qr", { obraID });
  }

  getJornalById(jornalId) {
    return api.get(`/jornal/${jornalId}`);
  }

  updateJornal(jornalId, motivo, jornal) {
    return api.put(`/jornal/${jornalId}/${motivo}`, jornal);
  }

  deleteJornal(jornalId) {
    return api.delete(`/jornal/${jornalId}`);
  }

  getJornalesByPersonaId(personaId) {
    return api.get(`/jornal/jornalByPersona/${personaId}`);
  }

  getLastJornales() {
    return api.get("/jornal/lastJornales");
  }

  getJornalesByFiltros(fechaDesde, fechaHasta, obraSeleccionada, personaId) {
    return api.get("/jornal/jornalByFiltros/", {
      params: { fechaDesde, fechaHasta, obraSeleccionada, personaId },
    });
  }

  getJornalesByFiltrosWithDTO(jornalDataRequest) {
    return api.post("/jornal/getJornalesByFiltros", jornalDataRequest);
  }

  getJornalesSinConfirmar(obraId) {
    return api.get(`/jornal/jornalNoConfirmado/${obraId}`);
  }

  existsJornalesSinConfirmarByObraFecha(obraId, fechaDesde, fechaHasta) {
    return api.get("/jornal/jornalSinConfirmar/", {
      params: { fechaDesde, fechaHasta, obraId },
    });
  }

  confirmarJornal(jornalID) {
    return api.post(`/jornal/confirmarJornal/${jornalID}`);
  }

  agregarLluvia(jornal) {
    return api.post("/jornal/agregarLluvia", jornal);
  }

  validateDatos(
    persona,
    obra,
    fechaJornal,
    horaComienzoUnformatted,
    horaFinUnformatted,
    tipoJornal,
    confirmado,
    modificado
  ) {
    if (!fechaJornal) throw new Error("La fecha no puede ser nula");
    if (!horaComienzoUnformatted)
      throw new Error("La hora de comienzo no puede ser nula");
    if (!horaFinUnformatted)
      throw new Error("La hora de fin no puede ser nula");
    if (!obra) throw new Error("Debes seleccionar una obra");
    if (!persona) throw new Error("Debes seleccionar un trabajador");

    const horaComienzoFormatted = `${fechaJornal}T${horaComienzoUnformatted}`;
    const horaFinFormatted = `${fechaJornal}T${horaFinUnformatted}`;

    const jornal = {
      persona,
      obra,
      fechaJornal,
      horaComienzo: horaComienzoFormatted,
      horaFin: horaFinFormatted,
      modificado: false,
      tipoJornal,
      confirmado: true,
    };

    return api.post("/jornal/validateGeneral", jornal);
  }
}

export default new JornalService();
