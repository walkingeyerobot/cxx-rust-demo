var Module = {
    onRuntimeInitialized: () => {
        var rpgcc = new Module.RandomPointGeneratorCc(0, 0, 100, 100);
        var p = rpgcc.getRandomPoint();
        console.log(p.getX() + ', ' + p.getY());
    }
};
