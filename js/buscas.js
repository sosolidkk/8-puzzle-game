/* const solucao = ["1", "2", "3", "4", "5", "6", "7", "8", " "]
let fronteira = []
let visitados = []
let inicio = null
let fim = null
let nosGerados = 1
class Estado {
    constructor(pai = null, filhos = [], custo = 0, valores = null) {
        this.pai = pai
        this.filhos = filhos
        this.custo = custo
        this.valores = valores
    }
} */

/* function verificarSolucao(no, sol) {
    let s = 0
    for (let i = 0; i < 9; i++) {
        if (no.valores[i] == sol[i]) { s++ }
    }
    if (s == sol.length) {
        return true
    } else { return false }
} */

/* function change(id, espace) {
    let arr = []
    if ([2, 5, 8].includes(Number(espace))) { arr = [+3, -3, -1]; }
    else if ([0, 3, 6].includes(Number(espace))) { arr = [+3, +1, -3]; }
    else { arr = [+3, +1, -3, -1]; }

    for (i = 0; i < arr.length; i++) {
        //console.log(tablePosID[tablePosID.length-1] + " + " + arr[i] + " = " + id[1])
        if (Number(espace) + Number(arr[i]) == Number(id)) { return true; }
    }
    return false;

} */

/* function verificarCusto(no) {
    if (no.pai != null) {
        return 1 + verificarCusto(no.pai)
    } else {
        return 0
    }
}
 */
/* function verificarCustoGeral(vet) {
    let arr = []
    let list = []
    for (let i = 0; i < 3; i++) {
        list.push(vet[i])
    }
    arr.push(list)
    list = []
    for (let i = 3; i < 6; i++) {
        list.push(vet[i])
    }
    arr.push(list)
    list = []
    for (let i = 6; i < 9; i++) {
        list.push(vet[i])
    }
    arr.push(list)


    let objetivo = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]
    let p = []

    verificaPos = (valor) => {
        let v = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Number(arr[i][j]) == valor) {
                    v.push(Number(i))
                    v.push(Number(j))
                    return v
                }
            }
        }
    }
    let soma = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (objetivo[i][j] == 0) {
                continue
            }
            if (Number(objetivo[i][j]) == Number(arr[i][j])) {
                soma += 0
            } else {
                p = verificaPos(Number(objetivo[i][j]))

                soma += Math.abs(p[0] - i) + Math.abs(p[1] - j)

            }
        }
    }
    //let a = heur.reduce((total, n) => {
    //  return Number(total) + Number(n)
    //})
    return soma
} */


/* 
function mudarTabela(no) {
    for (let i = 0; i < 9; i++) {
        document.getElementById(tableItems[i]).firstChild.data = no.valores[i]
    }

}
 */
/* function mostrarSolucao(no) {
    fim = new Date()
    console.log("Solucao encontrada")
    console.log(no.valores)
    console.log("tempo:", fim.getTime() - inicio.getTime())
    console.log("n nos na fronteira:", fronteira.length)
    console.log("nos gerados:", nosGerados)
    fronteira = []

} */

/* function repetido(pai, no) {
    if (pai == null) {
        return false
    }
    if (verificarSolucao(pai, no.valores)) {
        return true
    } else {
        return repetido(pai.pai, no)
    }

} */

/* visitado = (no) => {
    for (let i = 0; i < visitados.length; i++) {
        if (verificarSolucao(no, visitados[i].valores)) {
            return true
        }
    }
    //visitados.forEach(e=>{

    //})
    return false
} */

/* function criarEstados(pai, valores) {
    visitados.push(pai)
    let vet = []
    let aux
    let no
    let indice = valores.indexOf(" ") //indice da posicao vazia
    for (let i = 0; i < 9; i++) {
        vet = valores.slice()
        if (change(i, indice)) {
            aux = vet[i]
            vet[i] = vet[indice]
            vet[indice] = aux
            no = new Estado(pai, null, null, vet)
            nosGerados++
            no.custo = verificarCusto(no) + verificarCustoGeral(vet)
            //pai.filhos.push(no)
            if (visitado(no) == false) {
                fronteira.push(no)
            }
        }
    } */

    /*
    fronteira.forEach(e=>{
    console.log(e.valores,e.custo)
})   */


/* 
    fronteira.forEach((e) => {
        if (e.custo == Math.min(...fronteira.map(a => a.custo))) {

            mudarTabela(e)
            fronteira.splice(fronteira.indexOf(e), 1);   //errado

            /* console.log("no expandido:")
            console.log(e.valores[0], e.valores[1], e.valores[2])
            console.log(e.valores[3], e.valores[4], e.valores[5])
            console.log(e.valores[6], e.valores[7], e.valores[8]) */

            /* if (verificarSolucao(e, solucao)) {
                mostrarSolucao(e)
                return
            } else {
                criarEstados(e, e.valores)
                return
            }
        }
    })


}  */

/* function buscaAEstrela(valores) {
    let no = new Estado(null, [], null, valores) //estado inicial
    if (verificarSolucao(no, solucao)) {
        mostrarSolucao(no)
        return
    }
    console.log("estado inicial:")
    console.log(no.valores[0], no.valores[1], no.valores[2])
    console.log(no.valores[3], no.valores[4], no.valores[5])
    console.log(no.valores[6], no.valores[7], no.valores[8])
    criarEstados(no, valores)

} */

/* function iniciar() {

    inicio = new Date()

    let valores = []
    for (i = 0; i < tableItems.length; i++) {
        valores.push(document.getElementById(tableItems[i]).firstChild.data)
    }
    
  //let valores = ["1", "7", "3", "6", " ", "2", "5", "4", "8"]
    buscaAEstrela(valores)
}
 */

