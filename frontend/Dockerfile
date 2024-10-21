FROM node:22.9-alpine

ENV APP_HOME=/app
RUN mkdir ${APP_HOME}
WORKDIR ${APP_HOME}

# Install dependencies
COPY ./frontend/package*.json ./
RUN npm install
# debug
RUN echo $(ls -1 /app/node_modules/)

# Make packages discoverable by shell
ENV PATH=/app/node_modules/.bin:$PATH
COPY ./frontend/* ./
CMD ["npm", "run", "start"]
