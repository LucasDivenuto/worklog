#!/usr/bin/env bash
# Aplica migraciones SQL pendientes contra MySQL y registra versiones en schema_migration.
#
# Variables (GitHub Actions / prod):
#   DB_URL, DB_USERNAME, DB_PASSWORD
#
# Alternativa manual:
#   RDS_HOST, RDS_USER, RDS_PASSWORD, [RDS_DATABASE], [RDS_PORT]
#
# Uso: ./run-migrations.sh /ruta/a/migraciones

set -euo pipefail

MIGRATIONS_DIR="${1:?Directorio de migraciones requerido}"

parse_db_url() {
  local url="$1"
  local rest="${url#jdbc:mysql://}"
  if [ "$rest" = "$url" ]; then
    echo "Error: DB_URL debe ser jdbc:mysql://host[:puerto]/base"
    exit 1
  fi
  rest="${rest%%\?*}"
  RDS_DATABASE="${rest##*/}"
  rest="${rest%/*}"
  if [ -z "$RDS_DATABASE" ] || [ -z "$rest" ]; then
    echo "Error: no se pudo obtener host/base desde DB_URL"
    exit 1
  fi
  if [[ "$rest" == *:* ]]; then
    RDS_HOST="${rest%%:*}"
    RDS_PORT="${rest##*:}"
  else
    RDS_HOST="$rest"
    RDS_PORT="${RDS_PORT:-3306}"
  fi
}

if [ -n "${DB_URL:-}" ]; then
  parse_db_url "$DB_URL"
  RDS_USER="${DB_USERNAME:-${DB_USER:-}}"
  RDS_PASSWORD="${DB_PASSWORD:-}"
  if [ -z "$RDS_USER" ] || [ -z "$RDS_PASSWORD" ]; then
    echo "Error: DB_USERNAME y DB_PASSWORD son requeridos con DB_URL"
    exit 1
  fi
elif [ -n "${RDS_HOST:-}" ]; then
  RDS_USER="${RDS_USER:?RDS_USER requerido}"
  RDS_PASSWORD="${RDS_PASSWORD:?RDS_PASSWORD requerido}"
  RDS_DATABASE="${RDS_DATABASE:-worklog}"
  RDS_PORT="${RDS_PORT:-3306}"
else
  echo "Error: definir DB_URL + DB_USERNAME + DB_PASSWORD, o RDS_HOST + RDS_USER + RDS_PASSWORD"
  exit 1
fi

RDS_PORT="${RDS_PORT:-3306}"

if ! command -v mysql >/dev/null 2>&1; then
  echo "Error: mysql client no instalado en el host."
  exit 1
fi

MYSQL_CNF="$(mktemp)"
trap 'rm -f "$MYSQL_CNF"' EXIT
chmod 600 "$MYSQL_CNF"
cat > "$MYSQL_CNF" <<EOF
[client]
host=${RDS_HOST}
port=${RDS_PORT}
user=${RDS_USER}
password=${RDS_PASSWORD}
database=${RDS_DATABASE}
EOF

mysql_exec() {
  mysql --defaults-extra-file="$MYSQL_CNF" "$@"
}

echo "==> Asegurando tabla schema_migration en ${RDS_DATABASE}@${RDS_HOST}..."
mysql_exec <<'SQL'
CREATE TABLE IF NOT EXISTS schema_migration (
    version     VARCHAR(100)  NOT NULL PRIMARY KEY,
    description VARCHAR(255)  NULL,
    applied_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);
SQL

shopt -s nullglob
files=("${MIGRATIONS_DIR}"/V*.sql)
if [ ${#files[@]} -eq 0 ]; then
  echo "No hay archivos V*.sql en ${MIGRATIONS_DIR}"
  exit 0
fi

IFS=$'\n' sorted=($(sort <<<"${files[*]}"))
unset IFS

for f in "${sorted[@]}"; do
  version="$(basename "$f" .sql)"
  applied="$(mysql_exec -N -e "SELECT COUNT(*) FROM schema_migration WHERE version='${version}'")"

  if [ "${applied}" -gt 0 ]; then
    echo "==> Omitiendo ${version} (ya aplicada)"
    continue
  fi

  echo "==> Aplicando ${version}..."
  mysql_exec < "$f"
  mysql_exec -e "INSERT INTO schema_migration (version, description) VALUES ('${version}', '${version}')"
  echo "==> ${version} registrada"
done

echo "==> Migraciones completadas."
