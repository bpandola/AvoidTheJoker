
AvoidTheJoker.MainMenu = function (game) {

	this.playButton = null;

};

AvoidTheJoker.MainMenu.prototype = {

	create: function () {

	    //this.bg = this.add.sprite(0,0,'bg');
	    var style = { font: "30px Arial", fill: "#ff0044", align: "center" };
	    var text = this.add.text(this.game.width / 2, this.game.height/2 - 50, "Avoid The Joker\n\nSelect the left- or right-most uncovered card until all cards.", style);
	    text.anchor.set(0.5);
		this.playButton = this.add.button(this.game.width/2, this.game.height/2 + 50, 'playButton', this.startGame, this);
		this.playButton.anchor.setTo(0.5);
		
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	And start the actual game
		this.state.start('Game');

	}

};
