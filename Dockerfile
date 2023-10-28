FROM node:alpine3.12
COPY . .
RUN mkdir /static
RUN mkdir /static/image
RUN yarn install && yarn tsc
CMD node src/index.js
