export default class Bullet extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);
        this.scene = scene;
        this.setOrigin(0.5, 0.5);
    }

    newItem(player, velX, velY) {
        var item = this.create(player.x, player.y, 'bullet')
            .setActive(true)
            .setVisible(true);
        item.body.velocity.x = velX;
        item.body.velocity.y = velY;
        //item.body.setCollideWorldBounds(true);
    }

}