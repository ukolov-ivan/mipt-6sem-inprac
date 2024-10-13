FROM python:3.10.0-slim

ENV APP_HOME=/app
RUN mkdir ${APP_HOME}
RUN mkdir ${APP_HOME}/staticfiles && echo ${APP_HOME}
WORKDIR $APP_HOME


RUN apt-get update \
  && apt-get install -y build-essential \
  && apt-get -y install netcat gcc postgresql \
  && apt-get purge -y --auto-remove \
  && rm -rf /var/lib/apt/lists/*

RUN pip3 install --upgrade pip

COPY ./requirements.txt ${APP_HOME}/requirements.txt 

RUN pip3 install -r requirements.txt

