install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	bin/gendiff.js

test:
	npm run test

test-coverage:
	npm run test -- --coverage
