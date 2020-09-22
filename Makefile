PIPENV_BIN?=pipenv
DOCKER_COMPOSE=$(PIPENV_BIN) run docker-compose

init:
	(docker network create storage_api-dev || true)
	pip install --user $(PIPENV_BIN)
	$(PIPENV_BIN) install
.PHONY: init

build: init pg
.PHONY: build

stop:
	$(DOCKER_COMPOSE) stop
.PHONY: stop

pg:
	$(DOCKER_COMPOSE) up -d
.PHONY: pg

db.create:
	createdb storage_api_dev --host 127.0.0.1 --port 5555 -U admin
	createdb storage_api_test --host 127.0.0.1 --port 5555 -U admin
.PHONY: db.create

db.drop:
	dropdb storage_api_dev --host 127.0.0.1 --port 5555 -U admin
	dropdb storage_api_test --host 127.0.0.1 --port 5555 -U admin
.PHONY: db.drop
