#!/bin/sh
set -e

host="$DB_HOST"
until PGPASSWORD=$DB_PASSWORD psql -h "$host" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; do
  echo "⏳ Waiting for Postgres at $host..."
  sleep 2
done

echo "✅ Postgres is up - starting app"
exec "$@"
