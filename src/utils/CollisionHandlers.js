export default class CollisionHandlers {
    constructor(scene){
        this.scene = scene;
    }

    collisionPlayerEnemy(player, enemy) {
        if (enemy.state == "DEAD")
            return;
        enemy.destroy();
        this.enemies.clear(true, true);
        this.bullets.clear(true, true);
        this.checkGameOver();
    }

    checkBulletCollidesWorldBounds() {
        this.scene.bullets.children.iterate((bullet) => {
            if (bullet && bullet.body.checkWorldBounds()) {
                bullet.setActive(false);
                bullet.setVisible(false);
                bullet.destroy();
                this.scene.bullets.children.delete(bullet);
            }
        })
    }

    checkBulletCollidesWalls(bullet, wall){
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.destroy();
    }

    
}

