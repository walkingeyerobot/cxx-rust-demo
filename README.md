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
You'll need Emscripten from [https://github.com/walkingeyerobot/emscripten](https://github.com/walkingeyerobot/emscripten/tree/wbg-walkingeyerobot)

You'll need wasm-bindgen from https://github.com/walkingeyerobot/wasm-bindgen

I could probably do some more setup instructions here.

### Build the Rust code.
```
cargo build -v --target=wasm32-unknown-emscripten
```
### Build the C++ code and link in the Rust.
```
EMCC_DEBUG=1 EMCC_DEBUG_SAVE=1 em++ embind.cc random_point_generator.cc -lembind target/wasm32-unknown-emscripten/debug/libcxxrustdemo.a --pre-js=pre.js --js-library library_wbg.js -sEXPORTED_FUNCTIONS=___wbg_randompointgeneratorrs_free,___wbg_rspoint_free,___wbindgen_describe_randompointgeneratorrs_get_random_point,___wbindgen_describe_randompointgeneratorrs_new,___wbindgen_describe_rs_add,___wbindgen_describe_rspoint_get_x,___wbindgen_describe_rspoint_get_y,_random_rs,_randompointgeneratorrs_get_random_point,_randompointgeneratorrs_new,_rs_add,_rspoint_get_x,_rspoint_get_y,___externref_drop_slice,___externref_heap_live_count,___externref_table_alloc,___externref_table_dealloc,___wbindgen_exn_store,___wbindgen_free,___wbindgen_malloc,___wbindgen_realloc -Wno-undefined -sWASM_BINDGEN
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
1. Make changes to wasm-bindgen to automatically generate `pre.js` and `library_wbg.js`.
2. Figure out how to merge the `pre.js` code into `library_wbg.js`. This isn't strictly necessary, but it would simplify things.
3. Make changes to Emscripten to properly take a `-sWASM_BINDGEN` option or something.
4. There's an issue with running stripping on the wasm-bindgen produced .wasm. `llvm-objcopy` errors out with `invalid function export`. I just commented out that part in Emscripten for now, but it needs to be fixed.
5. Automatically generate exports from the rust compiles to pass to Emscripten during link. Maybe see about the `tmpdir` argument [here](https://github.com/rust-lang/rust/blob/7e6be136472a49c511a6861b9cbd9b6522c11762/compiler/rustc_codegen_ssa/src/back/linker.rs#L1250-L1265) or maybe use llvm-nm on rust object files or something?
