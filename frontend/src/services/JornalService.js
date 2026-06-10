import api from "../api"; // 👈 usamos la instancia central con baseURL + token

class JornalService {
  getAllJornales() {
    return api.get("/jornal/es");
  }

  createJornal(jornal) {
    return api.post("/jornal", jornal);
  }

  getEstadoMarcaje(obraId) {
    return api.get(`/jornal/estadoMarcaje/${obraId}`);
  }

  createOrUpdateJornalQr(obraID, accion) {
    return api.post("/jornalQr", { obraID, accion });
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

  existsSinConfirmarEnFiltro(jornalDataRequest) {
    return api.post("/jornal/existsSinConfirmarEnFiltro", jornalDataRequest);
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
    modificado,
    horaInicioDescansoUnformatted,
    horaFinDescansoUnformatted
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
    const tieneInicioDescanso = Boolean(horaInicioDescansoUnformatted);
    const tieneFinDescanso = Boolean(horaFinDescansoUnformatted);
    if (tieneInicioDescanso !== tieneFinDescanso) {
      throw new Error("Debes ingresar inicio y fin de descanso, o dejar ambos vacíos");
    }
    const toMinutes = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };
    if (tieneInicioDescanso && horaInicioDescansoUnformatted < horaComienzoUnformatted) {
      throw new Error("El descanso no puede iniciar antes de la hora de comienzo");
    }
    if (tieneFinDescanso && horaFinDescansoUnformatted > horaFinUnformatted) {
      throw new Error("El descanso no puede finalizar después de la hora de fin");
    }
    if (
      tieneInicioDescanso &&
      toMinutes(horaFinDescansoUnformatted) - toMinutes(horaInicioDescansoUnformatted) < 25
    ) {
      throw new Error("El descanso debe durar al menos 25 minutos");
    }
    const horaInicioDescansoFormatted = tieneInicioDescanso
      ? `${fechaJornal}T${horaInicioDescansoUnformatted}`
      : null;
    const horaFinDescansoFormatted = tieneFinDescanso
      ? `${fechaJornal}T${horaFinDescansoUnformatted}`
      : null;

    const jornal = {
      persona,
      obra,
      fechaJornal,
      horaComienzo: horaComienzoFormatted,
      horaFin: horaFinFormatted,
      horaInicioDescanso: horaInicioDescansoFormatted,
      horaFinDescanso: horaFinDescansoFormatted,
      modificado: false,
      tipoJornal,
      confirmado: true,
    };

    return api.post("/jornal/validateGeneral", jornal);
  }
}

export default new JornalService();
