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

db.reset: db.drop db.create db.migrate

db.create:
	NODE_ENV=development npx sequelize db:create
	NODE_ENV=test npx sequelize db:create
.PHONY: db.create

db.drop:
	NODE_ENV=dev npx sequelize db:drop
	NODE_ENV=test npx sequelize db:drop
.PHONY: db.drop

db.migrate:
	npx sequelize db:migrate
.PHONY: db.migrate
