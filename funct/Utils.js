var utils = {
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
    }
}