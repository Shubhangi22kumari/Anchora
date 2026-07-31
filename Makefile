.PHONY: all build test contracts-build contracts-test frontend-build frontend-lint

all: build test

build: contracts-build frontend-build

test: contracts-test frontend-lint

contracts-build:
	cd contracts && cargo build --target wasm32-unknown-unknown --release

contracts-test:
	cd contracts && cargo test --lib --workspace

frontend-build:
	cd frontend && npm run build

frontend-lint:
	cd frontend && npm run lint
