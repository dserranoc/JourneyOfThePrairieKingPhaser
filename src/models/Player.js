export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite); 
        this.scene = scene;
        this.scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.body.collideWorldBounds = true;
        this.animatePlayer();

        this.playerData = {
            lifes: 3,
            playerVelocity: 120
        }

        this.shooting = false;
    }

    checkMove() {
        if (this.scene.cursors.S.isDown && this.scene.cursors.D.isDown) {
            this.setVelocity(this.playerData.playerVelocity, this.playerData.playerVelocity);
            this.setFlipX(false);
        } else if (this.scene.cursors.S.isDown && this.scene.cursors.A.isDown) {
            this.setVelocity(-this.playerData.playerVelocity, this.playerData.playerVelocity);
            this.setFlipX(true);
        } else if (this.scene.cursors.W.isDown && this.scene.cursors.D.isDown) {
            this.setVelocity(this.playerData.playerVelocity, -this.playerData.playerVelocity);
        } else if (this.scene.cursors.W.isDown && this.scene.cursors.A.isDown) {
            this.setVelocity(-this.playerData.playerVelocity, -this.playerData.playerVelocity);
            this.setFlipX(true);
        } else if (this.scene.cursors.W.isDown) {
            this.setVelocity(0, -this.playerData.playerVelocity);
        } else if (this.scene.cursors.S.isDown) {
            this.setVelocity(0, this.playerData.playerVelocity);
        } else if (this.scene.cursors.A.isDown) {
            this.setVelocity(-this.playerData.playerVelocity, 0);
            this.setFlipX(true);
        } else if (this.scene.cursors.D.isDown) {
            this.setVelocity(this.playerData.playerVelocity, 0);
            this.setFlipX(false);
        } else {
            this.setVelocity(0);
        }
    }

    checkFire() {
        let input = this.scene.input.keyboard;
        let cursors = this.scene.cursors;
        let duration = 350;
        let velX = 0;
        let velY = 0;
        if (!this.shooting) {
            if (input.checkDown(cursors.UP, duration) || input.checkDown(cursors.DOWN, duration) || input.checkDown(cursors.LEFT, duration) || input.checkDown(cursors.RIGHT, duration)) {
                if (input.checkDown(cursors.UP)) {
                    velY = -250;
                    this.shooting = true;
                } else if (input.checkDown(cursors.DOWN)) {
                    velY = 250;
                    this.shooting = true;
                }

                if (input.checkDown(cursors.LEFT)) {
                    velX = -250;
                    this.shooting = true;
                } else if (input.checkDown(cursors.RIGHT)) {
                    velX = 250;
                    this.shooting = true;
                }
                this.fire(this, velX, velY);
            }
            if (this.shooting) {
                this.scene.time.delayedCall(350, () => {
                    this.shooting = false;
                }, [], this);
            }
        }

    }

    fire(object, velX, velY) {
        this.scene.fireSound.play();
        this.scene.bullets.newItem(object, velX, velY);
    }

    animatePlayer() {
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 'player2.png'}]
        });
        this.anims.create({
            key: 'movePlayer',
            frames: this.anims.generateFrameNames('player', { start: 1, end: 4, prefix: 'player', suffix: '.png'}),
            repeat: -1,
            frameRate: 15,
        });

        this.anims.create({
            key: 'deathPlayer',
            frames: this.anims.generateFrameNames('player', { start: 1, end: 5, prefix: 'death', suffix: '.png'}),
            repeat: 0,
            frameRate: 10,
        });

        this.play("movePlayer");
    }
}