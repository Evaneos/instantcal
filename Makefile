.PHONY: all watch
.DEFAULT_GOAL := default

install:
	npm install
	make clean

default: install
	@node_modules/.bin/gulp
watch:
	@node_modules/.bin/gulp watch
build:
	@node_modules/.bin/gulp build
clean:
	rm -Rf lib public/*.css public/js
	@node_modules/.bin/jspm bundle --minify --no-mangle react + react-dom + babel-runtime/core-js public/js/common.js

bundle-prod:
	@node_modules/.bin/jspm bundle-sfx --minify --no-mangle js/main.js public/main-sfx.js

build-prod: install build bundle-prod

lint:
	@node_modules/.bin/eslint --fix -c .eslintrc src/

release: lint clean build
	@node_modules/.bin/release
