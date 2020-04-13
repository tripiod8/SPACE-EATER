class Scene3 extends Phaser.Scene {
    constructor(){
        super('playGame');
    }
    create(){
        ///////////////// BACKGROUND ////////////////////////////////////////////////////////////
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0,0);
        /////////////////////////////////////////////////////////////////////////////

        //////////////// ROCKET //////////////////////////////////////////////////
        this.throttle = this.physics.add.sprite(config.width / 2, (config.height * 0.8) + 42, 'throttle');
        this.rocket = this.physics.add.image(config.width / 2, config.height * 0.8, 'rocket');
        this.throttle.play('throttle_anim');
        ////////////////////////////////////////////////////////////////////////////

        //////////////// KEYBOARD ////////////////////////////////////////////////
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /////////////////////////////////////////////////////////////////////////

        //////////// PROJECTILES /////////////////////////////////////////////
        this.projectiles = this.add.group();
        ///////////////////////////////////////////////////////////////////////////////////////

        ////////////// HEADER //////////////////////////////////////////////////////
        this.scoreString ='Score: '
        this.score = 0;
        this.logo = this.add.image(80, 80, 'logo');
        this.scoreText = this.add.text(config.width * 0.8, config.height * 0.05, this.scoreString, {font: "25px Space Mono"});
        

        
        /////////////////////////////////////////////////////////////////////////////////
    }

    update(){
        var frm_count = 0;
        this.background.tilePositionY -= 0.5;
        this.moveRocketManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.shootBeam();
            this.score += 10;
            this.scoreText.setText(this.scoreString + this.score);
         }

         for(var i=0; i<this.projectiles.getChildren().length; i++){
             var beam = this.projectiles.getChildren()[i];
             beam.update();
         }

         // Incomplete
         if((frm_count % 600000 == 0) && (this.rocket.x >= 200)){
         }

         
    }

    shootBeam(){
        var beam = new Beam(this);
    }

    moveRocketManager(){
        if(this.rocket.x <= 32){
            this.rocket.x = 32;
        }
        else if(this.rocket.x >= 568){
            this.rocket.x = 568;
        } else if(this.rocket.y >= 740){
            this.rocket.y = 740;
        }

        if(this.throttle.x <= 32){
            this.throttle.x = 32;
        }
        else if(this.throttle.x >= 568){
            this.throttle.x = 568;
        } else if(this.throttle.y >= 780){
            this.throttle.y = 780;
        }



        if(this.cursorKeys.left.isDown){
            this.rocket.setTexture('rocket_left');
            this.rocket.setVelocityX(-gameSettings.gameSpeed);
            this.throttle.setVelocityX(-gameSettings.gameSpeed);
        } else if(this.cursorKeys.right.isDown){
            this.rocket.setTexture('rocket_right');
            this.rocket.setVelocityX(gameSettings.gameSpeed);
            this.throttle.setVelocityX(gameSettings.gameSpeed);
        } else if(this.cursorKeys.up.isDown){
            this.rocket.setVelocityY(-gameSettings.gameSpeed);
            this.throttle.setVelocityY(-gameSettings.gameSpeed);
        } else if(this.cursorKeys.down.isDown){
            this.rocket.setVelocityY(gameSettings.gameSpeed);
            this.throttle.setVelocityY(gameSettings.gameSpeed);
        } else {
            this.rocket.setTexture('rocket');
            this.rocket.setVelocityX(0);
            this.throttle.setVelocityX(0);
            this.rocket.setVelocityY(0);
            this.throttle.setVelocityY(0);
        }
    }
}