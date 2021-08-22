export default class Helper{
    constructor(scene){
        this.scene = scene;
    }
    fixEnemyOverlapping(enemy1, enemy2) {
        let e1PosX = enemy1.body.position.x;
        let e1PosY = enemy1.body.position.y;
        let e2PosX = enemy2.body.position.x;
        let e2PosY = enemy2.body.position.y;
        let e1Width = enemy1.body.width;
        let e1Height = enemy1.body.height;
        let e2Width = enemy2.body.width;
        let e2Height = enemy2.body.height;

        let dx1 = e2PosX - (e1PosX + e1Width);
        let dx2 = e2PosX + e2Width - e1PosX;

        let dy2 = e2PosY + e2Height - e1PosY;
        let dy1 = e2PosY - (e1PosY + e1Height);

        let dx = Math.min(Math.abs(dx1), Math.abs(dx2));
        let dy = Math.min(Math.abs(dy1), Math.abs(dy2));

        let newX = e1PosX;
        let newY = e1PosY;
        //collide with left or right
        if (dx < dy) {
            if (Math.abs(dx1) < Math.abs(dx2)) {
                newX = e1PosX + dx1;
            }
            else {
                newX = e1PosX + dx2;
            }
        }
        //collide with top or bottom
        else {
            if (Math.abs(dy1) < Math.abs(dy2)) {
                newY = e1PosY + dy1;
            }
            else {
                newY = e1PosY + dy2;
            }
        }
        enemy1.body.position.x = newX;
        enemy1.body.position.y = newY;
    }
    
}