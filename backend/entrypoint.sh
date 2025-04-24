#!/bin/sh

echo "🚀 Aplicando migrations..."
npx prisma migrate deploy

echo "🌱 Executando seed (se necessário)..."
node dist/prisma/seed-check.js

echo "🎬 Iniciando aplicação NestJS..."
npm run start:prod
