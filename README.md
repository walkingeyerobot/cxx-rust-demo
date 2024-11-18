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

## How do I build this?
### Install cargo and rust and emscripten and stuff.
idk I forgot what I installed.
### Build the Rust code.
```
cargo build --target=wasm32-unknown-emscripten
```
### Build the C++ code and link in the Rust.
```
EMCC_DEBUG=1 EMCC_DEBUG_SAVE=1 em++ embind.cc random_point_generator.cc -lembind target/wasm32-unknown-emscripten/debug/libcxxrustdemo.a --pre-js=pre.js
```
### Run it
```
node a.out.js
```

## What's the issue?
I haven't yet figured out how to produce a .wasm file that has annotations that can be consumed by wasm-bindgen that indicate that the function `rs_add` should be exported.

Once I have produced this .wasm file, I'll be able to iterate on wasm-bindgen code to produce .js that can be consumed by Emscripten.
