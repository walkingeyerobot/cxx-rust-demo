#include "random_point_generator.h"

// Implemented in generators/cc/generator.rs
extern "C" double random_rs(double lower, double upper);

namespace wasm_codelab {

CcPoint ::CcPoint(double x, double y) : x_(x), y_(y) {}

double CcPoint::getX() const { return x_; }
double CcPoint::getY() const { return y_; }


RandomPointGeneratorCc ::RandomPointGeneratorCc(double left, double top,
                                                 double right, double bottom)
      : left_(left),
        right_(right),
        top_(top),
        bottom_(bottom) {}

CcPoint RandomPointGeneratorCc::getRandomPoint() {
  double x = random_rs(left_, right_);
  double y = random_rs(top_, bottom_);
  return CcPoint(x, y);
}
}  // namespace wasm_codelab
