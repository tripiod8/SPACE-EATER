var gameSettings = {
    gameSpeed: 200,
    frm_count: 0,
    alien_count:0
}

var config = {
    width: 600,
    height: 800,
    scene: [Scene1, Scene2, Scene3],
    physics: {
        default: 'arcade',
            arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);

