#include <emscripten.h>
#include <emscripten/bind.h>

#include "random_point_generator.h"


EMSCRIPTEN_BINDINGS(random) {
  emscripten::class_<wasm_codelab::CcPoint>("CcPoint")
      .constructor<double, double>()
      .function("getX", &wasm_codelab::CcPoint::getX)
      .function("getY", &wasm_codelab::CcPoint::getY);

  emscripten::class_<wasm_codelab::RandomPointGeneratorCc>("RandomPointGeneratorCc")
      .constructor<double, double, double, double>()
      .function("getRandomPoint", &wasm_codelab::RandomPointGeneratorCc::getRandomPoint);
}
