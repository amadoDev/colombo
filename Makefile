.PHONY: build cache_clean start dev-server test-server dev-client up

# Important
PROJECT_NAME=colombo
DOCKER_COMPOSE_WEB=docker-compose -p $(PROJECT_NAME) -f environment/dev/docker-compose.yml
DOCKER_COMPOSE_RUN_WEB=${DOCKER_COMPOSE_WEB} run --entrypoint "npm" web
DOCKER_COMPOSE_RUN_WEB_SERVICE_PORTS=${DOCKER_COMPOSE_WEB} run  --entrypoint "npm" --rm --service-ports web

# general commands
build_image:
	docker build -t $(GITLAB_REGISTRY_IMAGE) ./environment/

upload_image: build_image
	docker login $(GITLAB_REGISTRY)
	docker push $(GITLAB_REGISTRY_IMAGE)

registry_image: build_image upload_image

download_image: rm
	@if [ "$(DOCKER_IMAGES_IDS)" != "" ]; then \
		docker rmi -f $(DOCKER_IMAGES_IDS); \
	fi
	docker pull $(GITLAB_REGISTRY_IMAGE);

default: build_image

up:
	${DOCKER_COMPOSE_WEB} up web

shell:
	${DOCKER_COMPOSE_WEB} run --rm --service-ports --entrypoint "/bin/bash" web

test:
	${DOCKER_COMPOSE_WEB} run --rm  --entrypoint "npm" --service-ports web run lint
	${DOCKER_COMPOSE_WEB} run --rm  --entrypoint "npm" --service-ports web test

stop:
	@$(DOCKER_COMPOSE_WEB) stop

rm: stop
	@$(DOCKER_COMPOSE_WEB) rm -f


# special yarn/npm and custom projects
cache_verify:
		${DOCKER_COMPOSE_RUN_WEB} cache verify

install: cache_verify
		${DOCKER_COMPOSE_RUN_WEB} install

build: install
		${DOCKER_COMPOSE_RUN_WEB} run build

dev: install
		${DOCKER_COMPOSE_RUN_WEB_SERVICE_PORTS} run dev

start: build
		${DOCKER_COMPOSE_WEB} run --rm --service-ports web npm run start
