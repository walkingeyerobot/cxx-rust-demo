# cxx-rust-demo
```
cargo build --target=wasm32-unknown-emscripten
EMCC_DEBUG=1 EMCC_DEBUG_SAVE=1 /usr/local/google/home/mitchfoley/repos/emsdk/upstream/emscripten/em++ embind.cc random_point_generator.cc -lembind target/wasm32-unknown-emscripten/debug/libcxxrustdemo.a --pre-js=pre.js
```