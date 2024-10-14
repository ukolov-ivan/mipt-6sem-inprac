FROM node:20.14-alpine AS node

ENV APP_HOME=/app
RUN mkdir ${APP_HOME}
WORKDIR ${APP_HOME}

COPY ./frontend/package*.json .
RUN npm install

COPY ./frontend .
ENTRYPOINT ["npm", "start"]
