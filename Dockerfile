FROM node:20-alpine3.18 as base
WORKDIR /app
COPY . .
RUN yarn install --production && yarn tsc

FROM node:20-alpine3.18 as deploy
USER node
WORKDIR /app
COPY --from=base --chown=node:node /app/dist /app/dist
CMD node /app/dist/index.js
