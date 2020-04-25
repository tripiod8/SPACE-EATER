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

        //////////////// KEYBOARD ////////////////////////////////////////////////
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /////////////////////////////////////////////////////////////////////////

        //////////// GROUPS /////////////////////////////////////////////
        this.oneEyeAliens = this.add.group();
        
        this.projectiles = this.add.group();
        this.red_beam_left = this.add.group();
        this.red_beam_right = this.add.group();

        this.powerUps = this.add.group();
        ///////////////////////////////////////////////////////////////////////////////////////

        /////////////// COLLIDES //////////////////////////////////////////////////////////
        this.physics.add.overlap(this.rocket, this.powerUps, function(rocket, powerUp){
            powerUp.destroy();
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
        gameSettings.frm_count++;

        this.background.tilePositionY -= 0.5;
        utils.dying_planet(this);
    
        manageRocket.moveRocketManager(this.rocket, this.throttle, this.cursorKeys);
        manageRocket.fireWeapon(this);

        for (var i = 0; i < this.oneEyeAliens.getChildren().length; i++) {
            var oneEye_alien = this.oneEyeAliens.getChildren()[i];
            this.physics.add.overlap(this.projectiles, oneEye_alien, function(projectile, alien){
                projectile.destroy();
                alien.data.list.lives -= 1;
                if(alien.data.list.lives == 0){
                    alien.destroy();
                };            
            });
            oneEye_alien.update();
        }

        utils.beam(this);

        utils.redBeamLeft(this);

        utils.redBeamRight(this);

        if((gameSettings.frm_count % 120) == 0){
            this.randomPowerUp();
        }
         if((gameSettings.frm_count % 600) == 0){
             if(this.oneEyeAliens.getChildren().length < 3){
                this.randomAlien();
             }
         }
         if((gameSettings.frm_count % 120) == 0){
            for(var i=0; i < this.oneEyeAliens.getChildren().length; i++){
                var x = this.oneEyeAliens.getChildren()[i].x;
                var y = this.oneEyeAliens.getChildren()[i].y;
                manageBeam.redBeamLeft(x + 41, y + 15, this);
                manageBeam.redBeamRight(x - 45, y + 15, this);
            }
         }
    }

    randomPowerUp(){
        var powerUp = new PowerUp(this);
    }

    randomAlien(){
        var oneEye_alien = new OneEye_Alien(this);
    }
}