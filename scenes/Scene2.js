class Scene2 extends Phaser.Scene{
    constructor(){
        super('loadGame');
    }

    create(){
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(20, 20, "Loading Game", {font: "25px Space Mono"});

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start('playGame');
         }
    }
}