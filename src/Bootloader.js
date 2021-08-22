export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({key: "Bootloader"});
    }

    preload() {
        this.load.on("complete", () => {
            this.scene.start("MainTitle");
        })
        this.load.path = "./assets/";
        //const playerSprite = this.load.image("player", "./player/player1.png");
        this.load.atlas('player', './player/player.png', './player/player.json');
        this.load.atlas('orc', './orc/orc.png', './orc/orc.json');
        const bulletSprite = this.load.image("bullet", "pellet.png");
        const enemySprite = this.load.image("enemy", "./orc/orc1.png")
        const tilemapImage = this.load.image('tiles', './tilemaps/terrain.png');
        const tilemap11 = this.load.tilemapTiledJSON('level11', './tilemaps/level1_1.json');
        const tilemap12 = this.load.tilemapTiledJSON('level12', './tilemaps/level1_2.json');
        
        const mainTitle = this.load.image("mainTitleLogo", './title.png');

        this.load.audio("background_music", ["../../assets/music/overworld.wav", "../../assets/music/overworld.mp3"]);
        this.load.audio("killMonster", ["../../assets/music/kill.wav"]);
        this.load.audio("fire", ["../../assets/music/bullet.wav"]);
        this.load.audio("deathPlayer", ["../../assets/music/death.wav"]);
    }
}