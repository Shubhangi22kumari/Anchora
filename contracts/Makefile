.PHONY: build test clean optimize

build:
	cargo build --target wasm32-unknown-unknown --release

test:
	cargo test --lib --workspace

clean:
	cargo clean

optimize:
	stellar contract optimize --wasm target/wasm32-unknown-unknown/release/invoice_registry.wasm
	stellar contract optimize --wasm target/wasm32-unknown-unknown/release/funding_pool.wasm
	stellar contract optimize --wasm target/wasm32-unknown-unknown/release/settlement.wasm
	stellar contract optimize --wasm target/wasm32-unknown-unknown/release/reputation.wasm
