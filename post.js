(function() {
  var oldCallback = Module.onRuntimeInitialized;
  Module.onRuntimeInitialized = function() {
    oldCallback();
    console.log('testing js -> c++, random point:');
    var rpgcc = new Module.RandomPointGeneratorCc(0, 0, 100, 100);
    var p = rpgcc.getRandomPoint();
    console.log(p.getX() + ', ' + p.getY());

    console.log('testing js -> rust, add:');
    console.log(Module.rs_add(3,4));

    console.log('testing js -> rust: random point:');
    var rpgrs = Module.RandomPointGeneratorRs.new(0, 0, 100, 100);
    p = rpgrs.get_random_point();
    console.log(p.get_x() + ', ' + p.get_y());
    p.free();
  };
}());
