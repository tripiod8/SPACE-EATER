class PowerUp extends Phaser.Physics.Arcade.Sprite{
    constructor(scene){
        var powerUps_arr = ['ammo', 'recharge', 'shield'];
        var choice_powerUp = Math.floor(Math.random() * 3);
        var mypowerUp = powerUps_arr[choice_powerUp]; 
        super(scene, Phaser.Math.Between(0, 600), Phaser.Math.Between(0, 800), mypowerUp);
        scene.physics.world.enableBody(this);
        scene.powerUps.add(this);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }

    update(){
        if(gameSettings.gameWon == true){
            this.disableBody(true, true);
            
        }
    }
}