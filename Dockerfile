FROM node:alpine3.12
COPY . .
RUN yarn install && yarn tsc
CMD node src/index.js