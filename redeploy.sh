#!/bin/bash

# Para no caso de algum comando falhar
set -e

echo "Building frontend and backend Docker images..."

# Navegar para o diretório do frontend e construir a imagem
cd frontend
npm install
npm run build
cd ..

# Navegar para o diretório do backend e construir a imagem
cd backend
npm install
cd ..

echo "Stopping and removing old containers..."

# Parar e remover os containers existentes
docker-compose down

echo "Starting new containers..."

# Iniciar os novos containers
docker-compose up --build -d

echo "Deployment completed successfully."
