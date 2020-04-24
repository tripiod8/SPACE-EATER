class Red_Beam_Left extends Phaser.GameObjects.Sprite{
    constructor(x, y, scene){
        super(scene, x, y, 'red_beam');
        scene.red_beam_left.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.velocity.y = +gameSettings.gameSpeed;
    }

    update(){
        if(this.y > 700){
            this.destroy();
        }
    }
}