var physicManager = {

    update: function (obj) {
        if(obj.move_x === 0 && obj.move_y === 0)
            return "stop";
        var newX = obj.pos_x + Math.floor(obj.move_x * obj.speed);
        var newY = obj.pos_y + Math.floor(obj.move_y * obj.speed);

        var ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + obj.size_y / 2);

        if (obj.name == "pacman1") {
            var e = this.entityUnderXY(obj, obj.pos_x, obj.pos_y);//под игроком монетка
            if (e !== null && e.onTouchEntity) { // объект
                e.onTouchEntity(obj)
            }
        }
        if (obj.name == "red" || obj.name == "blue" || obj.name == "orange" || obj.name == "pink") {
            var e = this.entityPacmanXY(obj, obj.pos_x, obj.pos_y);
            if (e !== null && e.onTouchEntity) { // объект
                obj.onTouchEntity(e)
            }
        }
        if( ts == 0){
            obj.pos_x = newX;
            obj.pos_y = newY;
        }else{
            return  "break";
         }
        return  "move";
    },
    entityUnderXY: function(obj, x, y){
        for(var i=0; i < gameManager.entities.length; i++){
            var e = gameManager.entities[i];
            if(e.name !== obj.name){
                if (x == e.pos_x && y == e.pos_y)
                    return e;
            }
        }
        return null;
    },
    entityPacmanXY: function(obj, x, y){
        for(var i=0; i < gameManager.entities.length; i++){
            var e = gameManager.entities[i];
            if(e.name == "pacman1"){
                if (x == e.pos_x && y == e.pos_y)
                    return e;
            }
        }
        return null;
    }
}
