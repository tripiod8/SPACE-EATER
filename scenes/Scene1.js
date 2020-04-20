class Scene1 extends Phaser.Scene {
    constructor() {
        super('bootGame')
    }

    preload() {
        this.throttle = this.load.spritesheet('throttle', 'assets/rocket/Throttle.png', {
            frameWidth: 16,
            frameHeight: 32
        });
        this.asteroid = this.load.spritesheet('asteroid', 'assets/asteroid_dark_spritesheet.png', {
            frameWidth: 172,
            frameHeight: 172
        });
        this.oneEye_alien = this.load.spritesheet('oneEye_alien', 'assets/enemies/OneEye_Alien.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.rocket = this.load.image('rocket', 'assets/rocket/Rocket.png');
        this.rocket_right = this.load.image('rocket_right', 'assets/rocket/Rocket_Right.png');
        this.rocket_left = this.load.image('rocket_left', 'assets/rocket/Rocket_Left.png');

        this.ammo = this.load.image('ammo', 'assets/upgrades/Ammo.png');
        this.recharge = this.load.image('recharge', 'assets/upgrades/Recharge.png');
        this.shield = this.load.image('shield', 'assets/upgrades/Shield.png');

        this.green_beam = this.load.image('green_beam', 'assets/rocket/Green_Beam.png');

        this.dying_planet = this.load.image('dying_planet', 'assets/Dying_Planet.png');
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

        this.anims.create({
            key: 'asteroid_anim',
            frames: this.anims.generateFrameNumbers("asteroid"),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'oneEye_alien_anim',
            frames: this.anims.generateFrameNumbers("oneEye_alien"),
            frameRate: 20,
            repeat: -1
        });

        this.add.text(20, 20, 'Loading game...');
        this.scene.start('loadGame');

    }
}