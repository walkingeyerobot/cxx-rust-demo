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

### Set up wasm-bindgen
Get it from https://github.com/walkingeyerobot/wasm-bindgen. Needs patches to work with wasm32-unknown-emscripten and will undoubtedly have more patches as this gets closer to working.

### Build the Rust code.
```
cargo build --target=wasm32-unknown-emscripten
```
### Build the C++ code and link in the Rust.
```
EMCC_DEBUG=1 EMCC_DEBUG_SAVE=1 /usr/local/google/home/mitchfoley/repos/emscripten/em++ embind.cc random_point_generator.cc -lembind target/wasm32-unknown-emscripten/debug/libcxxrustdemo.a --pre-js=pre.js --js-library library_wbg.js -sEXPORTED_FUNCTIONS=___wbg_randompointgeneratorrs_free,___wbg_rspoint_free,___wbindgen_describe_randompointgeneratorrs_get_random_point,___wbindgen_describe_randompointgeneratorrs_new,___wbindgen_describe_rs_add,___wbindgen_describe_rspoint_get_x,___wbindgen_describe_rspoint_get_y,_random_rs,_randompointgeneratorrs_get_random_point,_randompointgeneratorrs_new,_rs_add,_rspoint_get_x,_rspoint_get_y,___externref_drop_slice,___externref_heap_live_count,___externref_table_alloc,___externref_table_dealloc,___wbindgen_exn_store,___wbindgen_free,___wbindgen_malloc,___wbindgen_realloc -Wno-undefined
```
### Run it
```
node a.out.js
```
You should see some random numbers get printed out like this:
```
5.844805697018973, 1.1136176474794368
7
66.11376134888434, 59.28121329175588
```
## What's next?
1. Make changes to wasm-bindgen to automatically generate pre.js and library_wbg.js
2. Make changes to Emscripten to not require so many manual exports and instead take a `-sWASM_BINDGEN` option or something.
