# Usa una imagen base de Node
FROM node:18-alpine

# Crear y definir el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./


# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la app
COPY . .

# Exponer el puerto
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "run", "dev"]
