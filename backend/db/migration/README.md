# Migraciones de base de datos

Los archivos `V*.sql` se aplican en orden alfabético durante el deploy a producción (workflow de GitHub Actions).

Cada migración se ejecuta **una sola vez**; el control queda en la tabla `schema_migration`.

## Añadir una migración nueva

1. Crear `V002__descripcion_corta.sql` (número mayor que el anterior).
2. Hacer push a `master`.
3. Hacer push a `master` (el deploy usa los secrets `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` ya configurados en GitHub).

## Ejecutar manualmente (local o bastion con acceso a RDS)

```bash
export DB_URL='jdbc:mysql://HOST:3306/worklog'
export DB_USERNAME=...
export DB_PASSWORD=...
bash backend/scripts/run-migrations.sh backend/db/migration
```

## Local con Docker MySQL

```bash
export DB_URL='jdbc:mysql://127.0.0.1:3309/worklog'
export DB_USERNAME=worklog_user
export DB_PASSWORD=worklog_pass
bash backend/scripts/run-migrations.sh backend/db/migration
```

## Deploy (GitHub Actions)

En cada push a `master`, el job `backend` copia `backend/db/migration/` y `run-migrations.sh` a la EC2, ejecuta migraciones contra RDS **antes** de levantar el contenedor Docker.

Secrets usados: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` (mismos que ya tenés en el repositorio).

## Si las columnas ya existen en producción

Si `hora_inicio_descanso` / `hora_fin_descanso` se crearon a mano o con otro medio, **no** vuelvas a ejecutar `V001`. Marcá la migración como aplicada:

```sql
INSERT INTO schema_migration (version, description)
VALUES ('V001__jornal_descanso', 'jornal_descanso');
```
