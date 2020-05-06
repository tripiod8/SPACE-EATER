class Red_Beam_Right extends Phaser.Physics.Arcade.Sprite{
    constructor(x, y, scene){
        super(scene, x, y, 'red_beam');
        scene.physics.world.enableBody(this);
        scene.red_beam_right.add(this);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.velocity.y = +gameSettings.gameSpeed;
    }

    update(){
        if(this.y > 700){
            this.destroy();
        }
        if(gameSettings.gameWon == true){
            this.disableBody(true, true);
        }
    }
}