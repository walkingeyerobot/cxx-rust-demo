var Module = {
  onRuntimeInitialized: () => {
    wasmExports.__wbindgen_start();
    Module.rs_add = (a, b) => {
      const ret = wasmExports.rs_add(a, b);
      return ret;
    };

    const RandomPointGeneratorRsFinalization = (typeof FinalizationRegistry === 'undefined')
          ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasmExports.__wbg_randompointgeneratorrs_free(ptr >>> 0, 1));

    class RandomPointGeneratorRs {

      static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RandomPointGeneratorRs.prototype);
        obj.__wbg_ptr = ptr;
        RandomPointGeneratorRsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
      }

      __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RandomPointGeneratorRsFinalization.unregister(this);
        return ptr;
      }

      free() {
        const ptr = this.__destroy_into_raw();
        wasmExports.__wbg_randompointgeneratorrs_free(ptr, 0);
      }
      /**
       * @param {number} left
       * @param {number} top
       * @param {number} right
       * @param {number} bottom
       * @returns {RandomPointGeneratorRs}
       */
      static new(left, top, right, bottom) {
        const ret = wasmExports.randompointgeneratorrs_new(left, top, right, bottom);
        return RandomPointGeneratorRs.__wrap(ret);
      }
      /**
       * @returns {RsPoint}
       */
      get_random_point() {
        const ret = wasmExports.randompointgeneratorrs_get_random_point(this.__wbg_ptr);
        return RsPoint.__wrap(ret);
      }
    }

    const RsPointFinalization = (typeof FinalizationRegistry === 'undefined')
          ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasmExports.__wbg_rspoint_free(ptr >>> 0, 1));

    class RsPoint {

      static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RsPoint.prototype);
        obj.__wbg_ptr = ptr;
        RsPointFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
      }

      __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RsPointFinalization.unregister(this);
        return ptr;
      }

      free() {
        const ptr = this.__destroy_into_raw();
        wasmExports.__wbg_rspoint_free(ptr, 0);
      }
      /**
       * @returns {number}
       */
      get_x() {
        const ret = wasmExports.rspoint_get_x(this.__wbg_ptr);
        return ret;
      }
      /**
       * @returns {number}
       */
      get_y() {
        const ret = wasmExports.rspoint_get_y(this.__wbg_ptr);
        return ret;
      }
    }

    Module.RandomPointGeneratorRs = RandomPointGeneratorRs;
    Module.RsPoint = RsPoint;

    // testing below this point

    // js -> c++
    var rpgcc = new Module.RandomPointGeneratorCc(0, 0, 100, 100);
    var p = rpgcc.getRandomPoint();
    console.log(p.getX() + ', ' + p.getY());

    // js -> rust
    console.log(Module.rs_add(3,4));

    var rpgrs = Module.RandomPointGeneratorRs.new(0, 0, 100, 100);
    p = rpgrs.get_random_point();
    console.log(p.get_x() + ', ' + p.get_y());
    p.free();
  }
};
