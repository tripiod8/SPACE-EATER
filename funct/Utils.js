var utils = {
    score: function(points){
        gameSettings.score += points;
        gameSettings.scoreText.setText(gameSettings.scoreString + gameSettings.score);
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
    }
}