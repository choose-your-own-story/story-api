#!/bin/bash

# Ruta del archivo cuyo contenido quieres cargar en una variable de entorno
archivo="certificates/postgres-ca.cert"

# Lee el contenido del archivo y almacénalo en una variable
contenido=$(cat "$archivo")

# Define la variable de entorno utilizando el contenido del archivo
export TEMP_POSTGRES_CA="$contenido"

# Ejecuta el comando de Docker Compose
docker-compose up
