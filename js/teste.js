let f = [{c:1},{c:3},{c:-1}]



console.log(f)
f.sort((a,b)=>{
  return a.c - b.c
})
console.log(f)