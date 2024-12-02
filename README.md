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
EMCC_DEBUG=1 EMCC_DEBUG_SAVE=1 em++ embind.cc random_point_generator.cc -lembind target/wasm32-unknown-emscripten/debug/libcxxrustdemo.a --pre-js=pre.js -sEXPORTED_FUNCTIONS=_rs_add,___wbindgen_describe_rs_add
```
### Observe the errors
Emscripten does not finish linking due to not knowing about a rust symbol. Full error:
```
error: undefined symbol: __wbindgen_describe (referenced by root reference (e.g. compiled C/C++ code))
warning: To disable errors for undefined symbols use `-sERROR_ON_UNDEFINED_SYMBOLS=0`
warning: ___wbindgen_describe may need to be added to EXPORTED_FUNCTIONS if it arrives from a system library
Error: Aborting compilation due to previous errors
```

This is fine, and even expected. Once this is finished, we'll have Emscripten invoke wasm-bindgen before it gets to this phase, and I *think* `__wbindgen_describe` will end up coming from wasm-bindgen js (though I really should confirm this).

Because we built with `EMCC_DEBUG=1 EMCC_DEBUG_SAVE=1`, we can actually look at a .wasm file. Running wabt's wasm2wat on `/tmp/emscripten_temp/emcc-00-base.wasm` lets us confirm that our `rs_add` symbols are indeed in there.

### Attempt to run wasm-bindgen
```
RUST_LOG=debug RUST_BACKTRACE=1 target/debug/wasm-bindgen --target web --keep-lld-exports --out-dir ~/tmp /tmp/emscripten_temp/emcc-00-base.wasm
```
It doesn't work :(
```
[2024-12-02T21:20:55Z DEBUG walrus::module::types] parsing type section
[2024-12-02T21:20:55Z DEBUG walrus::module::imports] parse import section
[2024-12-02T21:20:55Z DEBUG walrus::module::functions] parse function section
[2024-12-02T21:20:55Z DEBUG walrus::module::tables] parse table section
[2024-12-02T21:20:55Z DEBUG walrus::module::memories] parse memory section
[2024-12-02T21:20:55Z DEBUG walrus::module::globals] parse global section
[2024-12-02T21:20:55Z DEBUG walrus::module::exports] parse export section
[2024-12-02T21:20:55Z DEBUG walrus::module::elements] parse element section
[2024-12-02T21:20:55Z DEBUG walrus::module::data] parse data section
[2024-12-02T21:20:55Z DEBUG walrus::module] parsing custom section `__wasm_bindgen_unstable`
[2024-12-02T21:20:55Z DEBUG walrus::module] parse name section
[2024-12-02T21:20:55Z WARN  walrus::module] in name section: index `0` is out of bounds for data
[2024-12-02T21:20:55Z WARN  walrus::module] in name section: index `1` is out of bounds for data
[2024-12-02T21:20:55Z DEBUG walrus::module::producers] parse producers section
[2024-12-02T21:20:55Z DEBUG walrus::module] parsing custom section `target_features`
[2024-12-02T21:20:55Z DEBUG walrus::module::functions] parse code section
[2024-12-02T21:20:55Z DEBUG walrus::module] parse complete
[2024-12-02T21:20:55Z DEBUG wasm_bindgen_cli_support::wit] custom section '__wasm_bindgen_unstable' looks like a Wasm bindgen section
[2024-12-02T21:20:55Z DEBUG wasm_bindgen_cli_support::wit] found version specifier {"schema_version":"0.2.95","version":"0.2.95 (4b8327082)"}
[2024-12-02T21:20:55Z DEBUG wasm_bindgen_cli_support::wit] found a program of length 61
[2024-12-02T21:20:55Z DEBUG wasm_bindgen_wasm_interpreter] starting a call of Id { idx: 131 } Some("__wbindgen_describe_rs_add")
[2024-12-02T21:20:55Z DEBUG wasm_bindgen_wasm_interpreter] arguments []
[2024-12-02T21:20:55Z DEBUG wasm_bindgen_wasm_interpreter] starting a call of Id { idx: 22 } Some("invoke_v")
[2024-12-02T21:20:55Z DEBUG wasm_bindgen_wasm_interpreter] arguments [32752]
thread 'main' panicked at crates/wasm-interpreter/src/lib.rs:224:18:
can only call locally defined functions
stack backtrace:
   0: rust_begin_unwind
             at /rustc/eeb90cda1969383f56a2637cbd3037bdf598841c/library/std/src/panicking.rs:665:5
   1: core::panicking::panic_fmt
             at /rustc/eeb90cda1969383f56a2637cbd3037bdf598841c/library/core/src/panicking.rs:74:14
   2: wasm_bindgen_wasm_interpreter::Interpreter::call
             at ./crates/wasm-interpreter/src/lib.rs:224:18
   3: wasm_bindgen_wasm_interpreter::Frame::eval
             at ./crates/wasm-interpreter/src/lib.rs:389:21
   4: wasm_bindgen_wasm_interpreter::Interpreter::call
             at ./crates/wasm-interpreter/src/lib.rs:243:31
   5: wasm_bindgen_wasm_interpreter::Interpreter::interpret_descriptor
             at ./crates/wasm-interpreter/src/lib.rs:136:9
   6: wasm_bindgen_cli_support::descriptors::WasmBindgenDescriptorsSection::execute_exports
             at ./crates/cli-support/src/descriptors.rs:59:30
   7: wasm_bindgen_cli_support::descriptors::execute
             at ./crates/cli-support/src/descriptors.rs:37:5
   8: wasm_bindgen_cli_support::Bindgen::generate_output
             at ./crates/cli-support/src/lib.rs:387:9
   9: wasm_bindgen_cli_support::Bindgen::generate
             at ./crates/cli-support/src/lib.rs:302:9
  10: wasm_bindgen::rmain
             at ./crates/cli/src/bin/wasm-bindgen.rs:155:5
  11: wasm_bindgen::main
             at ./crates/cli/src/bin/wasm-bindgen.rs:88:21
  12: core::ops::function::FnOnce::call_once
             at /rustc/eeb90cda1969383f56a2637cbd3037bdf598841c/library/core/src/ops/function.rs:250:5
```
It appears to not like a call to `invoke_v` inside the body of `__wbindgen_describe_rs_add`.

## What's next?
Get wasm-bindgen to execute on that `/tmp/emscripten_temp/emcc-00-base.wasm` file.
