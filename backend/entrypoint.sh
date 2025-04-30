#!/bin/sh

echo "🚀 Aplicando migrations..."
npx prisma migrate deploy

echo "🌱 Executando seed (se necessário)..."
node dist/prisma/seed-check.js

echo "🎬 Iniciando aplicação NestJS..."
# Esperar o Postgres ficar pronto
until pg_isready -h postgres -p 5432; do
  echo "Aguardando Postgres ficar pronto..."
  sleep 2
done

echo "Postgres pronto, iniciando backend!"

# Iniciar a aplicação
npm run start:prod
