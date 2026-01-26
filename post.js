(function() {
  var oldCallback = Module.onRuntimeInitialized || (function(){});
  Module.onRuntimeInitialized = function() {
    oldCallback();

    console.log('testing js -> c++, random point:');
    var rpgcc = new Module.RandomPointGeneratorCc(0, 0, 100, 100);
    var p = rpgcc.getRandomPoint();
    console.log(p.getX() + ', ' + p.getY());

    console.log('testing js -> rust: random point:');
    var rpgrs = new Module.RandomPointGeneratorRs(0, 0, 100, 100);
    p = rpgrs.getRandomPoint();
    console.log(p.getX() + ', ' + p.getY());
    p.free();
  };
}());
