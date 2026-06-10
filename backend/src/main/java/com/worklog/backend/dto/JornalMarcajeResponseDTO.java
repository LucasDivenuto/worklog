package com.worklog.backend.dto;

import com.worklog.backend.model.EstadoMarcajeQr;
import com.worklog.backend.model.Jornal;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JornalMarcajeResponseDTO {
    private Jornal jornal;
    private EstadoMarcajeQr estadoMarcaje;
    private List<String> accionesPermitidas;
    private String obraNombre;

    public JornalMarcajeResponseDTO() {
    }

    public JornalMarcajeResponseDTO(Jornal jornal, EstadoMarcajeQr estadoMarcaje, List<String> accionesPermitidas, String obraNombre) {
        this.jornal = jornal;
        this.estadoMarcaje = estadoMarcaje;
        this.accionesPermitidas = accionesPermitidas;
        this.obraNombre = obraNombre;
    }
}
