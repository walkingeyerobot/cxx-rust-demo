# cxx-rust-demo
## What is this?
This repo is mostly so I can more easily share my hacking experiments.

## What is your actual goal?
I'm trying to set up a build where:
1. Emscripten is driving the build.
2. My C++ has a Rust dep.
3. Emscripten is using embind to interface with JS.
4. Rust is using wasm-bindgen to interface with JS.

To do this, my goal is to make wasm-bindgen output JS that can be consumed by Emscripten. Changes to both wasm-bindgen and Emscripten will be necessary.

## The issue we encountered when targeting wasm32-unknown-emscripten.
When executing wasm-bindgen over the generated .wasm file targeting wasm32-unknown-emscripten, we run into the following error:
```
thread 'main' panicked at crates/wasm-interpreter/src/lib.rs:196:18:
failed to find entry in function table: failed to find `32753` in function table
```

We attempted to address this in the wasm interpreter, but that appears to trigger another failure mode and it also breaks the wasm32-unknown-unknown use case.

## How do I build this?
### Install cargo and rust and emscripten and stuff.
You'll need Emscripten from [https://github.com/walkingeyerobot/emscripten](https://github.com/walkingeyerobot/emscripten/tree/wbg-walkingeyerobot). Note the branch is called `wbg-walkingeyerobot`. Update PATH variable so that it points to this emscripten repo.

You'll need wasm-bindgen from https://github.com/walkingeyerobot/wasm-bindgen

I could probably do some more setup instructions here.

## Reproduction steps.
Build the wasm-bindgen binary in the directory where wasm-bindgen is cloned. 
```
cargo build --all
```
Build and link the reproducer source. The reproducer source is copied directly from wasm-bindgen doc's section on heap-allocated closures when passing Rust closures to JS.
https://rustwasm.github.io/wasm-bindgen/reference/passing-rust-closures-to-js.html
```
cd ../cxx-rust-demo
cargo build -v
```
### Execute the wasm-bindgen over the .wasm genereated.
```
RUST_BACKTRACE=1 ../wasm-bindgen/target/debug/wasm-bindgen target/wasm32-unknown-emscripten/debug/cxxrustdemo.wasm --out-dir wbg/
```
