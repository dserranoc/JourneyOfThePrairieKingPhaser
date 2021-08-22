import Bullet from "../../models/Bullet.js";
import Enemy from "../../models/Enemy.js";
import Player from "../../models/Player.js";
import CollisionHandlers from "../../utils/CollisionHandlers.js";
import Helper from "../../utils/Helper.js";

class Level11 extends Phaser.Scene {
    constructor() {
        super("Level11");
    }

    init() { }

    preload() {

    }

    create() {
        // Cursors
        this.cursors = this.input.keyboard.addKeys(
            {
                W: Phaser.Input.Keyboard.KeyCodes.W,
                S: Phaser.Input.Keyboard.KeyCodes.S,
                A: Phaser.Input.Keyboard.KeyCodes.A,
                D: Phaser.Input.Keyboard.KeyCodes.D,
                UP: Phaser.Input.Keyboard.KeyCodes.UP,
                DOWN: Phaser.Input.Keyboard.KeyCodes.DOWN,
                LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
                RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT
            });

        this.helper = new Helper(this);
        this.collisionHandlers = new CollisionHandlers(this);

        // Configs

        this.level = 0;
        this.paused = false;
        this.initialTime = 5;
        this.currentTime = this.initialTime;

        // Timer
        this.timer = this.time.addEvent({ delay: 1000, callback: ()=>{this.currentTime--}, callbackScope: this, loop: true });

        // Map
        const map = this.make.tilemap({ key: 'level11' });
        const terrainTileset = map.addTilesetImage('terrain', 'tiles');
        const floorLayer = map.createLayer('floor', terrainTileset, 0, 0);
        const bushLayer = map.createLayer('bush', terrainTileset, 0, 0);
        floorLayer.setScale(2);
        bushLayer.setScale(2);

        // Entities
        this.player = new Player(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'player').setInteractive();
        if (this.registry.playerData){
            this.player.playerData = this.registry.playerData;
        }
        this.bullets = new Bullet(this.physics.world, this);
        this.enemies = new Enemy(this.physics.world, this);

        // Collisions
        this.physics.add.collider(this.bullets, this.enemies, this.collisionBulletEnemy, null, this);
        this.physics.add.collider(this.player, this.enemies, this.collisionHandlers.collisionPlayerEnemy, null, this);
        this.physics.add.overlap(this.enemies, this.enemies, this.helper.fixEnemyOverlapping);
        bushLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, bushLayer);
        this.physics.add.collider(this.enemies, bushLayer);

        // Texts
        this.lifesText = document.getElementById("lifesText");
        this.lifesText.innerHTML = `${this.player.playerData.lifes}`;

        // Progress Bar
        this.progressBar = document.getElementById("progressBar");

        
        // Music
        let musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 1
        }
        this.backgroundMusic = this.sound.add("background_music");
        this.killMonsterMusic = this.sound.add("killMonster");
        this.fireSound = this.sound.add("fire");
        this.backgroundMusic.play(musicConfig);
        this.deathPlayer = this.sound.add("deathPlayer");

    }

    collisionBulletEnemy(bullet, enemy) {
        this.killMonsterMusic.play();
        enemy.play("deathOrc");
        enemy.setState("DEAD");
        enemy.body.setEnable(false);
        bullet.destroy();
        this.time.delayedCall(2000, () => {
            enemy.destroy();
        }, [], this);
    }

    checkGameOver() {
        this.timer.paused = true;
        this.player.playerData.lifes--;
        this.player.play("deathPlayer");
        this.deathPlayer.play();
        this.lifesText.innerHTML = `${this.player.playerData.lifes}`;
        this.paused = true;
        this.player.setVelocity(0,0);
        if (this.player.playerData.lifes < 0) {
            this.time.delayedCall(1500, ()=> {
                this.registry.destroy();
                this.events.off();
                this.scene.start("GameOver");
            });
        }
        this.backgroundMusic.stop();
        this.time.delayedCall(2000, ()=>{
            this.paused = false;
            this.player.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
            this.backgroundMusic.play();
            this.player.play("movePlayer");
            this.timer.paused = false;
        }, [], this);
        
    }

    checkEndLevel(){
        if (this.enemies.children.size == 0 && this.currentTime <= 0){
            this.registry.playerData = this.player.playerData;
            this.time.delayedCall(2000, ()=>{
                this.events.off();
                this.scene.start("Level12");
            }, [], this);
            this.backgroundMusic.stop();
        }
    }

    update(time, delta) {
        if (!this.paused) {
            this.progressBar.style.width = `${this.currentTime/this.initialTime*100}%`;
            if (this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
            this.player.checkMove();
            this.player.checkFire();
            this.collisionHandlers.checkBulletCollidesWorldBounds();
            this.enemies.moveEnemies(delta);
            if (this.enemies.children.size == 0 && this.currentTime > 0) {
                this.enemies.spawnEnemies(this.level % 4);
                this.enemies.animateEnemies();
                this.level++;
            }
            this.checkEndLevel();
        }

    }
}

export default Level11;
