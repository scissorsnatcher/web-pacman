var audioManager= {
    death: null,
    eat_ghost: null,
    game_start: null,
    munch: null,
    pill: null,
    volume: 1,


    init: function () {
        this.death = new Audio("../sounds/death.wav");
        this.eat_ghost = new Audio("../sounds/eat_ghost.wav");
        this.game_start = new Audio("../sounds/game_start.wav");
        this.munch = new Audio("../sounds/munch.wav");
        this.pill = new Audio("../sounds/pill.wav");
    },

}

