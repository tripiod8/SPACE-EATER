class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x = scene.rocket.x;
        var y = scene.rocket.y - 40;

        super(scene, x, y, 'green_beam');
        
        scene.projectiles.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -gameSettings.gameSpeed;

    }

    update(){
        if(this.y < 200){
            this.destroy();
        }
    }
}