#!/bin/bash

# Para no caso de algum comando falhar
set -e

echo "Building frontend Docker image..."

# Navegar para o diretório do frontend e construir a imagem
cd frontend
npm install
npm run build
cd ..

echo "Stopping and removing old frontend container..."

# Parar e remover os containers existentes
docker-compose down

echo "Starting new frontend container..."

# Iniciar os novos containers
docker-compose up --build -d frontend

echo "Frontend deployment completed successfully."
