import api from "../api";

class PersonaRolService {
  getAllPersonaRoles() {
    return api.get("/personaRol/es");
  }

  createPersonaRol(personaRol) {
    return api.post("/personaRol", personaRol);
  }

  getPersonaRolById(personaRolId) {
    return api.get(`/personaRol/${personaRolId}`);
  }

  updatePersonaRol(personaRolId, personaRol) {
    return api.put(`/personaRol/${personaRolId}`, personaRol);
  }

  deletePersonaRol(personaRolId) {
    return api.delete(`/personaRol/${personaRolId}`);
  }

  getPersonaRolActivoByCI(cedula) {
    return api.get(`/personaRol/personaRolByCI/${cedula}`);
  }

  getEsJefeObraByPersonaId(personaId) {
    return api.get(`/personaRol/esJefe/${personaId}`);
  }
}

export default new PersonaRolService();
