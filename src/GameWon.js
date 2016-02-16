
AvoidTheJoker.GameWon = function (game) {

    this.playButton = null;

};

AvoidTheJoker.GameWon.prototype = {

    create: function () {

        //this.bg = this.add.sprite(0,0,'bg');
        var style = { font: "30px Arial", fill: "#ff0044", align: "center" };
        var text = this.add.text(this.game.width / 2, this.game.height / 2, "Holy Shit!\nI can't believe you beat this insanely difficult game!\nYou are extremely lucky!", style);
        text.anchor.set(0.5,1);
        this.playButton = this.add.button(this.game.width / 2, this.game.height / 2, 'playButton', this.startGame, this);
        this.playButton.anchor.setTo(0.5,0);

    },

    update: function () {

        //	Do some nice funky main menu effect here

    },

    startGame: function (pointer) {

        //	And start the actual game
        this.state.start('Game');

    }

};
