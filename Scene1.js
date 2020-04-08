class Scene1 extends Phaser.Scene {
    constructor() {
        super('bootGame')
    }

    preload() {
        this.throttle = this.load.spritesheet('throttle', 'assets/rocket/Throttle.png', {
            frameWidth: 16,
            frameHeight: 32
        });
        this.rocket = this.load.image('rocket', 'assets/rocket/Rocket.png');
        this.rocket_right = this.load.image('rocket_right', 'assets/rocket/Rocket_Right.png');
        this.rocket_left = this.load.image('rocket_left', 'assets/rocket/Rocket_Left.png');
        this.green_beam = this.load.image('green_beam', 'assets/rocket/Green_Beam.png');
        this.background = this.load.image('background', 'assets/Background.jpg');
        this.logo = this.load.image('logo', 'assets/Logo.png');


    }
    
    create() {
        this.anims.create({
            key: "throttle_anim",
            frames: this.anims.generateFrameNumbers("throttle"),
            frameRate: 5,
            repeat: -1
        });


        this.add.text(20, 20, 'Loading game...');
        this.scene.start('playGame');

    }



}