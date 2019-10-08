function expandirNos(estadoInicial) {
    let estadoAtual = estadoInicial
    while (true) {
        if (verificarSolucao(estadoAtual, solucao)) {
            mostrarSolucao(estadoAtual, estadoInicial); return;
        }
        let valores = estadoAtual.valores;
        let vazioIdx = valores.indexOf(" ");
        visitados.push(estadoAtual);

        for (let i = 0; i < 9; i++) {
            if (change(i, vazioIdx)) {
                let newVet = valores.slice();
                newVet[vazioIdx] = newVet[i];
                newVet[i] = " ";
                let newNo = new Estado(estadoAtual, [], verificarCustoGeral(newVet), newVet, estadoAtual.nivel+1);
                estadoAtual.filhos.push(newNo);
                nosGerados++;

                if (visitado(newNo) == false) { fronteira.push(newNo); }
            }
        }
        fronteira.shift();
        fronteira.sort((a, b) => { return a.custo - b.custo; })

        estadoAtual = fronteira[0];
    }
}

function buscaGulosa(vet) {
    inicio = performance.now();
    let no = new Estado(null, [], 0, vet, 0);
    fronteira = [];
    visitados = [];
    nosGerados = 1;

    expandirNos(no);
}
