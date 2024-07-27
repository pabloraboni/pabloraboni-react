# Etapa 1: Construir a aplicação
FROM node:14 AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todos os arquivos
COPY . .

# Construir a aplicação
RUN npm run build

# Verificar o conteúdo do diretório após o build
RUN ls -la /app/dist

# Etapa 2: Configurar o nginx para servir a aplicação
FROM nginx:alpine

# Copiar os arquivos de build do Vite para o diretório do nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta que a aplicação irá rodar
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]