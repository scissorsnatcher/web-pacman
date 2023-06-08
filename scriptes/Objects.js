var Entity = {
    pos_x: 0,
    pos_y: 0,
    size_x: 0,
    size_y: 0,
    extend: function (extendProto) {
        var object = Object.create(this);
        for (var property in extendProto){
            if(this.hasOwnProperty(property) || typeof object[property] === 'undefined'){
                object[property] = extendProto[property];
            }
        }
        return object;
    }
}

var Player = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 32,
    direction: 1,
    eating: 0,
    draw: function(ctx) {
        let sprite_name;
        switch(this.direction){
            case -1: sprite_name = "sprite11";break;
            case 1: sprite_name = "sprite9";break;
            case -2: sprite_name = "sprite10";break;
            case 2: sprite_name = "sprite12";break;
        }
        if (this.eating == 0) spriteManager.drawSprite(ctx,sprite_name,this.pos_x,this.pos_y ,0,0);
        else {
            let sprite_name2;
            switch(this.direction){
                case -1: sprite_name2 = "sprite15";break;
                case 1: sprite_name2 = "sprite13";break;
                case -2: sprite_name2 = "sprite14";break;
                case 2: sprite_name2 = "sprite16";break;
            }
            spriteManager.drawSprite(ctx,sprite_name2,this.pos_x,this.pos_y ,0,0);

        }
    },
    update: function () {
        if (this.move_x === -1 ){
            this.direction = -1;
        }
        if (this.move_x === 1 ){
            this.direction = 1;
        }
        if (this.move_y === -1 ){
            this.direction = -2;
        }
        if (this.move_y === 1 ){
            this.direction = 2;
        }
        physicManager.update(this);

    },
    onTouchEntity: function (obj) {

    },
    move(obj){
        physicManager.update(obj)
    },

});

var Coin = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 0,
    direction: 0,
    value: 100,
    draw: function(ctx) {
        let sprite_name = "sprite5";
        spriteManager.drawSprite(ctx,sprite_name,this.pos_x,this.pos_y ,0,0);
    },
    update: function () {},
    onTouchEntity: function (obj) {
        gameManager.updateScore(this.value)
        gameManager.kill(this);
        audioManager.munch.play()
    }
});

var Big_coin = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 0,
    direction: 0,
    value: 300,
    draw: function(ctx) {
        let sprite_name = "sprite8";
        spriteManager.drawSprite(ctx,sprite_name,this.pos_x,this.pos_y ,0,0);
    },
    update: function () {},
    onTouchEntity: function (obj) {
        gameManager.updateScore(this.value)
        gameManager.kill(this);
        audioManager.pill.play()
        gameManager.makeScared(1);
        setTimeout(() => (gameManager.makeScared(0)), 5000);
    }
});


var Ghost = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 32,
    moved: 0,
    direction: 0,
    scared: 0,
    draw: function(ctx) {
        let sprite_name;
        switch (this.name) {
            case "red":
                sprite_name = "sprite2";
                break;
            case "blue":
                sprite_name = "sprite3";
                break;
            case "orange":
                sprite_name = "sprite6";
                break;
            case "pink":
                sprite_name = "sprite7";
                break;
        }
        if(this.scared == 1) spriteManager.drawSprite(ctx, "sprite4", this.pos_x, this.pos_y, 0, 0)
        else spriteManager.drawSprite(ctx, sprite_name, this.pos_x, this.pos_y, 0, 0)

    },
    update: function () {
        let rand_dir = Math.floor(Math.random() * 4);
        switch (rand_dir){
                case 0:
                    this.move_x = -1;
                    this.move_y = 0;
                    this.direction = -1;
                    break;
                case 1:
                    this.move_x = 1;
                    this.move_y = 0;
                    this.direction = 1;
                    break;
                case 2:
                    this.move_y = -1;
                    this.move_x = 0;
                    this.direction = -2;
                    break;
                case 3:
                    this.move_y = 1;
                    this.move_x = 0;
                    this.direction = 2;
                    break;
            }
            physicManager.update(this);

        },
        onTouchEntity: function (obj) {
            if(this.scared == 1) {
                audioManager.eat_ghost.play();
                this.pos_x = 288;
                this.pos_y = 352;
            }
            else {
                gameManager.kill(obj);
                let current_score = document.getElementById("score");
                current_score.innerText = "GAME OVER";
                audioManager.death.play();
            }

    }
});


