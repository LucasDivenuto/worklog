package com.worklog.backend.model;

public enum AccionMarcajeQr {
    ENTRADA,
    INICIO_DESCANSO,
    FIN_DESCANSO,
    SALIDA_JORNADA;

    public static AccionMarcajeQr fromString(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        try {
            return AccionMarcajeQr.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new com.worklog.backend.exception.InvalidDataException(
                    "Acción de marcaje no válida: " + value);
        }
    }
}
