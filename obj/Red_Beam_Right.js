class Red_Beam_Right extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x = scene.oneEye_alien.x - 45;
        var y = scene.oneEye_alien.y + 15;
        super(scene, x, y, 'red_beam');

        scene.red_beam_right.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.velocity.y = +gameSettings.gameSpeed;
    }
}