NPM_PACKAGE := $(shell node -e 'process.stdout.write(require("./package.json").name)')
NPM_VERSION := $(shell node -e 'process.stdout.write(require("./package.json").version)')

GITHUB_PROJ := https://github.com//nagaozen/${NPM_PACKAGE}



build:
	rm -rf ./dist
	mkdir dist
	# Browserify
	( printf "/*! ${NPM_PACKAGE} ${NPM_VERSION} ${GITHUB_PROJ} @license MIT */" ; \
		npx browserify -s markdownitTags -t babelify --presets [ "@babel/preset-env" ] . \
		) > dist/markdown-it-tags.js
	# Minify
	npx uglifyjs dist/markdown-it-tags.js -c -m \
		--preamble "/*! ${NPM_PACKAGE} ${NPM_VERSION} ${GITHUB_PROJ} @license MIT */" \
> dist/markdown-it-tags.min.js

upddemo:
	rm -rf ./lib
