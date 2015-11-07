.PHONY: all watch default

install:
	npm install
	node_modules/.bin/jspm install

default:
	@node_modules/.bin/gulp
watch:
	@node_modules/.bin/gulp watch
build:
	@node_modules/.bin/gulp build
clean:
	rm -Rf lib public/*.css public/js

bundle-prod:
	@node_modules/.bin/jspm bundle-sfx js/main.js public/main-sfx.js
