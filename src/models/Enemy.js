export default class Enemy extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);
        this.scene = scene;
        scene.physics.world.enable(this);
        this.setOrigin(0.5, 0.5);
        this.createAnimations();
        this.enemySpeed = 50;
    }

    createOne(x, y) {
        var item = this.create(x, y, 'enemy')
            .setActive(true)
            .setVisible(true);
    }

    spawnEnemies(n) {
        // let allDead = true;
        // let enemies = this.children.getArray();
        // for (let i = 0; i < enemies.length; i++) {
        //     allDead = enemies[i].state == "DEAD";
        //     if (!allDead)
        //         return;
        // }
        // this.scene.level++;


        if (n == 0) {
            this.spawnFour(0, 0);
        } else if (n == 1) {
            this.spawnFour(0, 0);
            this.spawnFour(0, 1);
        } else if (n == 2) {
            this.spawnFour(0, 0);
            this.spawnFour(0, 1);
            this.spawnFour(1, 0);
        } else {
            this.spawnFour(0, 0);
            this.spawnFour(0, 1);
            this.spawnFour(1, 0);
            this.spawnFour(1, 1);
        }

    }

    spawnFour(n, k) {
        this.createOne(- n * 32, 256 + k * 34);
        this.createOne(256 + k * 34, - n * 32);
        this.createOne(512 + n * 32, 256 + k * 34);
        this.createOne(256 + k * 34, 512 + n * 32);
    }

    killEnemiesOffMap(enemy, delta){
        let posX = enemy.body.position.x;
        let posY = enemy.body.position.y;
        if (posX < 0 || posX > 512 || posY < 0 || posY > 512) {
            let timer = 0;
            timer += delta;
			if (timer > 5) {
				enemy.destroy();
			}
        }
    }

    moveEnemies2() {
        let player = this.scene.player;
        this.children.iterate((enemy) => {
            if (enemy.state != 'DEAD') {
                let playerPosX = player.x;
                let playerPosY = player.y;
                let enemySpeed = this.enemySpeed;

                if (playerPosX < enemy.body.x) {
                    enemy.body.velocity.x = - enemySpeed;
                } else if (playerPosX > enemy.body.x) {
                    enemy.body.velocity.x = enemySpeed;
                } else {
                    enemy.body.velocity.x = 0;
                }

                if (playerPosY < enemy.body.y) {
                    enemy.body.velocity.y = - enemySpeed;
                } else if (playerPosY > enemy.body.y) {
                    enemy.body.velocity.y = enemySpeed;
                } else {
                    enemy.body.velocity.y = 0;
                }
            } else {
                enemy.setVelocity(0, 0);
            }
        })
    }

    moveEnemies(delta){
        let player = this.scene.player;
        this.children.iterate((enemy) => {
            this.scene.physics.moveToObject(enemy, player, this.enemySpeed);
            //this.killEnemiesOffMap(enemy, delta);
        });
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'moveEnemy',
            frames: this.scene.anims.generateFrameNames('orc', { start: 1, end: 2, prefix: 'orc', suffix: '.png'}),
            repeat: -1,
            frameRate: 5,
        });

        this.scene.anims.create({
            key: 'deathOrc',
            frames: this.scene.anims.generateFrameNames('orc', { start: 1, end: 6, prefix: 'death', suffix: '.png'}),
            repeat: 0,
            frameRate: 5,
        });
    }

    animateEnemies() {
        this.children.iterate((enemy) => {
            enemy.play("moveEnemy");
        })
    }
}