use wasm_bindgen::prelude::*;

use rand::distr::Uniform;
use rand::Rng;

#[wasm_bindgen]
pub struct Point {
    x: f64,
    y: f64,
}

#[wasm_bindgen]
impl Point {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f64, y: f64) -> Point {
        Point { x, y }
    }

    #[wasm_bindgen(js_name = getX)]
    pub fn get_x(&self) -> f64 {
        self.x
    }

    #[wasm_bindgen(js_name = getY)]
    pub fn get_y(&self) -> f64 {
        self.y
    }
}

#[wasm_bindgen]
pub struct RandomPointGenerator {
    generator: rand::prelude::ThreadRng,
    distribution_x: Uniform<f64>,
    distribution_y: Uniform<f64>,
}

#[wasm_bindgen]
impl RandomPointGenerator {
    #[wasm_bindgen(constructor)]
    pub fn new(left: f64, top: f64, right: f64, bottom: f64) -> RandomPointGenerator {
        RandomPointGenerator {
            generator: rand::rng(),
            distribution_x: Uniform::new(left, right).unwrap(),
            distribution_y: Uniform::new(top, bottom).unwrap(),
        }
    }

    #[wasm_bindgen(js_name = getRandomPoint)]
    pub fn get_random_point(&mut self) -> Point {
        let x = self.generator.sample(self.distribution_x);
        let y = self.generator.sample(self.distribution_y);
        Point::new(x, y)
    }
}
