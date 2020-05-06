class Scene4 extends Phaser.Scene{
    constructor(){
        super('gameOver');
    }
    create(){
        var game='';
        this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if(gameSettings.gameWon==false){
            game+='GAME OVER';
        }else if(gameSettings.gameWon==true){
            game+='GAME WON';
        }

        this.add.text((config.width/2)-(config.width/4), config.height/2.5, game, {font: '50px Space Mono'});
        this.add.text((config.width/2)-(config.width/4), config.height/2, gameSettings.scoreString.toUpperCase()+gameSettings.score, {font: '30px Space Mono'});
        this.add.text((config.width/2)-(config.width/4), config.height/1.2, 'Press SPACE to play again.', {font: "18px Space Mono"});
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            gameSettings.frm_count=0;
            gameSettings.gameWon=false;
            this.scene.start('playGame');
         }
    }
}