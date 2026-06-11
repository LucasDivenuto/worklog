import api from "../api";

class JefeObraService {
  getAllJefeObra() {
    return api.get("/jefeObras");
  }

  createJefeObra(jefeObra) {
    return api.post("/jefeObra", jefeObra);
  }

  getJefeObraById(jefeObraId) {
    return api.get(`/jefeObra/${jefeObraId}`);
  }

  updateJefeObra(jefeObraId, jefeObra) {
    return api.put(`/jefeObra/${jefeObraId}`, jefeObra);
  }

  deleteJefeObra(jefeObraId) {
    return api.delete(`/jefeObra/${jefeObraId}`);
  }

  getObraByJefeId(id) {
    return api.get(`/getObraByJefe/${id}`);
  }
}

export default new JefeObraService();
