all: test
install:
	npm i
server:
	@./bin/nodecv-server -p 9900
build-docker:
	docker build . -t="nodecv-server"
deploy: install
	make server
deploy-ci: install
	make server &
ci: build-docker
	docker run -it -p 9900:9900 --entrypoint=bash --rm nodecv-server:latest -c "cd /nodecv-server && make deploy-ci"
.PHONY: test
