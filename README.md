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
EMCC_DEBUG=1 EMCC_DEBUG_SAVE=1 em++ embind.cc random_point_generator.cc -lembind target/wasm32-unknown-emscripten/debug/libcxxrustdemo.a --post-js=post.js -sEXPORTED_FUNCTIONS=___wbg_randompointgeneratorrs_free,___wbg_rspoint_free,___wbindgen_describe_randompointgeneratorrs_get_random_point,___wbindgen_describe_randompointgeneratorrs_new,___wbindgen_describe_rs_add,___wbindgen_describe_rspoint_get_x,___wbindgen_describe_rspoint_get_y,_random_rs,_randompointgeneratorrs_get_random_point,_randompointgeneratorrs_new,_rs_add,_rspoint_get_x,_rspoint_get_y,___externref_drop_slice,___externref_heap_live_count,___externref_table_alloc,___externref_table_dealloc,___wbindgen_exn_store,___wbindgen_free,___wbindgen_malloc,___wbindgen_realloc -Wno-undefined -sWASM_BINDGEN
```
### Run it
```
node a.out.js
```
You should see some random numbers get printed out like this:
```
testing js -> c++, random point:
58.11117446948042, 30.315140343167112
testing js -> rust, add:
7
testing js -> rust: random point:
16.48646923280117, 89.43444161227008
```
## What's next?

### For Emscripten
1. There's an issue with running stripping on the wasm-bindgen produced .wasm. `llvm-objcopy` errors out with `invalid function export`. I just commented out that part in Emscripten for now, but it needs to be fixed.

### For wasm-bindgen
1. Start writing tests. Every test that wasm-bindgen currently has should have an `--output=emscripten` equivalent.
2. Fix all the tests that we just wrote that are broken.

### For rustc
1. Automatically generate exports from the rust compiles to pass to Emscripten during link. Maybe see about the `tmpdir` argument [here](https://github.com/rust-lang/rust/blob/7e6be136472a49c511a6861b9cbd9b6522c11762/compiler/rustc_codegen_ssa/src/back/linker.rs#L1250-L1265) or maybe use llvm-nm on rust object files or possibly this exists already in some compiler output somewhere? Absolute worst case we can write a fake linker that's just a python script that forwards along the rust objects and `-sEXPORTED_FUNCTIONS`.

Once we can automatically pass the `-sEXPORTED_FUNCTIONS` stuff to emscripten's linker, `-Wno-undefined` will also become unnecessary. Several of those symbols (i.e. the `describe` ones) are ones that wasm-ld needs to keep alive but that wasm-bindgen will remove. These symbols do not need to be passed all the way through like other `-sEXPORTED_SYMBOLS` need to be.
