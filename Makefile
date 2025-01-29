install: deps-install
	npx simple-git-hooks

lint:
	npx eslint .

test:
	npm test
