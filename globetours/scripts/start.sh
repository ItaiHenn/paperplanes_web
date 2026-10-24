#!/bin/sh
set -e

echo "Running database migrations..."
node /app/scripts/migrate.js

echo "Starting Next.js..."
exec node server.js
