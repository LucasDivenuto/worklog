import api from "../api";

class PersonaService {
  // BASIC CRUD
  getAllPersonas() {
    return api.get("/personas");
  }

  createPersona(persona) {
    return api.post("/persona", persona);
  }

  getPersonaById(personaId) {
    return api.get(`/persona/${personaId}`);
  }

  updatePersona(personaId, persona) {
    return api.put(`/persona/${personaId}`, persona);
  }

  deletePersona(personaId) {
    return api.delete(`/persona/${personaId}`);
  }

  // CUSTOM
  getPersonaByCI(cedula) {
    return api.get(`/persona/findByCI/${cedula}`);
  }

  getPersonaByUsername(username) {
    return api.get(`/persona/findByUsername/${username}`);
  }

  getAllTrabajadoresActivos() {
    return api.get("/persona/getAllTrabajadoresActivos");
  }

  getAllTrabajadoresDeObra(obraId) {
    return api.get(`/persona/getAllTrabajadoresDeObra/${obraId}`);
  }

  getTrabajadoresDeObraPorFecha(obraId, fecha) {
    return api.get("/persona/getTrabajadoresDeObraPorFecha/", {
      params: { obraId, fecha },
    });
  }

  getPersonasByNombre(nombre) {
    return api.get(`/persona/getPersonasByNombre/${nombre}`);
  }

  getPersonaByCIoNombre(parametro) {
    if (parametro.length > 0 && !isNaN(parseInt(parametro.charAt(0)))) {
      return this.getPersonaByCI(parametro);
    }
    return this.getPersonasByNombre(parametro);
  }
}

export default new PersonaService();
