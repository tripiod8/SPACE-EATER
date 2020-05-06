class OneEye_Alien extends Phaser.Physics.Arcade.Sprite{
    constructor(scene){
        super(scene, config.width / 2, config.height / 2, 'oneEye_alien');
        scene.physics.world.enableBody(this);
        this.setRandomPosition(0, 0, config.width, config.height);
        this.setDataEnabled();
        this.data.set('lives', 7);
        scene.oneEyeAliens.add(this);
        this.setDepth(2);
        this.play('oneEye_alien_anim');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }

    update(){
        this.moveDroid();
        if(gameSettings.gameWon == true){
            this.disableBody(true, true);
        }
    }

     moveDroid(){
         this.droidMover = Phaser.Math.Between(1, 4)
        
          if(this.droidMover == 1){
              this.body.velocity.x = +150;
          } else if(this.droidMover == 2){
              this.body.velocity.x = -150;
          } else if(this.droidMover == 3){
              this.body.velocity.y = +150;
          } else if(this.droidMover == 4){
              this.body.velocity.y = -150;
          } else {
              this.body.velocity.x = 0;
          }
      }
}