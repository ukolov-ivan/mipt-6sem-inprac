ARG NODE_VERSION=16.14-alpine

FROM node:${NODE_VERSION} AS node

# FROM node AS client-local-build

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

COPY ./package*.json .

COPY . .
RUN npm install


CMD ["npm","start"]
