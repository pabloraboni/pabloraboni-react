# Etapa 1: Utilizar uma imagem base do Node.js
FROM node:16

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de configuração
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos da aplicação para o diretório de trabalho do container
COPY . .

# Copie o arquivo .env para o container
COPY .env .env

# Expor a porta que a aplicação irá utilizar
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "start"]