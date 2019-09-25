const vet = ["1", "2", "3","4", "5", "6","7", " 9", "8"]

let i = new Date()

let x
let fronteira = [{custo:3},{custo:1},{custo:2}]
let b = ["a","b","c"]

fronteira.sort(function (a, b) {     //ordenando o array pelo nome
   /*  if (a.custo < b.custo) return -1;
    if (a.custo > b.custo) return 1; */
    return a.custo - b.custo;
  })

  console.log(fronteira)
  //fronteira.shift()
  console.log(fronteira[2].custo+1)

/* console.log (
Math.min(...fronteira.map(a => a.custo))
) */


