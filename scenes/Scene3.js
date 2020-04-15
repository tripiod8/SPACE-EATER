class Scene3 extends Phaser.Scene {
    constructor() {
        super('playGame');
    }
    create() {
        ///////////////// BACKGROUND ////////////////////////////////////////////////////////////
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
        /////////////////////////////////////////////////////////////////////////////

        //////////// VAR /////////////////////////////////////////////////////////////
        this.frm_count = 0;
        // this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        //////////////////////////////////////////////////////////////////////////////

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

        //////////// PROJECTILES /////////////////////////////////////////////
        this.projectiles = this.add.group();

        this.powerUps_arr = ['ammo', 'recharge', 'shield'];
        this.powerUps = this.add.group();
        this.powerUps.enableBody = true;

        this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
            powerUp.destroy();
            projectile.destroy();
        });
        ///////////////////////////////////////////////////////////////////////////////////////

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
        this.frm_count++;
    
        this.background.tilePositionY -= 0.5;
        manageRocket.moveRocketManager(this.rocket, this.throttle, this.cursorKeys);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootBeam();
            this.score += 10;
            this.scoreText.setText(this.scoreString + this.score);
        }

        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }

        if ((this.frm_count % 120) == 0) {
            this.choice_powerUp = Math.floor(Math.random() * 3);
            this.mypowerUp = this.powerUps_arr[this.choice_powerUp]; 
            this.powerUp = this.physics.add.sprite(Phaser.Math.Between(0, 600), Phaser.Math.Between(0, 800), this.mypowerUp);
            this.powerUps.add(this.powerUp);
            console.log(this.powerUp);

            if(this.powerUp.texture.key == 'recharge'){
                console.log('Found one!');
            }
        }

        // This does not do anyhting
        for(var i=0; i<this.powerUps.children.length; i++){
            if(this.powerUps.children[i].y < 10){
                this.my_powerUp = this.powerUps[i];
                this.my_powerUp.y = 650;
                this.my_powerUp.x = (Math.random() * 650)+50;
            }
        }
    }

    shootBeam() {
        var beam = new Beam(this);
    }
}