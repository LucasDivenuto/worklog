import api from "../api";

class UsuarioService {
  isResetPassword(personaId) {
    return api.get(`/usuario/reset-password/${personaId}`);
  }

  updatePassword(personaId, newPassword) {
    return api.put("/usuario/new-password", { personaId, newPassword });
  }
}

export default new UsuarioService();
