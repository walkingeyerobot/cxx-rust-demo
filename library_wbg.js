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
  __wbindgen_throw: (arg0, arg1) => {
    // TODO(walkingeyerobot): move the helper functions out.
    const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

    if (typeof TextDecoder !== 'undefined') {
      cachedTextDecoder.decode();
    };

    let cachedUint8Memory0 = HEAP8;

    function getUint8Memory0() {
      return HEAP8;
      if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
      }
      return cachedUint8Memory0;
    }

    function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
    }
    throw new Error(getStringFromWasm0(arg0, arg1));
  },
};

addToLibrary(LibraryWbg);
