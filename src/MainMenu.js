
AvoidTheJoker.MainMenu = function (game) {

	this.playButton = null;

};

AvoidTheJoker.MainMenu.prototype = {

	create: function () {

	    //this.bg = this.add.sprite(0,0,'bg');
	    var style = { font: "30px Arial", fill: "#ff0044", align: "center" };
	    var text = this.add.text(this.game.width / 2, this.game.height/2, "Reveal one card at a time by selecting the left- or right-most uncovered card.\nReveal the Joker last to advance to the next level.\nComplete all levels and WIN A MILLION DOLLARS!", style);
	    text.anchor.set(0.5,1);
		this.playButton = this.add.button(this.game.width/2, this.game.height/2, 'playButton', this.startGame, this);
		this.playButton.anchor.setTo(0.5,0);
		
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

	    //	And start the actual game
	    var music = this.add.audio('music');
	    music.play();
		this.state.start('Game');

	}

};
