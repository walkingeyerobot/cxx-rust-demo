use rand::Rng;
use wasm_bindgen::prelude::*;

#[no_mangle]
pub extern "C" fn random_rs(lower: f64, upper: f64) -> f64 {
    let mut rng = rand::thread_rng();
    rng.gen_range(lower..upper)
}

#[wasm_bindgen]
pub fn rs_add(a: i32, b: i32) -> i32 {
    a + b
}
