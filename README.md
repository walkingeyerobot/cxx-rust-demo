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
You'll need Emscripten from [https://github.com/walkingeyerobot/emscripten](https://github.com/walkingeyerobot/emscripten/tree/wbg-walkingeyerobot). Note the branch is called `wbg-walkingeyerobot`.

You'll need wasm-bindgen from https://github.com/walkingeyerobot/wasm-bindgen

I could probably do some more setup instructions here.

### Build the Rust code.
```
cargo build -v
```
### Build the C++ code and link in the Rust.
```
EMCC_DEBUG=1 EMCC_DEBUG_SAVE=1 em++ embind.cc random_point_generator.cc -lembind target/wasm32-unknown-emscripten/debug/libcxxrustdemo.a --post-js=post.js -sWASM_BINDGEN
```
### Run it
```
node a.out.js
```
You should see some random numbers get printed out like this:
```
testing js -> c++, random point:
58.11117446948042, 30.315140343167112
testing js -> rust: random point:
16.48646923280117, 89.43444161227008
```
