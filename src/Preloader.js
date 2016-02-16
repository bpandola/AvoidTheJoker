
AvoidTheJoker.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

AvoidTheJoker.Preloader.prototype = {

	preload: function () {

		this.load.image('playButton', 'images/play.png');
		this.load.atlas('cards', 'images/cards.png', 'images/cards.json');

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.state.start("MainMenu");
	},

	update: function () {


	}

};
