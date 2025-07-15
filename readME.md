# Cómo ejecutar el proyecto usando Docker

Este documento explica cómo descargar y correr el backend desde la imagen pública en Docker Hub.

---

## Paso 1: Instalar Docker

Si no tienes Docker instalado, descárgalo e instálalo desde:

[https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

---

## Paso 2: Descargar la imagen desde Docker Hub

Abre una terminal y ejecuta:

```bash
docker pull eduardoalvarez3313/proyectofinalback3:latest
```
## Paso 3: Para que el backend funcione, necesitas un contenedor MongoDB corriendo:

```bash
docker run -d -p 27017:27017 --name mongo mongo:6
```

## Paso 4: Ejecutar tu backend usando la imagen descargada:
  Ejecuta el backend y expón el puerto 8080:
  ```bash
  docker run -d -p 8080:8080 --name backend-app \
  -e MONGO_URI=mongodb://host.docker.internal:27017/backEnd3\
  eduardoalvarez3313/proyectofinalback3:latest
```

