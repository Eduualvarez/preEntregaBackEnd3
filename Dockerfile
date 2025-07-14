FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Copiar certificados SSL (ajusta la ruta si es distinta)
COPY key.pem cert.pem ./

# Exponer puerto
EXPOSE 8080

# Comando para iniciar (asumiendo que "npm start" llama a server.js)
CMD ["npm", "start"]