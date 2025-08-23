#!/usr/bin/env sh

# Espera o PostgreSQL estar pronto
./wait-for-it.sh db

# Roda as migrations mais recentes
npx knex migrate:latest

# Inicia o servidor com nodemon
nodemon index.js --watch src --ext js,json

