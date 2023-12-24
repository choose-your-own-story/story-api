FROM node:20-alpine3.18 as base
WORKDIR /app
COPY . .
RUN yarn install --production && yarn tsc

FROM node:20-alpine3.18 as deploy
USER node
WORKDIR /app
COPY --from=base --chown=node:node /app/src/repositories/queries /app/src/repositories/queries
COPY --from=base --chown=node:node /app/node_modules /app/node_modules
COPY --from=base --chown=node:node /app/dist /app/dist
COPY --from=base --chown=node:node /app/package.json /app/package.json

CMD node /app/dist/index.js
