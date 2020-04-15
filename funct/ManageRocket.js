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
    }
}