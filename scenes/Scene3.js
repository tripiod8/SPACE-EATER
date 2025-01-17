class Scene3 extends Phaser.Scene {
    constructor() {
        super('playGame');
    }
    create() {
        ///////////////// BACKGROUND ////////////////////////////////////////////////////////////
        this.background=this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
        this.dying_planet=this.add.image(config.width/2, 650, 'dying_planet'); // todo (fix height)
        this.dying_planet.setScale(1.75);
        this.living_planet=this.physics.add.image(config.width/2, -500, 'living_planet'); //todo (fix height)
        this.living_planet.setScale(1.50);
        this.living_planet.disableBody(true, true);
        /////////////////////////////////////////////////////////////////////////////

        //////////////// ROCKET //////////////////////////////////////////////////
        this.throttle=this.physics.add.sprite(config.width/2, (config.height*0.8)+42, 'throttle');
        this.rocket=this.physics.add.image(config.width/2, config.height*0.8, 'rocket');
        this.shield=this.physics.add.image(config.width/2, config.height*0.8-42, 'shield_rocket');
        this.throttle.play('throttle_anim');
        this.rocket.setDataEnabled();
        this.shield.setDataEnabled();
        this.rocket.data.set('lives', 10);
        this.rocket.data.set('shield', false);
        this.shield.data.set('lives', 5);
        this.rocket.setDepth(2);
        this.throttle.setDepth(2);
        ////////////////////////////////////////////////////////////////////////////

        //////////////// KEYBOARD ////////////////////////////////////////////////
        this.cursorKeys=this.input.keyboard.createCursorKeys();
        this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /////////////////////////////////////////////////////////////////////////

        //////////// GROUPS /////////////////////////////////////////////
        this.oneEyeAliens=this.add.group(); 
        this.projectiles=this.add.group();
        this.red_beam_left=this.add.group();
        this.red_beam_right=this.add.group();
        this.powerUps=this.add.group();
        ///////////////////////////////////////////////////////////////////////////////////////

        ////////////// HEADER //////////////////////////////////////////////////////
        this.logo=this.add.image(80, 80, 'logo');
        this.healthbar=this.add.sprite(config.width*0.85, config.height*0.07, 'healthbar', 10);
        gameSettings.scoreText = this.add.text(config.width*0.75, config.height*0.095, gameSettings.scoreString, { font: "25px Space Mono" });
        this.logo.setDepth(1);
        this.healthbar.setDepth(1)
        gameSettings.scoreText.setDepth(1);
        /////////////////////////////////////////////////////////////////////////////////
    }
    update() {
        gameSettings.frm_count++;
        if(gameSettings.frm_count==4000){
            gameSettings.gameWon=true;
        }

        this.background.tilePositionY-=0.5;
        utils.dying_planet(this);
        utils.living_planet(this);

        
        manageRocket.dead(this);
        manageRocket.lives(this);
        manageRocket.moveRocketManager(this.rocket, this.throttle, this.cursorKeys);
        manageRocket.fireWeapon(this);
        manageRocket.shield(this);

         this.physics.add.overlap(this.rocket, this.red_beam_left, function(rocket, beam){
             beam.destroy()
             rocket.data.list.lives-=1;            
         })  
         this.physics.add.overlap(this.rocket, this.red_beam_right, function(rocket, beam){
             beam.destroy()
             rocket.data.list.lives-=1;            
         })
         this.physics.add.overlap(this.shield, this.red_beam_left, function(shield, beam){
            beam.destroy()
            shield.data.list.lives-=1;            
        })  
        this.physics.add.overlap(this.shield, this.red_beam_right, function(shield, beam){
            beam.destroy()
            shield.data.list.lives-=1;            
        })
    
        for(var i=0; i<this.oneEyeAliens.getChildren().length; i++) {
            var oneEye_alien=this.oneEyeAliens.getChildren()[i];
            this.physics.add.overlap(this.projectiles, oneEye_alien, function(projectile, alien){
                projectile.destroy();
                utils.score(10);
                alien.data.list.lives-=1;
                if(alien.data.list.lives==0){
                    alien.destroy();
                };            
            });
            oneEye_alien.update();
        }

        for(var i=0; i<this.powerUps.getChildren().length; i++){
            var powerUp=this.powerUps.getChildren()[i];
            powerUp.update();
        }

        utils.beam(this);
        utils.redBeamLeft(this);
        utils.redBeamRight(this);

        if((gameSettings.frm_count%120)==0&&gameSettings.gameWon==false){
            this.randomPowerUp();
        }

        this.physics.add.overlap(this.rocket, this.powerUps, function(rocket, powerUp){
            if(powerUp.texture.key==='recharge'){
                if(rocket.data.list.lives!=10){
                    rocket.data.list.lives+=1;
                };
            }else if(powerUp.texture.key==='shield'){
                rocket.data.list.shield=true;
            };
            powerUp.destroy();
        })

         if((gameSettings.frm_count % 600) == 0){
             if(this.oneEyeAliens.getChildren().length < 3 && gameSettings.gameWon == false){
                this.randomAlien();
             };
         }

         for(var i=0; i < this.oneEyeAliens.getChildren().length; i++){
            var x = this.oneEyeAliens.getChildren()[i].x;
            var y = this.oneEyeAliens.getChildren()[i].y;
            if((gameSettings.frm_count % Phaser.Math.Between(100, 200)) == 0 && gameSettings.gameWon == false){
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