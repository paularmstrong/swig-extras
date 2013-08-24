BIN = node_modules/.bin

all:
	@echo "Installing packages"
	@npm install --loglevel=error
	@cp scripts/githooks/* .git/hooks/
	@chmod -R +x .git/hooks/

files := $(shell find . -name '*.js' ! -path "./node_modules/*")
lint:
	@${BIN}/nodelint ${files} --config=scripts/config-lint.js

tests := $(shell find ./tests -name '*.test.js' ! -path "*node_modules/*")
reporter = dot
opts =
test:
	@${BIN}/mocha --reporter ${reporter} ${opts} ${tests}

.PHONY: all lint test
