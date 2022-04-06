install:
	npm install

docker:
	docker compose up

dockerandy:
	sudo docker-compose up

test:
	(cd e2e && npm run e2e)
