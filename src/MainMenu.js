
Concentration.MainMenu = function (game) {

	this.playButton = null;

};

Concentration.MainMenu.prototype = {

	create: function () {

		//this.bg = this.add.sprite(0,0,'bg');

		this.playButton = this.add.button(this.game.width/2, this.game.height/2, 'playButton', this.startGame, this);
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
