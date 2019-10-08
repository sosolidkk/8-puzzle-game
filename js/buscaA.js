const solucao = ["1", "2", "3", "4", "5", "6", "7", "8", " "];
let fronteira = [];
let visitados = [];
let inicio = null;
let fim = null;
let nosGerados = 1;

function verificarSolucao(no, sol) {
    let s = 0;
    for (let i = 0; i < 9; i++) { if (no.valores[i] == sol[i]) { s++; } }
    if (s == sol.length) { return true; }
    else { return false; }
}

function change(id, espace) {
    let arr = []
    if ([2, 5, 8].includes(Number(espace))) { arr = [+3, -3, -1]; }
    else if ([0, 3, 6].includes(Number(espace))) { arr = [+3, +1, -3]; }
    else { arr = [+3, +1, -3, -1]; }

    for (i = 0; i < arr.length; i++) {
        if (Number(espace) + Number(arr[i]) == Number(id)) { return true; }
    }
    return false;
}

function verificarCusto(no) {
    if (no.pai != null) { return 1 + verificarCusto(no.pai); }
    else { return 0; }
}

function verificarCustoGeral(vet) {
    let arr = [], list = [];

    for (let i = 0; i < 3; i++) { list.push(vet[i]) }
    arr.push(list); list = [];

    for (let i = 3; i < 6; i++) { list.push(vet[i]) }
    arr.push(list); list = [];

    for (let i = 6; i < 9; i++) { list.push(vet[i]); }
    arr.push(list);

    let objetivo = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
    let p = [];

    verificaPos = (valor) => {
        let v = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Number(arr[i][j]) == valor) {
                    v.push(Number(i));
                    v.push(Number(j));
                    return v;
                }
            }
        }
    }
    let soma = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (objetivo[i][j] == 0) { continue; }
            if (Number(objetivo[i][j]) == Number(arr[i][j])) { soma += 0; }
            else {
                p = verificaPos(Number(objetivo[i][j]));
                soma += Math.abs(p[0] - i) + Math.abs(p[1] - j);
            }
        }
    }
    return soma;
}

function mudarTabela(no) {
    for (let i = 0; i < 9; i++) {
        document.getElementById(tableItems[i]).firstChild.data = no.valores[i];
    }
}

function mostrarSolucao(no, inicial) {
    drawResult(fronteira[0], inicio, nosGerados);
    reDrawBoard(no.valores);
    tree(drawTree(inicial));
}


function visitado(no) {
    for (let i = 0; i < visitados.length; i++) {
        if (verificarSolucao(no, visitados[i].valores)) { return true; }
    }
    return false;
}

function criarEstados(inicial) {
    let x, vet = [], aux, no, indice;

    while (true) {
        x = fronteira[0]
        visitados.push(x)

        indice = x.valores.indexOf(" ")
        for (let i = 0; i < 9; i++) {
            vet = x.valores.slice();
            if (change(i, indice)) {
                aux = vet[i];
                vet[i] = vet[indice];
                vet[indice] = aux;

                no = new Estado(x, [], 0, vet, x.nivel+1);
                x.filhos.push(no);
                nosGerados++;

                no.custo = no.nivel+ verificarCustoGeral(vet);
                if (visitado(no) == false) { fronteira.push(no); }
            }
        }
        fronteira.shift();

        fronteira.sort((a, b) => { return a.custo - b.custo; })
        let e = fronteira[0];

        if (verificarSolucao(e, solucao)) { mostrarSolucao(e, inicial); return; }
    }
}

function buscaAEstrela(valores) {
    fronteira = [], visitados = [], nosGerados = 1
    inicio = performance.now(), fim = null;
    let no = new Estado(null, [], 0, valores, 0);

    fronteira.push(no);
    if (verificarSolucao(no, solucao)) { mostrarSolucao(no, no); return; }
    criarEstados(no);
}
