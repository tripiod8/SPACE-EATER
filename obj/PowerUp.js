class PowerUp extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var powerUps_arr = ['ammo', 'recharge', 'shield'];
        var choice_powerUp = Math.floor(Math.random() * 3);
        var mypowerUp = powerUps_arr[choice_powerUp]; 
        super(scene, Phaser.Math.Between(0, 600), Phaser.Math.Between(0, 800), mypowerUp);
        scene.powerUps.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    }
}