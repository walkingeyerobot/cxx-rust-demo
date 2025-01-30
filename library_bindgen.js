var LibraryWbg = {
  __wbindgen_init_externref_table: () => {
    const table = wasmExports.__wbindgen_export_0;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
  },
  __wbindgen_throw: (function() {
    return function(arg0, arg1) {
      function getStringFromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        return UTF8Decoder.decode(HEAP8.subarray(ptr, ptr + len));
      }
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
  }()),
  $initBindgen__postset: 'addOnInit(initBindgen);',
  $initBindgen: () => {
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
  },
};

extraLibraryFuncs.push('$initBindgen');
addToLibrary(LibraryWbg);
