install:
	npm install

docker:
	sudo docker-compose up

test:
	(cd e2e && npm run e2e)
