# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

WORKDIR /
CMD ["mkdir","Deploy"]
CMD ["mkdir","Deploy/resources"]
COPY resources/env-dev.yml Deploy/resources/env-dev.yml

WORKDIR /app

COPY requirements.txt requirements.txt
COPY . .

RUN pip3 install -r requirements.txt

EXPOSE 8081
EXPOSE 3306

CMD [ "python3", "server.py", "--host=0.0.0.0"]
