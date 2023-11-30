FROM node:20-alpine3.18
COPY . .
RUN mkdir /static
RUN mkdir /static/image
RUN yarn install && yarn tsc
CMD node src/index.js
