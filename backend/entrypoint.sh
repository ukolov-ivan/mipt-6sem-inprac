#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for PostgreSQL..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
        sleep 1.0
    done

    echo "PostgreSQL started"
fi

mv .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput

exec "$@"