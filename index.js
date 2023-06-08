function store() {
    var input = document.getElementById("input");
    var name = input.value;
    if(name != ""){
        localStorage.setItem("gamer_name",name);
        window.location.href = ("index.html");
    }else{
        window.alert("Введите имя");
    }

}

function set_name() {
    if(localStorage.hasOwnProperty("gamer_name")){
        let name = localStorage.getItem("gamer_name");
        let input =document.getElementById("input");
        input.value = name;
    }
}

