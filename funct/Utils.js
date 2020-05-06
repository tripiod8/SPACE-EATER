var utils = {
    score: function(points){
        gameSettings.score += points;
        gameSettings.scoreText.setText(gameSettings.scoreString + gameSettings.score);
    },
    beam: function(scene){
        for (var i = 0; i < scene.projectiles.getChildren().length; i++) {
            var beam = scene.projectiles.getChildren()[i];
            beam.update();
        }
    },
    redBeamLeft: function(scene){
        for (var i = 0; i < scene.red_beam_left.getChildren().length; i++) {
            var red_beam_left = scene.red_beam_left.getChildren()[i];
            red_beam_left.update();
        }
    },
    redBeamRight: function(scene){
        for (var i = 0; i < scene.red_beam_right.getChildren().length; i++) {
            var red_beam_right = scene.red_beam_right.getChildren()[i];
            red_beam_right.update();
        }
    },
    dying_planet: function(scene){
        scene.dying_planet.y += 1.5;
        if(scene.dying_planet.y >= 1200) {
            scene.dying_planet.destroy();
        }
    },
    living_planet: function(scene){
        if(gameSettings.gameWon == true){
            scene.living_planet.enableBody(false, config.width / 2, -500, true, true);
            scene.living_planet.y += 1.5;
        }
        if(scene.living_planet.y >= 200){
           scene.rocket.y -= 5;
           scene.throttle.y -= 5;
        }
        if(scene.living_planet.y >= 380){
            scene.scene.start('gameOver')
        }
    }
}