class Scene3 extends Phaser.Scene {
    constructor() {
        super('playGame');
    }
    create() {
        ///////////////// BACKGROUND ////////////////////////////////////////////////////////////
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        this.dying_planet = this.add.image(config.width / 2, 650, 'dying_planet')
        this.dying_planet.setScale(1.75);
        /////////////////////////////////////////////////////////////////////////////

        //////////////// ROCKET //////////////////////////////////////////////////
        this.throttle = this.physics.add.sprite(config.width / 2, (config.height * 0.8) + 42, 'throttle');
        this.rocket = this.physics.add.image(config.width / 2, config.height * 0.8, 'rocket');
        this.throttle.play('throttle_anim');
        this.rocket.setDepth(2);
        this.throttle.setDepth(2);
        ////////////////////////////////////////////////////////////////////////////

        //////////// ENEMIES ////////////////////////////////////////////////////
        this.oneEye_alien = this.physics.add.sprite(config.width / 2, config.height / 2, 'oneEye_alien');
        this.oneEye_alien.setDepth(2);
        this.oneEye_alien.setCollideWorldBounds(true);
        this.oneEye_alien.play("oneEye_alien_anim");
        /////////////////////////////////////////////////////////////////////////

        //////////////// KEYBOARD ////////////////////////////////////////////////
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /////////////////////////////////////////////////////////////////////////

        //////////// PROJECTILES /////////////////////////////////////////////
        this.projectiles = this.add.group();
        this.red_beam_left = this.add.group();
        this.red_beam_right = this.add.group();

        this.powerUps = this.add.group();
        ///////////////////////////////////////////////////////////////////////////////////////

        /////////////// COLLIDES //////////////////////////////////////////////////////////
        this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
            powerUp.destroy();
            projectile.destroy();
        });

        this.physics.add.collider(this.projectiles, this.oneEye_alien, function(projectile, alien){
            gameSettings.alien_count += 1;
            projectile.destroy();
            console.log(gameSettings.alien_count);
            
            
        });
        ////////////////////////////////////////////////////////////////////////////////////

        ////////////// HEADER //////////////////////////////////////////////////////
        this.scoreString = 'Score: '
        this.score = 0;
        this.logo = this.add.image(80, 80, 'logo');
        this.scoreText = this.add.text(config.width * 0.8, config.height * 0.05, this.scoreString, { font: "25px Space Mono" });
        this.logo.setDepth(1);
        this.scoreText.setDepth(1);
        /////////////////////////////////////////////////////////////////////////////////
    }
    update() {
        this.dying_planet.y += 1.5;
        if(this.dying_planet. y >= 1200) {
            this.dying_planet.destroy();
        }

        if(gameSettings.alien_count == 7){
            this.oneEye_alien.destroy();
        }
        if(gameSettings.alien_count < 7){
            this.moveDroid();
        }
        
        
        gameSettings.frm_count++;
    
        this.background.tilePositionY -= 0.5;
        manageRocket.moveRocketManager(this.rocket, this.throttle, this.cursorKeys);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootBeam();
            this.redBeamLeft();
            this.redBeamRight();
            this.score += 10;
            this.scoreText.setText(this.scoreString + this.score);
        }

        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }

        for (var i = 0; i < this.red_beam_left.getChildren().length; i++) {
            var red_beam_left = this.red_beam_left.getChildren()[i];
            red_beam_left.update();
        }

        for (var i = 0; i < this.red_beam_right.getChildren().length; i++) {
            var red_beam_right = this.red_beam_right.getChildren()[i];
            red_beam_right.update();
        }

        if((gameSettings.frm_count % 120) == 0){
            this.randomPowerUp();
        }
    }

    shootBeam() {
        var beam = new Green_Beam(this);
    }

    redBeamLeft() {
        var red_beam_left = new Red_Beam_Left(this);
    }
    
    redBeamRight(){
        var red_beam_right= new Red_Beam_Right(this);
    }

    randomPowerUp(){
        var powerUp = new PowerUp(this);
    }

     moveDroid(){
        this.droidMover = Phaser.Math.Between(1, 4)
        
         if(this.droidMover == 1){
             this.oneEye_alien.setVelocityX(100);
         } else if(this.droidMover == 2){
             this.oneEye_alien.setVelocityX(-100);
         } else if(this.droidMover == 3){
             this.oneEye_alien.setVelocityY(100);
         } else if(this.droidMover == 4){
             this.oneEye_alien.setVelocityY(-100);
         } else {
             this.oneEye_alien.setVelocityX(0);
         }
     }
}