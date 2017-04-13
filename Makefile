git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm i
test:
	@node --harmony \
		${npm_bin}/istanbul cover ${npm_bin}/_mocha \
		-- \
		--timeout 10000 \
		--require co-mocha
travis: install
	@NODE_ENV=test $(BIN) $(FLAGS) \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		$(REQUIRED) \
		$(TESTS) \
		--bail
jshint:
	@${npm_bin}/jshint .
server:
	@./bin/nodecv-server -p 9900
build-docker:
	docker build . -t="nodecv-server"
deploy: install
	make server &
deploy-ci: install
	make server
ci: build-docker
	docker run -it -p 9900:9900 --entrypoint=bash --rm nodecv-server:latest -c "cd /nodecv-server && make deploy-ci"
.PHONY: test
