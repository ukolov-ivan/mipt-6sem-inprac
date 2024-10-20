FROM node:22.9.-alpine AS node

ENV APP_HOME=/app
RUN mkdir ${APP_HOME}
WORKDIR ${APP_HOME}

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend/* ./
CMD ["npm", "start"]
