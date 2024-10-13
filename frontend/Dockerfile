ARG NODE_VERSION=16.14-alpine

FROM node:${NODE_VERSION} AS node

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

COPY ./frontend/package*.json .

COPY . .
RUN npm install


CMD ["npm","start"]
