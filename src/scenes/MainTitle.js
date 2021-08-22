export default class GameOver extends Phaser.Scene {
    constructor() {
        super({key: "MainTitle"});
    }

    preload() {

    }

    create(){

        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 1)')
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'mainTitleLogo');

        this.time.delayedCall(2000, ()=>{
            this.scene.start("Level11");
        },[], this);
    }

    // update(){
    //     if (this.input.keyboard.checkDown(this.cursors.ENTER)){
    //         this.scene.start("Level");
    //     }
    // }
}