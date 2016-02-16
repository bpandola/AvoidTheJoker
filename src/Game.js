
Concentration.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.bg;
    this.prevTile;
    this.tiles;
    this.busy;
    this.level = 7;
};

Concentration.Game.prototype = {

	create: function () {
        this.prevTile = null;

        if (this.level === -1) {
            this.level = 7;
        }

        this.game.world.removeAll();
        //this.bg = this.game.add.sprite(0,0,'bg');
        this.tiles = this.game.add.group();
        //var animals = ["ace","two","three","four","five","six","seven","eight","nine","joker"];
	    //animals = animals.concat(animals);
        var cards = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "joker"];
        cards = cards.splice(0, this.level);
        cards[this.level - 1] = "joker";
        cards = Phaser.ArrayUtils.shuffle(cards);
        var tileSize = 128;
        var tileWidth = 198;
        var tileHeight = 275;
        var tileSpacing = 2;
        var cols = 10;
        for (var i = 0; i < this.level; i++) {
            var xx = (i%cols) * tileWidth + (i*tileSpacing);
            var yy = Math.floor(i/cols) * tileHeight;
            var randomName = cards[i]; // Phaser.ArrayUtils.removeRandomItem(animals);
            var tile = new Tile(this.game,xx,yy,"cards",randomName+".png");
            this.tiles.add(tile);
            tile.animal = randomName;
            tile.onTap.add(this.onTileTap,this);
        }
        this.tiles.x = this.game.width/2 - this.tiles.width/2 + (tileWidth/2);
        this.tiles.y = this.game.height/2 - this.tiles.height/2 + (tileHeight/2);
	},

	onTileTap: function (tile) {
	    console.log("TonTap");
        if(this.busy){
            return;
        }
        this.busy = true;
        tile.reveal();
        
       
        //if(this.prevTile === null){
        //    this.prevTile = tile;
        //    this.busy = false;
        //    return;
        //}
        if (tile.animal === "joker") {
            var t = this.game.time.create(true);
            t.add(1000, function () {

                this.levelUp();




                //if(this.prevTile.animal !== tile.animal){
                //    console.log("No match: ",this.prevTile.animal,tile.animal);
                //    this.prevTile.hide();
                //    tile.hide();
                //    this.prevTile = null;
                //}else if(this.prevTile.animal === tile.animal){
                //    console.log("Match: ",this.prevTile.animal,tile.animal);
                //    this.tiles.removeChild(this.prevTile);
                //    this.tiles.removeChild(tile);
                //    this.prevTile = null;
                //    if(this.tiles.children.length===0){
                //        this.quitGame();
                //    }
                //}
                this.busy = false;
            }, this);
            t.start();
        } else {
            this.busy = false;
        }
        
    },

	update: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},

	levelUp: function (pointer) {
	    this.level--;

	    if (this.level === 1) {
	        this.level = -1;
	        this.quitGame();
	    } else {
	        this.create();
	    }
	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
