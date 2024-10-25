install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	bin/gendiff.js