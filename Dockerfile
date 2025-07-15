# Usa una imagen base oficial de Node
FROM node:22

# Crea el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código al contenedor
COPY . .

# Establece el directorio de trabajo para ejecución
WORKDIR /app/src

# Expone el puerto
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["node", "server.js"]
