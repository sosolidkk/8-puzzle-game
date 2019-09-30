let tableItems = ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"];

// Buttons
let customInputButton = document.getElementById("customInput");
let randomizeBoard = document.getElementById("randomizeBoard");

class Estado {
    constructor(pai = null, filhos = [], custo = 0, valores = null) {
        this.pai = pai
        this.filhos = filhos
        this.custo = custo
        this.valores = valores
    }
}

function getTable(value){
    for (i = 0; i < tableItems.length; i++) {
        if(document.getElementById(tableItems[i]).firstChild.data == value){
            return tableItems[i];
        }
    }
}

function getAllTableitems() {
    let arr = []

    for(i = 0; i < tableItems.length; i++) {
        arr.push(document.getElementById(tableItems[i]).firstChild.data);
    }
    return arr;
}

function changePlace(id, tablePosID){
    let arr = []

    if ([2, 5, 8].includes(parseInt(tablePosID[tablePosID.length-1]))) { arr = [+3, -3, -1]; }
    else if ([0, 3, 6].includes(parseInt(tablePosID[tablePosID.length-1]))) { arr = [+3, +1, -3]; }
    else { arr = [+3, +1, -3, -1]; }

    for (i = 0; i < arr.length; i++) {
        if (parseInt(tablePosID[tablePosID.length-1]) + parseInt(arr[i]) == parseInt(id[1])) { return true; }
    }
    return false;
}

function pushed(id){
    var button = document.getElementById(id);

    if (button.firstChild.data != " ") {
        tablePosID = getTable(" ");
        if (changePlace(id, tablePosID) == false) return;
        else {
            document.getElementById(tablePosID).firstChild.data = button.firstChild.data;
            button.firstChild.data = " ";
        }
    }
}

function iniciar() {
    let a = document.querySelector("#algoritmos").value
    let values = []

    for (i = 0; i < tableItems.length; i++) {
        values.push(document.getElementById(tableItems[i]).firstChild.data)
    }

    switch (a) {
        case "profundidade": console.log(depthSearch(values)); break;
        case "largura": console.log(breadthSearch(values)); break;
        case "gulosa" : buscaGulosa(values);break;
        case "a*": buscaAEstrela(values); break;
        default: break;
   }
}

customInputButton.addEventListener("click", function() {
    let game = prompt("Insert a state: 1;2;3;4;5;6;7;8; ;");
    if (game == null) return;
    else {
        game = game.split(";");
        if (game.length < 9) { alert("Não foram inseridos todos os estados."); }
        else { reDrawBoard(game); }
    }
})

randomizeBoard.addEventListener("click", function() {
    reDrawBoard(shuffleBoard())
})

function reDrawBoard(tableItemPos) {
    for(i = 0; i < tableItems.length; i++) {
        document.getElementById(tableItems[i]).firstChild.data = tableItemPos[i];
    }
}

function shuffleBoard() {
    let array = getAllTableitems()
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    console.log(array)
    return array;
}
