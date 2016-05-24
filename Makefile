BABEL = ./node_modules/.bin/babel

all: node

node: lib
	@mkdir -p node/
	@for path in lib/*.js; do \
		file=`basename $$path`; \
		$(BABEL) --presets es2015 "lib/$$file" > "node/$$file"; \
	done
