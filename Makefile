.PHONY: all watch default

install:
	npm install
	node_modules/.bin/jspm install
	make clean

default:
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
