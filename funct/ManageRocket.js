var manageRocket = {
    moveRocketManager: function(rocket, throttle, cursorKeys) {
        if (rocket.x <= 32) {
            rocket.x = 32;
        }
        else if (rocket.x >= 568) {
            rocket.x = 568;
        } else if (rocket.y >= 740) {
            rocket.y = 740;
        }

        if (throttle.x <= 32) {
            throttle.x = 32;
        }
        else if (throttle.x >= 568) {
            throttle.x = 568;
        } else if (throttle.y >= 780) {
            throttle.y = 780;
        }


        if (cursorKeys.left.isDown) {
            rocket.setTexture('rocket_left');
            rocket.setVelocityX(-gameSettings.gameSpeed);
            throttle.setVelocityX(-gameSettings.gameSpeed);
        } else if (cursorKeys.right.isDown) {
            rocket.setTexture('rocket_right');
            rocket.setVelocityX(gameSettings.gameSpeed);
            throttle.setVelocityX(gameSettings.gameSpeed);
        } else if (cursorKeys.up.isDown) {
            rocket.setVelocityY(-gameSettings.gameSpeed);
            throttle.setVelocityY(-gameSettings.gameSpeed);
        } else if (cursorKeys.down.isDown) {
            rocket.setVelocityY(gameSettings.gameSpeed);
            throttle.setVelocityY(gameSettings.gameSpeed);
        } else {
            rocket.setTexture('rocket');
            rocket.setVelocityX(0);
            throttle.setVelocityX(0);
            rocket.setVelocityY(0);
            throttle.setVelocityY(0);
        }
    },
    fireWeapon: function(scene){
        if (Phaser.Input.Keyboard.JustDown(scene.spacebar)) {
            manageBeam.shootBeam(scene);
        }
    },
    shield: function(scene){
        if(scene.rocket.data.list.shield == false){
            scene.shield.disableBody(true, true);
        }
        if(scene.rocket.data.list.shield === true){
            scene.shield.enableBody(true, scene.rocket.x, scene.rocket.y - 42, true, true)
        } 
        if(scene.shield.data.list.lives <= 0){
            scene.rocket.data.list.shield = false;
            scene.shield.data.list.lives += 5;
        }
    },
    lives: function(scene){
        switch(scene.rocket.data.list.lives){
            case 10:
                scene.healthbar.setFrame(10);
                break;
            case 9:
                scene.healthbar.setFrame(9);
                break;
            case 8:
                scene.healthbar.setFrame(8);
                break;
            case 7:
                scene.healthbar.setFrame(7);
                break;    
            case 6:
                scene.healthbar.setFrame(6);
                break;    
            case 5:
                scene.healthbar.setFrame(5);
                break;   
            case 4:
                scene.healthbar.setFrame(4);
                break;
            case 3:
                scene.healthbar.setFrame(3);
                break;  
            case 2:
                scene.healthbar.setFrame(2);
                break;    
            case 1:
                scene.healthbar.setFrame(1);
                break;
            case 0:
                scene.healthbar.setFrame(0);
                break;  
            default:
                scene.healthbar.setFrame(10)      
        };
    },
    dead: function(scene){
        if(scene.rocket.data.list.lives == 0){
            scene.scene.start('gameOver');
        }  
    }
}