#!/bin/bash

# Para no caso de algum comando falhar
set -e

echo "Building backend Docker image..."

# Navegar para o diretório do backend e construir a imagem
cd backend
npm install
cd ..

echo "Stopping and removing old backend container..."

# Parar e remover os containers existentes
docker-compose down

echo "Starting new backend container..."

# Iniciar os novos containers
docker-compose up --build -d backend

echo "Backend deployment completed successfully."
