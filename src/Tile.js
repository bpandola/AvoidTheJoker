var Tile = (function () {
    var Tile = function (game,x,y,image,frame,tileNum) {
        Phaser.Group.call(this,game);
        this.card = "";
        this.num = tileNum;
        this.hidden = true;
        this.onTap = new Phaser.Signal();
        this.x = x;
        this.y = y;
        this.front = this.create(0,0,image,frame);
        this.front.anchor.setTo(0.5);
        this.front.scale.setTo(0,1);
        this.back = this.create(0,0,image,'back.png');
        this.back.anchor.setTo(0.5);

        this.back.inputEnabled = true;
        this.back.events.onInputDown.add(this.dispatchStateChange,this);
    };

    Tile.prototype = Object.create(Phaser.Group.prototype);
    Tile.prototype.constructor = Tile;

    Tile.prototype.hide = function () {
        this.hidden = true;
        var t1 = this.game.add.tween(this.back.scale).to({
            x:1
        },100,Phaser.Easing.Linear.None);
        var t2 = this.game.add.tween(this.front.scale).to({
            x:0
        },100,Phaser.Easing.Linear.None);
        t2.chain(t1);
        t2.start();
    };

    Tile.prototype.dispatchStateChange = function () {
        console.log("dispatchTap");
        this.onTap.dispatch(this);
    };

    Tile.prototype.reveal = function () {
        console.log("reveal: " + this.num);
        this.hidden = false;
        var t1 = this.game.add.tween(this.back.scale).to({
            x:0
        },80,Phaser.Easing.Linear.None);
        var t2 = this.game.add.tween(this.front.scale).to({
            x:1
        },80,Phaser.Easing.Linear.None);
        t1.chain(t2);
        t1.start();
    };


    return Tile;
}());
