FROM node:20.14-alpine AS node

ENV APP_HOME=/app
RUN mkdir ${APP_HOME}
WORKDIR ${APP_HOME}

COPY ./frontend/package*.json ./
RUN npm install
RUN npm install --save react-scripts

COPY ./frontend/* ./
CMD ["npm", "start"]
