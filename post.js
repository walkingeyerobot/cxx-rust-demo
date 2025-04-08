(function() {
  var oldCallback = Module.onRuntimeInitialized || function(){};
  Module.onRuntimeInitialized = function() {
    globalThis.window = globalThis;
    globalThis.Window = globalThis.constructor;
    //Module.make_the_window_small();
    //console.log(Module.basic_example());
  };
}());
