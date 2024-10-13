FROM python:3.10.0-slim

ENV APP_HOME=/app
RUN mkdir ${APP_HOME}
RUN mkdir ${APP_HOME}/staticfiles
WORKDIR $APP_HOME

RUN apt-get update \
  && apt-get install -y build-essential \
  && apt-get -y install netcat gcc postgresql \
  && apt-get purge -y --auto-remove \
  && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip3 install --upgrade pip
COPY /backend/requirements.txt ./requirements.txt 
RUN pip3 install -r requirements.txt

COPY ./backend .
ENTRYPOINT ["bash", "./entrypoint.sh"]
