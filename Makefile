install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	bin/gendiff.js

test:
	npx jest --color --runInBand --bail
