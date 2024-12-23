use rand::Rng;
use wasm_bindgen::prelude::*;

#[no_mangle]
pub extern "C" fn random_rs(lower: f64, upper: f64) -> f64 {
    let mut rng = rand::thread_rng();
    return rng.gen_range(lower..upper);
}

#[wasm_bindgen]
pub fn rs_add(a: i32, b: i32) -> i32 {
    return a + b;
}

#[wasm_bindgen]
#[repr(C)]
struct RsPoint {
    x: f64,
    y: f64,
}

#[wasm_bindgen]
impl RsPoint {
    pub fn get_x(&self) -> f64 {
        self.x
    }
    pub fn get_y(&self) -> f64 {
        self.y
    }
}

#[wasm_bindgen]
#[repr(C)]
struct RandomPointGeneratorRs {
    left: f64,
    top: f64,
    right: f64,
    bottom: f64,
}

#[wasm_bindgen]
impl RandomPointGeneratorRs {
    pub fn new(left: f64, top: f64, right: f64, bottom: f64) -> Self {
        Self { left, top, right, bottom }
    }

    pub fn get_random_point(&self) -> RsPoint {
        RsPoint {
            //x: unsafe { random_cc(self.left, self.right) },
            //y: unsafe { random_cc(self.top, self.bottom) },
            x: random_rs(self.left, self.right),
            y: random_rs(self.top, self.bottom),
        }
    }
}
