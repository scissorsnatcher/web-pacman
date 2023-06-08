var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext("2d");


var gameManager = {
    factory: {},
    entities: [],
    player: null,
    levels_path: ["../tilesets/new_pac_map.json"],
    level: 0,
    count_target: 0,
    players_steps: 0,
    score: 0,
    laterKill:[],
    start: null,
    end: null,

    initPlayer: function (obj) {
        this.player = obj;
        setInterval(()=>{this.player.eating = 0;this.player.draw(ctx)}, 100);
        setInterval(()=>{this.player.eating = 1;this.player.draw(ctx)}, 300);
    },

    kill: function(obj) {
        this.laterKill.push(obj);

    },
    makeScared: function(i) {
        for (var e = 0; e < this.entities.length; e++) {
            if (this.entities[e].type = "Ghost") {
                this.entities[e].scared = i;
            }
        }
    },
    reset: function(){

        var butn = document.getElementById("start-button");
        butn.disabled = "true";
        this.score = 0;
        for(var e = 0; e < this.entities.length; e ++)
            this.laterKill.push(this.entities[e]);
        this.loadAll();
        this.interval = clearInterval(this.interval);
        this.play();

    },
    updateScore: function(points){
        var current_score = document.getElementById("score");
        current_score.innerText = "Score:" + (this.score + points);
        this.score = this.score + points;
    },
    update: function () {
        if(this.player === null)
            return;
        this.player.move_x=0;
        this.player.move_y=0;
        if(eventsManager.action["up"]) this.player.move_y = -1;
        if(eventsManager.action["down"]) this.player.move_y = 1;
        if(eventsManager.action["left"]) this.player.move_x = -1;
        if(eventsManager.action["right"]) this.player.move_x = 1;
        if(eventsManager.action["esc"]) this.end_game();

        this.entities.forEach(function (e) {
            try{
                e.update()
            }catch (ex) {
                console.log(e.name+" "+ex );
            }
        });

        for (let i = 0; i < this.laterKill.length; i++){
            const idx = this.entities.indexOf(this.laterKill[i]);
            if(idx > -1)
                this.entities.splice(idx,1);
        };
        if(this.laterKill.length > 0)
            this.laterKill.length = 0;

        mapManager.draw(ctx);
        this.draw(ctx);

        if (this.score == 17000){
            this.end_game();
        }
    },

    draw: function (ctx) {
        for(var e = 0; e < this.entities.length; e ++)
                this.entities[e].draw(ctx)
    },
    loadAll: function () {
        mapManager.loadMap(this.levels_path[this.level]);
        spriteManager.loadAtlas("../sprites/pac-sprites.json","../sprites/pac-sprites3.png");
        gameManager.factory['Player']= Player;
        gameManager.factory[''] = Coin;
        gameManager.factory['Big_coin'] = Big_coin;
        gameManager.factory['Ghost'] = Ghost;
        mapManager.parseEntities();
        mapManager.draw(ctx);
        eventsManager.setup(canvas);
        audioManager.init()
    },
    play: function () {
        this.score = 0;

        let button = document.getElementById("start-button");
        button.disabled = true;
        let but1 = document.getElementById("restart-button");
        but1.disabled = false;
        this.interval = setInterval(updateWorld, 200);
        gameManager.start = new Date().getTime();
        audioManager.game_start.play();
    },
    end_game: function () {
        this.end = new Date().getTime();
        this.kill(this.player);
        this.interval = clearInterval(this.interval);
        update_records();
    }

};

function updateWorld() {
    gameManager.update()
}
function update_records() {
    let arr;
    let time = (gameManager.end - gameManager.start)/1000;
    if (localStorage.hasOwnProperty('higthscores')) {
        arr = JSON.parse(localStorage.getItem('higthscores'));
        arr.push({name: name, score: time});
        arr.sort(function (a, b) {
            return a.score - b.score;
        });

        while (arr.length > 10) {
            arr.pop();
        }
        localStorage.setItem('higthscores', JSON.stringify(arr));
    } else {
        arr = [];
        arr.push({name: name , score: time});
        localStorage.setItem('higthscores', JSON.stringify(arr));
    }
    write_record();
}
function write_record() {
   let arr = JSON.parse(localStorage.getItem('higthscores'));
    var table = '<table class="simple-little-table">';
    for(let i = 0; i < arr.length; i++ ) {
        table += '<tr>';
        table += '<td>' + (Number(i) + 1) + '.</td> ';
        table += '<td>' + arr[i].name + '  </td>';
        table += '<td>' + arr[i].score + ' s.</td>';
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('table').innerHTML = table;
}
//localStorage.clear();
var name = localStorage.getItem("gamer_name");
gameManager.loadAll();
write_record();
