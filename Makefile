default: test
firefox:
	mozilla-download --product firefox firefox

.PHONY: test
test:
	./node_modules/.bin/mocha $(shell find . -name "*_test.js")
