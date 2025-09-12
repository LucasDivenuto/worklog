import api from "../api";

class LoginService {
  iniciarSesion(credenciales) {
    return api.post("/login", credenciales);
  }
}

export default new LoginService();
