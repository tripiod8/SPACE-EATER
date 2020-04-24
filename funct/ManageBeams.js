var manageBeam = {
    redBeamLeft: function(x, y, scene) {
        var red_beam_left = new Red_Beam_Left(x, y, scene);
    },
    redBeamRight: function(x, y, scene){
        var red_beam_right= new Red_Beam_Right(x, y, scene);        
    },
    shootBeam: function(scene) {
        var beam = new Green_Beam(scene);
    }
}