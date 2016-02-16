
AvoidTheJoker.Game = function (game) {

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
    this.leftMost;
    this.rightMost;
};

AvoidTheJoker.Game.prototype = {

	create: function () {
        this.prevTile = null;

        if (this.level === -1) {
            this.level = 7;
        }

       
        this.game.world.removeAll();
	    //this.bg = this.game.add.sprite(0,0,'bg');
        if (this.tiles != null) {
            this.tiles.destroy(true, true);
        }
        this.tiles = this.game.add.group();
        
        var cards = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "joker"];
        cards = cards.splice(0, this.level);
        cards[this.level - 1] = "joker";
        cards = Phaser.ArrayUtils.shuffle(cards);

        if (this.level === 7) {
            while (cards[0] == "joker" || cards[6] == "joker") {
                cards = Phaser.ArrayUtils.shuffle(cards);
            }
        }
        console.log(cards);

        var tileWidth = 198;
        var tileHeight = 275;
        var tileSpacing = 2;
        
        for (var i = 0; i < this.level; i++) {
            var xx = i * (tileWidth + tileSpacing);
            var cardName = cards[i]; 
            var tile = new Tile(this.game,xx,0,"cards",cardName+".png",i);
            this.tiles.add(tile);
            tile.card = cardName;
            tile.onTap.add(this.onTileTap,this);
        }
        this.tiles.x = this.game.width/2 - this.tiles.width/2 + (tileWidth/2);
        this.tiles.y = this.game.height / 2 - this.tiles.height / 2 + (tileHeight / 2);

        this.leftMost = 0;
        this.rightMost = this.level - 1;

        this.busy = false;
	},

	onTileTap: function (tile) {
	    
        
	    if (this.busy) {
            return;
	    }

	    if (tile.num === this.leftMost || tile.num === this.rightMost) {
	       

	        this.busy = true;
	        tile.reveal();
	    } else {
	        return;
	    }
       
	    var t = this.game.time.create(true);
        if (tile.card === "joker") {
           
            
            t.add(1000, function () {
                if (this.leftMost == this.rightMost) {
                    this.levelUp();
                } else {
                    this.levelDown();
                }

                
            }, this);
            t.start();
        } else {
            t.add(200, function () {
                if (tile.num === this.leftMost)
                    this.leftMost = tile.num + 1;
                else if (tile.num === this.rightMost)
                    this.rightMost = tile.num - 1;
                

                this.busy = false;
            }, this);
            t.start();
        }
        
    },

	update: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},

	levelUp: function () {
	    this.level--;

	    if (this.level === 1) {
	        this.level = -1;
	        this.state.start('GameWon');
	    } else {
	        this.create();
	    }
	},

	levelDown: function () {
	    this.level++;

	    if (this.level > 7)
	        this.level = 7;

	    this.create();

	},

	quitGame: function () {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
	    

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
