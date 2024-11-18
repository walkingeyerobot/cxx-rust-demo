#ifndef _RANDOM_POINT_GENERATOR_H_
#define _RANDOM_POINT_GENERATOR_H_


namespace wasm_codelab {
class CcPoint {
 public:
  CcPoint(double x, double y);
  double getX() const;
  double getY() const;

 private:
  double x_, y_;
};

class RandomPointGeneratorCc {
 public:
  RandomPointGeneratorCc(double left, double top, double right, double bottom);
  CcPoint getRandomPoint();

 private:
  double left_, right_, top_, bottom_;
  ;
};
}  // namespace wasm_codelab


#endif
