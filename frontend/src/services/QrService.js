import api from "../api";

class QrService {
  updateQr(obra) {
    return api.post("/updateQr", obra);
  }
}

export default new QrService();
