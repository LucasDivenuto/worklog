-- Marcaje de descanso: columnas en jornal (se aplica una sola vez vía schema_migration)
ALTER TABLE jornal
    ADD COLUMN hora_inicio_descanso datetime(6) NULL AFTER hora_fin,
    ADD COLUMN hora_fin_descanso datetime(6) NULL AFTER hora_inicio_descanso;
