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
    // TODO(walkingeyerobot): how badly does this need ignoreBOM and fatal?
    const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

    if (typeof TextDecoder !== 'undefined') {
      cachedTextDecoder.decode();
    };

    function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return cachedTextDecoder.decode(HEAP8.subarray(ptr, ptr + len));
    }

    return function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
  }()),
};

addToLibrary(LibraryWbg);
