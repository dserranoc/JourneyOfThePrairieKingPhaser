export default class GameOver extends Phaser.Scene {
    constructor() {
        super({key: "GameOver"});
    }

    preload() {

    }

    create(){

        // Cursors
        this.cursors = this.input.keyboard.addKeys(
            {
                ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER,
            });
        
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 1)')
        this.gameOverText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 100, "Game Over", { fontStyle: 'strong', font: '30px Early-GameBoy'}).setOrigin(0.5, 0.5);

        this.restartText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "→ Restart", { fontStyle: 'strong', font: '15px Early-GameBoy'}).setOrigin(0.5, 0.5);
    }

    update(){
        if (this.input.keyboard.checkDown(this.cursors.ENTER)){
            this.scene.start("Level11");
        }
    }
}