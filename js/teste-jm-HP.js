const vet = ["2", "1", "7",
             "4", " ", "6",
             "3", "8", "5"]

function verificarCustoGeral(vet) {
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

  console.log(arr)


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
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var num = arr[i][j]
      if (num != 0) {
        var linhaOriginal = Math.floor((num - 1) / 3)
        var colunaOriginal = (num - 1) % 3
        soma +=
          Math.abs(i - linhaOriginal) + Math.abs(j - colunaOriginal)
      }
    }
  }

  return soma
}


console.log(
verificarCustoGeral(vet))